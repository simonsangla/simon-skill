// Read-only PWA dashboard. Fetches sanitized static JSON produced by the
// build step (web/scripts/build-data.mjs). No source files are loaded directly
// at runtime; no edits are persisted anywhere.

const STATUS_EL = document.getElementById('status');
const META_EL = document.getElementById('metaLine');
const TASKS_EL = document.getElementById('tasksContent');
const MEMORY_TABS_EL = document.getElementById('memoryTabs');
const MEMORY_CONTENT_EL = document.getElementById('memoryContent');

const COLLAPSED_BY_DEFAULT = new Set(['done']);

// ---------- Helpers ----------

function showStatus(msg) {
  STATUS_EL.textContent = msg;
  STATUS_EL.classList.add('visible');
  setTimeout(() => STATUS_EL.classList.remove('visible'), 2200);
}

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function timeAgo(iso) {
  if (!iso) return '';
  const then = new Date(iso).getTime();
  if (Number.isNaN(then)) return '';
  const diff = Date.now() - then;
  if (diff < 60_000) return 'just now';
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)}m ago`;
  if (diff < 86_400_000) return `${Math.floor(diff / 3_600_000)}h ago`;
  return `${Math.floor(diff / 86_400_000)}d ago`;
}

// Minimal inline-markdown renderer for task notes and memory content.
// Keeps things lightweight (no external markdown lib). Handles: **bold**,
// *italic*, `code`, [text](url), bare URLs.
function renderInline(s) {
  let out = escapeHtml(s);
  // Inline code first so it isn't mangled by other rules
  out = out.replace(/`([^`]+)`/g, (_, c) => `<code>${c}</code>`);
  // Markdown links
  out = out.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, text, url) => {
    if (!/^https?:\/\//.test(url)) return `${text}`;
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;
  });
  // Bare URLs (only those not already in a link)
  out = out.replace(/(?<!["'>])(https?:\/\/[^\s<>")]+)/g, url =>
    `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`);
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  // Italic — single * not adjacent to space
  out = out.replace(/(?<![*\w])\*([^*\n]+)\*(?!\w)/g, '<em>$1</em>');
  return out;
}

// Block-level markdown renderer for memory sections. Supports headings,
// paragraphs, lists, fenced + indented code, blockquotes, and the GFM-style
// pipe tables that show up in memory files.
function renderBlocks(md) {
  if (!md) return '';
  const lines = md.split('\n');
  const out = [];
  let i = 0;

  const isTableSeparator = l => /^\s*\|?\s*:?-+:?\s*(\|\s*:?-+:?\s*)+\|?\s*$/.test(l);

  while (i < lines.length) {
    const line = lines[i];

    // Blank
    if (!line.trim()) { i++; continue; }

    // Fenced code
    const fence = line.match(/^```(\w+)?\s*$/);
    if (fence) {
      const buf = [];
      i++;
      while (i < lines.length && !/^```\s*$/.test(lines[i])) { buf.push(lines[i]); i++; }
      i++; // skip closing fence
      out.push(`<pre><code>${escapeHtml(buf.join('\n'))}</code></pre>`);
      continue;
    }

    // Indented code (4+ spaces) — skip; rare in memory files

    // Heading
    const h = line.match(/^(#{1,6})\s+(.+)$/);
    if (h) {
      const lvl = Math.min(h[1].length + 1, 4); // map # -> h2 etc.
      out.push(`<h${lvl}>${renderInline(h[2].trim())}</h${lvl}>`);
      i++;
      continue;
    }

    // Blockquote
    if (line.startsWith('>')) {
      const buf = [];
      while (i < lines.length && lines[i].startsWith('>')) {
        buf.push(lines[i].replace(/^>\s?/, ''));
        i++;
      }
      out.push(`<blockquote>${renderBlocks(buf.join('\n'))}</blockquote>`);
      continue;
    }

    // Table
    if (line.includes('|') && i + 1 < lines.length && isTableSeparator(lines[i + 1])) {
      const headerCells = line.trim().replace(/^\||\|$/g, '').split('|').map(s => s.trim());
      i += 2;
      const rows = [];
      while (i < lines.length && lines[i].includes('|') && lines[i].trim()) {
        rows.push(lines[i].trim().replace(/^\||\|$/g, '').split('|').map(s => s.trim()));
        i++;
      }
      const thead = `<thead><tr>${headerCells.map(c => `<th>${renderInline(c)}</th>`).join('')}</tr></thead>`;
      const tbody = `<tbody>${rows.map(r => `<tr>${r.map(c => `<td>${renderInline(c)}</td>`).join('')}</tr>`).join('')}</tbody>`;
      out.push(`<table>${thead}${tbody}</table>`);
      continue;
    }

    // Unordered list
    if (/^\s*[-*]\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        const body = lines[i].replace(/^\s*[-*]\s+/, '');
        items.push(`<li>${renderInline(body)}</li>`);
        i++;
      }
      out.push(`<ul>${items.join('')}</ul>`);
      continue;
    }

    // Ordered list
    if (/^\s*\d+\.\s+/.test(line)) {
      const items = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        const body = lines[i].replace(/^\s*\d+\.\s+/, '');
        items.push(`<li>${renderInline(body)}</li>`);
        i++;
      }
      out.push(`<ol>${items.join('')}</ol>`);
      continue;
    }

    // Paragraph (collect until blank or special line)
    const buf = [line];
    i++;
    while (i < lines.length && lines[i].trim() && !/^(#{1,6}\s|```|>|\s*[-*]\s|\s*\d+\.\s)/.test(lines[i]) && !lines[i].includes('|')) {
      buf.push(lines[i]);
      i++;
    }
    out.push(`<p>${renderInline(buf.join(' '))}</p>`);
  }

  return out.join('\n');
}

// ---------- Data fetching ----------

async function fetchJSON(url) {
  const res = await fetch(url, { cache: 'no-cache' });
  if (!res.ok) throw new Error(`${url}: ${res.status}`);
  return res.json();
}

// ---------- Tasks rendering ----------

function renderTasks(data) {
  if (!data.sections.length) {
    TASKS_EL.innerHTML = `<div class="error">No tasks found. The build step did not produce any sections.</div>`;
    return;
  }

  const html = data.sections.map(section => {
    const items = data.tasks[section.id] || [];
    const collapsed = COLLAPSED_BY_DEFAULT.has(section.id) ? 'collapsed' : '';
    const body = items.length
      ? items.map(renderTaskRow).join('')
      : `<div class="empty-section">Nothing here.</div>`;
    return `
      <div class="section-card ${collapsed}" data-section="${section.id}">
        <button class="section-header" aria-expanded="${collapsed ? 'false' : 'true'}">
          <span>${escapeHtml(section.name)}</span>
          <span><span class="count">${items.length}</span><span class="chevron">▾</span></span>
        </button>
        <div class="section-body">${body}</div>
      </div>
    `;
  }).join('');

  TASKS_EL.innerHTML = html;

  TASKS_EL.querySelectorAll('.section-header').forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.section-card');
      const wasCollapsed = card.classList.toggle('collapsed');
      btn.setAttribute('aria-expanded', wasCollapsed ? 'false' : 'true');
    });
  });
}

function renderTaskRow(task) {
  const checked = task.checked ? 'checked' : '';
  const sub = (task.subtasks || []).length
    ? `<ul class="task-subtasks">${task.subtasks.map(s =>
        `<li class="${s.checked ? 'checked' : ''}">${renderInline(s.text)}</li>`
      ).join('')}</ul>`
    : '';
  return `
    <div class="task-row ${checked}">
      <div class="task-checkbox ${checked}" aria-label="${task.checked ? 'Done' : 'Open'}"></div>
      <div class="task-body">
        <div class="task-title">${renderInline(task.title)}</div>
        ${task.note ? `<div class="task-note">${renderInline(task.note)}</div>` : ''}
        ${sub}
      </div>
    </div>
  `;
}

// ---------- Memory rendering ----------

function buildMemoryTabs(memory) {
  const tabs = [];

  if (memory.claudeMd) {
    tabs.push({ id: 'overview', label: 'Overview', count: null });
  }
  for (const file of memory.files || []) {
    tabs.push({
      id: `file-${file.name}`,
      label: file.name.replace(/\.md$/, ''),
      count: null,
    });
  }
  for (const dirName of Object.keys(memory.dirs || {}).sort()) {
    const items = memory.dirs[dirName];
    tabs.push({ id: `dir-${dirName}`, label: dirName, count: items.length });
  }

  MEMORY_TABS_EL.innerHTML = tabs.map((t, idx) => `
    <button class="memory-tab ${idx === 0 ? 'active' : ''}" data-tab="${t.id}">
      ${escapeHtml(t.label)}${t.count != null ? `<span class="count">${t.count}</span>` : ''}
    </button>
  `).join('');

  MEMORY_TABS_EL.querySelectorAll('.memory-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      MEMORY_TABS_EL.querySelectorAll('.memory-tab').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderMemoryContent(memory, btn.dataset.tab);
    });
  });

  if (tabs.length) renderMemoryContent(memory, tabs[0].id);
  else MEMORY_CONTENT_EL.innerHTML = `<div class="error">No memory content bundled.</div>`;
}

function renderMemoryContent(memory, tabId) {
  if (tabId === 'overview' && memory.claudeMd) {
    MEMORY_CONTENT_EL.innerHTML = `
      <div class="memory-card">
        <h2>CLAUDE.md</h2>
        ${renderBlocks(memory.claudeMd.content)}
      </div>
    `;
    return;
  }

  if (tabId.startsWith('file-')) {
    const name = tabId.slice('file-'.length);
    const file = (memory.files || []).find(f => f.name === name);
    if (!file) return;
    MEMORY_CONTENT_EL.innerHTML = `
      <div class="memory-card">
        <h2>${escapeHtml(file.parsed.title || file.name)}</h2>
        ${renderParsed(file.parsed)}
      </div>
    `;
    return;
  }

  if (tabId.startsWith('dir-')) {
    const dirName = tabId.slice('dir-'.length);
    const items = (memory.dirs || {})[dirName] || [];
    MEMORY_CONTENT_EL.innerHTML = items.map(file => `
      <div class="memory-card">
        <h2>${escapeHtml(file.parsed.title || file.name)}</h2>
        ${renderParsed(file.parsed)}
      </div>
    `).join('');
    return;
  }
}

function renderParsed(parsed) {
  const parts = [];

  if (parsed.fields && Object.keys(parsed.fields).length) {
    const dls = Object.entries(parsed.fields)
      .map(([k, v]) => `<dt>${escapeHtml(k)}</dt><dd>${renderInline(v)}</dd>`)
      .join('');
    parts.push(`<dl class="field-list">${dls}</dl>`);
  }

  if (parsed.sections._intro) {
    parts.push(renderBlocks(parsed.sections._intro));
  }

  for (const [name, content] of Object.entries(parsed.sections)) {
    if (name === '_intro' || !content) continue;
    parts.push(`<h3>${escapeHtml(name)}</h3>${renderBlocks(content)}`);
  }

  return parts.join('\n');
}

// ---------- Tab switching ----------

function wireTopTabs() {
  const tabTasks = document.getElementById('tab-tasks');
  const tabMemory = document.getElementById('tab-memory');
  const panelTasks = document.getElementById('panel-tasks');
  const panelMemory = document.getElementById('panel-memory');

  const switchTo = (name) => {
    const tasksActive = name === 'tasks';
    tabTasks.classList.toggle('active', tasksActive);
    tabMemory.classList.toggle('active', !tasksActive);
    tabTasks.setAttribute('aria-selected', tasksActive);
    tabMemory.setAttribute('aria-selected', !tasksActive);
    panelTasks.classList.toggle('active', tasksActive);
    panelMemory.classList.toggle('active', !tasksActive);
    panelTasks.hidden = !tasksActive;
    panelMemory.hidden = tasksActive;
  };

  tabTasks.addEventListener('click', () => switchTo('tasks'));
  tabMemory.addEventListener('click', () => switchTo('memory'));
}

// ---------- Boot ----------

async function boot() {
  wireTopTabs();
  TASKS_EL.innerHTML = `<div class="loading">Loading tasks…</div>`;

  try {
    const [tasks, memory, meta] = await Promise.all([
      fetchJSON('/data/tasks.json'),
      fetchJSON('/data/memory.json'),
      fetchJSON('/data/meta.json').catch(() => null),
    ]);

    if (meta) {
      const ago = timeAgo(meta.builtAt);
      const sha = meta.commitShort ? ` · ${meta.commitShort}` : '';
      META_EL.textContent = `Synced ${ago}${sha}`;
    } else {
      META_EL.textContent = '';
    }

    renderTasks(tasks);
    buildMemoryTabs(memory);
  } catch (e) {
    META_EL.textContent = '';
    TASKS_EL.innerHTML = `<div class="error">Failed to load data: <code>${escapeHtml(e.message)}</code></div>`;
    console.error(e);
  }
}

// ---------- Service worker registration ----------

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(reg => {
        reg.addEventListener('updatefound', () => {
          const sw = reg.installing;
          if (!sw) return;
          sw.addEventListener('statechange', () => {
            if (sw.state === 'installed' && navigator.serviceWorker.controller) {
              showStatus('Update available — reload to refresh');
            }
          });
        });
      })
      .catch(err => console.warn('SW registration failed', err));
  });
}

boot();
