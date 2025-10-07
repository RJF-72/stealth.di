Netlify Deployment Guide

Overview
- This repository contains a `web-app` Vite React + TypeScript SPA ready for Netlify.
- A root `netlify.toml` config sets the base directory and SPA redirects.

Local Development
- Navigate to `web-app` and run `npm run dev`.
- Open `http://localhost:5173/` to view the app.

Production Build
- From `web-app`, run `npm run build`.
- The production assets are output to `web-app/dist`.

Netlify Setup (UI)
- Create a new site on Netlify and connect this Git repository.
- Build settings:
  - Base directory: `web-app`
  - Build command: `npm run build`
  - Publish directory: `dist`
- Environment variables: add any required variables under Site settings → Environment variables.

Deploy Options
- Automatic: Every push to the default branch triggers a build.
- Manual: Trigger a deploy from Netlify UI or via `netlify deploy` if using Netlify CLI.

SPA Routing
- `netlify.toml` includes a catch-all redirect to `index.html` to support client-side routing.

Troubleshooting
- If build fails, check Node version (LTS) and clean install: `rm -rf web-app/node_modules` then `npm ci`.
- Verify `vite` and `react` versions match the scaffolded app.