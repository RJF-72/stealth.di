Publish to GitHub

Overview
- This repository uses a monorepo layout with the Next.js app under `apps/web-app` and a Vite SPA under `web-app`.
- Use a single Git repository at the root to track all code.

Steps
1) Remove any nested Git repo (created by scaffolding):
   - Windows PowerShell: `Remove-Item -Recurse -Force apps/web-app/.git`
2) Initialize Git at the repo root:
   - `git init`
   - `git branch -M main`
3) Stage and commit:
   - `git add .`
   - `git commit -m "Initial commit: Next app + Netlify config"`
4) Create a new GitHub repository (via GitHub UI).
5) Add remote and push (replace with your user/repo):
   - `git remote add origin https://github.com/<your-username>/<your-repo>.git`
   - `git push -u origin main`

Notes
- If Git asks for your identity, run `git config --global user.name "Your Name"` and `git config --global user.email "you@example.com"`.
- For Netlify builds from GitHub, the root `netlify.toml` already points to `apps/web-app` and uses the Next plugin.