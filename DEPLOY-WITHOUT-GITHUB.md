Deploy to Netlify Without GitHub

Overview
- This project’s app lives in `apps/web-app` (Next.js 15, App Router).
- Netlify can deploy directly from your local machine without a GitHub repo.

Option A — Netlify CLI (recommended)
- From `apps/web-app`:
  - `npx netlify login`
  - `npx netlify init` (create a new site and link it)
  - `npx netlify deploy --build --prod`
- The root `netlify.toml` is configured to use:
  - Base directory: `apps/web-app`
  - Build command: `npm run build`
  - Publish directory: `.next`
  - Plugin: `@netlify/plugin-nextjs`

Option B — Netlify UI (drag-and-drop, static-only)
- Only works if your app can be fully statically exported.
- `npm run build` then `npx next export` (creates `apps/web-app/out`).
- Drag `out` into https://app.netlify.com/drop.
- Note: App Router + SSR features may require the CLI + plugin.

Environment Variables
- Set under Netlify → Site settings → Environment variables (e.g., `NEXT_PUBLIC_APP_URL`, `NEXT_PUBLIC_WS_URL`).

Troubleshooting
- If build fails, ensure Node LTS, clean install: `rm -rf node_modules && npm ci` in `apps/web-app`.
- If you see workspace root warnings, keep a single `package-lock.json` or set Turbopack `root` in `apps/web-app/next.config.ts`.