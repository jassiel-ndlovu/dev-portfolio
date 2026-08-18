# Nkosenhle Ndlovu — Developer Portfolio & CV

A minimalist, project-based portfolio and CV, with a whimsical cartoon
(Storyset "cuate") aesthetic. Built with Next.js, TypeScript, Tailwind CSS v4,
and Framer Motion; deploys to AWS Amplify Hosting.

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

## Deploying to AWS Amplify Hosting (static export)

The site is a **static export** (`output: "export"` in `next.config.ts`) — no
server or runtime. `next build` emits a plain `out/` folder that Amplify hosts
as static files.

1. Push this repo to GitHub.
2. In the AWS Console, open **AWS Amplify → Create new app → Host web app**,
   authorize GitHub, and pick this repo and the `main` branch.
3. **Leave "monorepo" unchecked** and the app-root directory blank — the app is
   at the repo root. The included `amplify.yml` builds with Node 20 and serves
   `baseDirectory: out`.
4. Save and deploy. Every push to `main` redeploys automatically.

If the app was first created as a Next.js **SSR** app, it will look for a
server manifest JSON that a static export doesn't produce. Flip it to static
hosting once:

```bash
aws amplify update-app --app-id <YOUR_APP_ID> --platform WEB
```

No environment variables are required. `staticwebapp.config.json` and the
disabled Azure workflow are leftovers and can be deleted.

## Tech stack

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · AWS Amplify.
