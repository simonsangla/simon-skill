#!/usr/bin/env node
// Build step: read TASKS.md + memory/**/*.md from the repo root, parse into
// structured JSON, sanitize anything that looks like a secret or PII, and
// write the result under web/public/data/ for the static PWA to fetch.
//
// Runs on Vercel before deploy. Reads from the repo checkout — never serves
// raw .md files at runtime.

import { promises as fs } from 'node:fs';
import { execSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const WEB_ROOT = path.resolve(__dirname, '..');
const REPO_ROOT = path.resolve(WEB_ROOT, '..');
const OUT_DIR = path.join(WEB_ROOT, 'public', 'data');

// -----------------------------------------------------------------------------
// Sanitization
// -----------------------------------------------------------------------------

const SECRET_PATTERNS = [
  { re: /sk-ant-[A-Za-z0-9_-]{20,}/g, label: 'claude-key' },
  { re: /sk-[A-Za-z0-9]{20,}/g, label: 'api-key' },
  { re: /ghp_[A-Za-z0-9]{30,}/g, label: 'github-token' },
  { re: /gho_[A-Za-z0-9]{30,}/g, label: 'github-token' },
  { re: /ghu_[A-Za-z0-9]{30,}/g, label: 'github-token' },
  { re: /ghs_[A-Za-z0-9]{30,}/g, label: 'github-token' },
  { re: /github_pat_[A-Za-z0-9_]{50,}/g, label: 'github-token' },
  { re: /xox[abporsu]-[A-Za-z0-9-]{10,}/g, label: 'slack-token' },
  { re: /AKIA[0-9A-Z]{16}/g, label: 'aws-key' },
  { re: /AIza[0-9A-Za-z_-]{35}/g, label: 'google-key' },
  { re: /-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]+?-----END [A-Z ]*PRIVATE KEY-----/g, label: 'private-key' },
  { re: /\bBearer\s+[A-Za-z0-9._\-]{20,}/g, label: 'bearer' },
];

const EMAIL_RE = /\b[A-Za-z0-9._%+\-]+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}\b/g;
const PHONE_RE = /(?<!\w)\+\d[\d\s\-.()]{8,}\d(?!\w)/g;
const HOME_PATH_RE = /\/Users\/[A-Za-z0-9._\-]+\//g;

function sanitize(input) {
  if (typeof input !== 'string') return input;
  let out = input;
  for (const { re, label } of SECRET_PATTERNS) {
    out = out.replace(re, `[redacted:${label}]`);
  }
  out = out.replace(EMAIL_RE, '[email]');
  out = out.replace(PHONE_RE, '[phone]');
  out = out.replace(HOME_PATH_RE, '~/');
  return out;
}

function sanitizeDeep(value) {
  if (typeof value === 'string') return sanitize(value);
  if (Array.isArray(value)) return value.map(sanitizeDeep);
  if (value && typeof value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = sanitizeDeep(v);
    return out;
  }
  return value;
}

// -----------------------------------------------------------------------------
// TASKS.md parser  (matches the structure of the legacy dashboard parser)
// -----------------------------------------------------------------------------

function slugify(name) {
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function parseTasks(markdown) {
  const sections = [];
  const tasksBySection = {};
  let currentSectionId = null;
  let currentTask = null;

  const flushTask = () => {
    if (currentTask && currentSectionId) {
      tasksBySection[currentSectionId].push(currentTask);
      currentTask = null;
    }
  };

  for (const rawLine of markdown.split('\n')) {
    const headerMatch = rawLine.match(/^## \*{0,2}(.+?)\*{0,2}\s*$/);
    if (headerMatch) {
      flushTask();
      const name = headerMatch[1].trim();
      currentSectionId = slugify(name);
      if (!tasksBySection[currentSectionId]) {
        sections.push({ id: currentSectionId, name });
        tasksBySection[currentSectionId] = [];
      }
      continue;
    }

    if (!currentSectionId) continue;

    const taskMatch = rawLine.match(/^- \[([ xX])\]\s*(.*)$/);
    if (taskMatch) {
      flushTask();
      const checked = taskMatch[1].toLowerCase() === 'x';
      let body = taskMatch[2];
      body = body.replace(/^~~|~~$/g, ''); // strip strikethrough markers
      let title = body;
      let note = '';
      const boldMatch = body.match(/^\*\*(.+?)\*\*(.*)$/);
      if (boldMatch) {
        title = boldMatch[1].trim();
        note = boldMatch[2].replace(/^[\s\-—:]+/, '').trim();
      }
      currentTask = { title, note, checked, subtasks: [] };
      continue;
    }

    const subMatch = rawLine.match(/^\s+- \[([ xX])\]\s*(.*)$/);
    if (subMatch && currentTask) {
      currentTask.subtasks.push({
        text: subMatch[2].trim(),
        checked: subMatch[1].toLowerCase() === 'x',
      });
    }
  }
  flushTask();

  return { sections, tasks: tasksBySection };
}

// -----------------------------------------------------------------------------
// Memory parser  (sections, fields, tables — same shape as the legacy dashboard)
// -----------------------------------------------------------------------------

function parseMemory(markdown) {
  const parsed = { title: '', fields: {}, sections: {}, tables: [] };
  const lines = markdown.split('\n');
  let currentSection = '_intro';
  parsed.sections[currentSection] = [];

  for (const line of lines) {
    if (line.match(/^# /)) {
      parsed.title = line.replace(/^# /, '').trim();
      continue;
    }
    if (line.match(/^## /)) {
      currentSection = line.replace(/^## /, '').trim();
      parsed.sections[currentSection] = [];
      continue;
    }
    const kv = line.match(/^\*\*(.+?):\*\*\s*(.*)$/);
    if (kv) {
      parsed.fields[kv[1]] = kv[2];
      continue;
    }
    parsed.sections[currentSection].push(line);
  }

  for (const k of Object.keys(parsed.sections)) {
    parsed.sections[k] = parsed.sections[k].join('\n').trim();
  }

  const tableRe = /\|(.+)\|\n\|[-| :]+\|\n((?:\|.+\|\n?)+)/g;
  let m;
  while ((m = tableRe.exec(markdown)) !== null) {
    const headers = m[1].split('|').map(h => h.trim());
    const rows = m[2].trim().split('\n').map(row =>
      row.trim().replace(/^\||\|$/g, '').split('|').map(c => c.trim())
    );
    parsed.tables.push({ headers, rows });
  }

  return parsed;
}

// -----------------------------------------------------------------------------
// Filesystem walking
// -----------------------------------------------------------------------------

async function readIfExists(p) {
  try {
    return await fs.readFile(p, 'utf8');
  } catch (e) {
    if (e.code === 'ENOENT') return null;
    throw e;
  }
}

async function listMd(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  const out = [];
  for (const ent of entries) {
    if (ent.isFile() && ent.name.endsWith('.md')) {
      out.push(ent.name);
    }
  }
  return out.sort();
}

async function listSubDirs(dir) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  return entries.filter(e => e.isDirectory()).map(e => e.name).sort();
}

// -----------------------------------------------------------------------------
// Main
// -----------------------------------------------------------------------------

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  // --- TASKS ---
  const tasksMd = await readIfExists(path.join(REPO_ROOT, 'TASKS.md'));
  const tasksData = tasksMd
    ? sanitizeDeep(parseTasks(tasksMd))
    : { sections: [], tasks: {} };

  await fs.writeFile(
    path.join(OUT_DIR, 'tasks.json'),
    JSON.stringify(tasksData, null, 2),
  );

  // --- MEMORY ---
  const memory = { claudeMd: null, files: [], dirs: {} };

  const claudeMd = await readIfExists(path.join(REPO_ROOT, 'CLAUDE.md'));
  if (claudeMd) memory.claudeMd = { content: claudeMd };

  const memoryRoot = path.join(REPO_ROOT, 'memory');
  if (await fs.stat(memoryRoot).then(s => s.isDirectory()).catch(() => false)) {
    try {
      const topFiles = await listMd(memoryRoot);
      for (const name of topFiles) {
        const content = await fs.readFile(path.join(memoryRoot, name), 'utf8');
        memory.files.push({ name, content, parsed: parseMemory(content) });
      }
      const subDirs = await listSubDirs(memoryRoot);
      for (const dirName of subDirs) {
        const dirPath = path.join(memoryRoot, dirName);
        const subFiles = await listMd(dirPath);
        memory.dirs[dirName] = [];
        for (const name of subFiles) {
          const content = await fs.readFile(path.join(dirPath, name), 'utf8');
          memory.dirs[dirName].push({
            name,
            content,
            parsed: parseMemory(content),
          });
        }
      }
    } catch (e) {
      if (e.code !== 'ENOENT') throw e;
    }
  }

  const memorySanitized = sanitizeDeep(memory);
  await fs.writeFile(
    path.join(OUT_DIR, 'memory.json'),
    JSON.stringify(memorySanitized, null, 2),
  );

  // --- META ---
  let commit = 'unknown';
  let commitShort = 'unknown';
  try {
    commit = execSync('git rev-parse HEAD', { cwd: REPO_ROOT }).toString().trim();
    commitShort = commit.slice(0, 7);
  } catch {}

  // Vercel exposes VERCEL_GIT_COMMIT_SHA in the build env when wired to a repo.
  if (process.env.VERCEL_GIT_COMMIT_SHA) {
    commit = process.env.VERCEL_GIT_COMMIT_SHA;
    commitShort = commit.slice(0, 7);
  }

  const meta = {
    builtAt: new Date().toISOString(),
    commit,
    commitShort,
    sectionCount: tasksData.sections.length,
    taskCount: Object.values(tasksData.tasks).reduce((n, arr) => n + arr.length, 0),
    memoryFileCount:
      (memory.claudeMd ? 1 : 0) +
      memory.files.length +
      Object.values(memory.dirs).reduce((n, arr) => n + arr.length, 0),
  };
  await fs.writeFile(path.join(OUT_DIR, 'meta.json'), JSON.stringify(meta, null, 2));

  console.log(`[build-data] wrote ${OUT_DIR}`);
  console.log(`[build-data] tasks: ${meta.taskCount} across ${meta.sectionCount} sections`);
  console.log(`[build-data] memory files: ${meta.memoryFileCount}`);
  console.log(`[build-data] commit: ${meta.commitShort}`);

  // Audit: scan output for anything still resembling a secret pattern.
  const auditPaths = ['tasks.json', 'memory.json'].map(f => path.join(OUT_DIR, f));
  let leaked = 0;
  for (const p of auditPaths) {
    const text = await fs.readFile(p, 'utf8');
    for (const { re, label } of SECRET_PATTERNS) {
      const hits = text.match(new RegExp(re.source, re.flags));
      if (hits) {
        console.error(`[build-data] LEAK in ${path.basename(p)}: ${label} (${hits.length})`);
        leaked += hits.length;
      }
    }
    if (EMAIL_RE.test(text)) {
      console.error(`[build-data] LEAK in ${path.basename(p)}: email address`);
      leaked++;
    }
    EMAIL_RE.lastIndex = 0;
  }
  if (leaked > 0) {
    console.error(`[build-data] aborting: ${leaked} potential leaks in output`);
    process.exit(1);
  }
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
