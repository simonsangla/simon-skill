# Productivity dashboard (PWA)

Read-only mobile PWA of the `skills/dashboard.html` view, deployed to Vercel.

## What it does

- Bundles `TASKS.md` + `memory/**/*.md` into sanitized static JSON at build time.
- Serves a mobile-first read-only view of tasks (Active / Waiting On / Someday / Done) and memory files.
- Installable as a home-screen app on iOS and Android. Works offline (last successful sync is cached by the service worker).
- Never serves raw `.md` files at runtime. The build step is the only thing that touches the source markdown.

## Repo layout

```
web/
├── public/
│   ├── index.html          App shell
│   ├── app.js              Renderer (fetches /data/*.json)
│   ├── styles.css          Mobile-first styles
│   ├── manifest.webmanifest
│   ├── sw.js               Service worker (cache-first shell, network-first data)
│   ├── icons/icon.svg
│   └── data/               BUILT — gitignored — produced by scripts/build-data.mjs
│       ├── tasks.json
│       ├── memory.json
│       └── meta.json
├── scripts/
│   └── build-data.mjs      Parses + sanitizes + writes the JSON bundle
├── package.json
├── vercel.json             Build = node scripts/build-data.mjs; output = public/
└── .gitignore
```

## Build step

```sh
cd web
node scripts/build-data.mjs   # or: npm run build
```

What it does:

1. Reads `../TASKS.md` and walks `../memory/` (top-level `.md` files + one level of sub-directories).
2. Parses tasks into `{ sections, tasks }` and memory files into `{ title, fields, sections, tables }`.
3. Runs a sanitization pass on every string in the output:
   - Email addresses → `[email]`
   - Common API tokens (`sk-…`, `ghp_…`, `gho_…`, `xox*-…`, `AKIA…`, `AIza…`, Bearer, private keys) → `[redacted:<kind>]`
   - Phone numbers (E.164-ish) → `[phone]`
   - `/Users/<name>/` prefixes → `~/`
4. Writes `public/data/{tasks,memory,meta}.json`.
5. Audits the output and aborts with a non-zero exit code if any pattern still matches — failsafe against the regexes missing a case in the input.

## Local dev

```sh
cd web
npm run dev    # builds data, then serves public/ on http://localhost:5173
```

## Vercel deploy

Project settings:

- **Root Directory:** `web`
- **Framework Preset:** Other (none)
- **Build Command:** auto-detected from `vercel.json` → `node scripts/build-data.mjs`
- **Output Directory:** auto-detected from `vercel.json` → `public`
- **Install Command:** `echo no-deps` (no `node_modules` needed — script is dependency-free)

No environment variables required.

## Install on phone

**iOS (Safari):** open the deployed URL → Share → Add to Home Screen.
**Android (Chrome):** open the deployed URL → menu → Install app.

After install, the app launches standalone (no browser chrome), uses the cached shell + last-synced data when offline, and pulls fresh JSON whenever the network is available.

## Privacy posture

- The repo itself is the source of truth; the deployed site is a read-only mirror at build time.
- No write paths exist in the client (`fetch` is GET-only; no File System Access API).
- All output is run through a regex-based sanitizer before commit to the deploy artifact.
- `public/data/` is gitignored so stale data never ships from the repo — only the build step writes it.
- Recommend gating the Vercel deployment behind Vercel Authentication (Team setting → "Password Protection" or "Vercel Authentication") if any task or memory content is considered private.
