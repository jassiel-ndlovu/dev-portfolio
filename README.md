# Jassiel Nkosi — Developer Portfolio & CV

A minimalist, project-based portfolio and CV, with a whimsical cartoon
(Storyset "cuate") aesthetic. Built with Next.js, TypeScript, Tailwind CSS v4,
and Framer Motion; deploys to Azure Static Web Apps.

## Highlights

- **Landing page** — animated hero with floating shapes and a Storyset illustration.
- **Projects** — a left panel lists all projects, a bottom-left panel shows
  previous/next, and the main panel renders the current project: overview, a
  **live GitHub panel** (languages, commits, forks, stars, topics), a screenshot
  gallery + demo link, and dedicated **Importance / Technicality / Clarity** cards.
- **CV** — a clean résumé page driven by a single config file.
- **GitHub proxy** — a serverless route holds a read-only token server-side, so
  it never reaches the browser and you get authenticated rate limits.

## Getting started

```bash
npm install
cp .env.local.example .env.local   # then add your GitHub token
npm run dev                         # http://localhost:3000
```

## Where to edit things

| What | File |
| --- | --- |
| Name, tagline, links, CV content | `src/lib/site.ts` |
| Projects (all content + GitHub repo) | `src/lib/projects.ts` |
| Colors / fonts / design tokens | `src/app/globals.css` |
| Landing hero | `src/components/hero.tsx` |
| Project page layout | `src/app/projects/[slug]/page.tsx` |
| Left list + prev/next panel | `src/components/project-sidebar.tsx` |

### Adding a project

Add an entry to the `projects` array in `src/lib/projects.ts`. Set `github` to
`"owner/repo"` to light up the live stats panel, add a `demoUrl`, and push
screenshots into `public/` then reference them in `images`.

Each project has three required narrative fields — `importance`, `technicality`,
and `clarity` — rendered as cards on the project page.

## Illustrations (Storyset)

Placeholder SVGs live in `public/illustrations/`. To use the real cartoons:

1. Download "cuate" style SVGs from <https://storyset.com/cuate> (recolor to the
   palette if you like — the site uses amber `#f5a524` with teal/coral/purple/blue accents).
2. Drop them in `public/illustrations/`.
3. Reference the filename in a project's `illustration` field (or `hero.svg` for the landing page).

The free Storyset license requires attribution — a link is already in the footer.

## Deploying to Azure Static Web Apps

1. Push this repo to GitHub.
2. In the Azure Portal, create a **Static Web App** and connect it to the repo.
   Choose **Next.js** as the build preset (app location `/`). Azure adds an API
   token secret to your repo automatically.
3. The included workflow (`.github/workflows/azure-static-web-apps.yml`) then
   builds and deploys on every push to `main`.
4. Add your GitHub token in **two** places:
   - Repo secret `PORTFOLIO_GITHUB_TOKEN` (used at build/deploy).
   - SWA **Configuration → Application settings** as `GITHUB_TOKEN` (used at runtime).

## Tech stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Azure Static Web Apps.
