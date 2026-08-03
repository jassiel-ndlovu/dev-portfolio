/**
 * Project catalogue
 * -----------------
 * Each entry drives a dedicated project page. Fill in the placeholder text,
 * point `github` at "owner/repo" to light up the live GitHub panel, and add
 * `demoUrl` / `images` when you have them.
 *
 * `accent` chooses the playful color used for that project's UI accents.
 * `illustration` is the filename of a Storyset SVG placed in /public/illustrations.
 */

export type Accent = "orange" | "deep" | "brick" | "peach";

export interface ProjectImage {
  src: string; // path under /public or remote URL
  alt: string;
}

export type ProjectStatus = "completed" | "in-progress" | "archived";

export interface ProjectLink {
  label: string;
  url: string;
  /** Font Awesome classes, e.g. "fa-brands fa-youtube" or "fa-solid fa-book". */
  icon?: string;
}

export interface Project {
  slug: string;
  title: string;
  tagline: string; // one-liner for the list panel
  summary: string; // 1–2 sentence intro on the project page
  description: string; // fuller narrative (supports plain paragraphs, split on \n\n)
  year: string;
  role: string;
  /** "owner/repo" — powers the live GitHub stats panel. Omit if no public repo. */
  github?: string;
  demoUrl?: string;
  tech: string[];
  images: ProjectImage[];
  accent: Accent;
  /** Storyset SVG filename in /public/illustrations (see README for how to add). */
  illustration: string;
  /** The three required narrative lenses for every project. */
  importance: string;
  technicality: string;
  clarity: string;

  /* ---- Optional extras (all safe to omit) ---- */
  /** Show a highlight star in the list + a ribbon on the card. */
  featured?: boolean;
  /** Drives the status pill. Defaults to "completed" when omitted. */
  status?: ProjectStatus;
  /** Free-text timeline, e.g. "Jan – Apr 2024 · 3 months". */
  timeline?: string;
  /** Extra links beyond demo/source (docs, video, article, npm…). */
  links?: ProjectLink[];
  /** 2–4 punchy impact bullets shown in a callout near the top. */
  highlights?: string[];
  /** Bulleted list of notable features. */
  keyFeatures?: string[];
  /** One-line outcome / impact statement. */
  outcome?: string;
}

export const statusMeta: Record<
  ProjectStatus,
  { label: string; dot: string; className: string }
> = {
  completed: {
    label: "Completed",
    dot: "bg-emerald-500",
    className: "text-emerald-700 bg-emerald-500/10",
  },
  "in-progress": {
    label: "In progress",
    dot: "bg-accent",
    className: "text-accent-deep bg-accent/10",
  },
  archived: {
    label: "Archived",
    dot: "bg-muted",
    className: "text-muted bg-foreground/5",
  },
};

export const projects: Project[] = [
  {
    slug: "sql-engine",
    title: "Java SQL Engine & Compiler",
    tagline: "A from-scratch SQL database engine and query compiler",
    summary:
      "A relational engine built in Java from the ground up: a lexer, parser, query planner, and execution layer that turns SQL text into runnable query plans over a custom storage layer.",
    description:
      "Placeholder — replace with your write-up.\n\nThis project implements a SQL database engine in pure Java without an ORM or existing DB library. It includes a hand-written lexer and recursive-descent parser that produce an AST, a semantic analysis pass, a logical/physical query planner, and an execution engine operating over a custom page-based storage layer.\n\nDescribe the SQL surface you support (SELECT/JOIN/WHERE/aggregations/etc.), your indexing strategy, and any optimizations (predicate pushdown, join ordering) you implemented.",
    year: "2024",
    role: "Solo — language & systems design",
    github: "your-username/java-sql-engine",
    tech: ["Java", "Compilers", "Parsing", "Data Structures", "JUnit"],
    images: [],
    accent: "deep",
    illustration: "Server.svg",
    importance:
      "Placeholder — why this matters. Building a database engine from scratch demonstrates deep command of systems fundamentals: parsing, query planning, storage, and the tradeoffs behind the tools most engineers only consume.",
    technicality:
      "Placeholder — the hard parts. Hand-written lexer and recursive-descent parser, an AST and semantic analyzer, a cost-aware query planner, and a page-based storage layer with indexing — all without external database libraries.",
    clarity:
      "Placeholder — how it's organized. Clean separation between front-end (lexing/parsing), middle-end (planning/optimization), and back-end (execution/storage), with a documented grammar and a test suite covering each stage.",
    featured: true,
    status: "completed",
    timeline: "2024 · ~4 months",
    outcome:
      "A working SQL engine that parses, plans, and executes queries over a custom storage layer — no external DB libraries.",
    highlights: [
      "Hand-written lexer + recursive-descent parser",
      "Cost-aware query planner",
      "Page-based storage with indexing",
    ],
    keyFeatures: [
      "SELECT / WHERE / JOIN / aggregations",
      "AST + semantic analysis pass",
      "Predicate pushdown & join ordering",
      "JUnit test suite per compiler stage",
    ],
  },
  {
    slug: "betting-platform",
    title: "Sports Betting & Casino Platform",
    tagline: "Event-driven, API-first gaming platform on Docker",
    summary:
      "A containerized sports-betting and casino gaming platform driven by APIs and event messaging, with web automators that scrape and normalize odds and game data into the pipeline.",
    description:
      "Placeholder — replace with your write-up.\n\nA distributed platform composed of independently deployable services running on Docker, communicating over an event-messaging backbone. Web automators embedded in the platform fetch and normalize external odds/game data and publish it into the pipeline, where downstream services react to events.\n\nDescribe the services, the messaging technology (e.g. Kafka/RabbitMQ), how you handled idempotency and back-pressure, and the API gateway that fronts everything.",
    year: "2024",
    role: "Backend & platform engineering",
    github: "your-username/gaming-platform",
    tech: [
      "Docker",
      "Event Messaging",
      "REST APIs",
      "Web Automation",
      "Microservices",
    ],
    images: [],
    accent: "orange",
    illustration: "digital-transformation.svg",
    importance:
      "Placeholder — why this matters. Real-money gaming demands correctness, low latency, and resilience. This project shows the ability to design a fault-tolerant, event-driven system where data integrity and uptime are non-negotiable.",
    technicality:
      "Placeholder — the hard parts. Containerized microservices, an event-messaging backbone, embedded web automators for live data ingestion, and an API layer coordinating asynchronous workflows across services.",
    clarity:
      "Placeholder — how it's organized. Each service owns a bounded context with a clear contract; events are the single source of truth, and the automators are decoupled producers feeding a well-documented pipeline.",
    featured: true,
    status: "completed",
    timeline: "2024",
    keyFeatures: [
      "Independently deployable Docker services",
      "Event-messaging backbone",
      "Embedded web automators for live data",
      "API gateway fronting the platform",
    ],
  },
  {
    slug: "android-app",
    title: "Android Mobile Application",
    tagline: "A native Android app built in Android Studio",
    summary:
      "A native Android application designed and built in Android Studio, covering the full mobile lifecycle from UI/UX to local persistence and networked data.",
    description:
      "Placeholder — replace with your write-up.\n\nDescribe the app's purpose, the core screens and flows, how you structured the app (e.g. MVVM), how you handled state, persistence (Room/SQLite), and any API integrations. Mention notable UX touches and how you tested on devices/emulators.",
    year: "2023",
    role: "Mobile developer",
    github: "your-username/android-app",
    tech: ["Kotlin/Java", "Android Studio", "MVVM", "Room", "REST APIs"],
    images: [],
    accent: "brick",
    illustration: "mobile-application.svg",
    importance:
      "Placeholder — why this matters. Shipping a native mobile app end-to-end demonstrates product thinking and the discipline of building for constrained, real-world devices and users.",
    technicality:
      "Placeholder — the hard parts. Lifecycle-aware architecture, local persistence, background work, and networked data handling within Android's component model.",
    clarity:
      "Placeholder — how it's organized. A clean layered architecture separating UI, view-models, and data sources, making the app easy to extend and test.",
    status: "completed",
    timeline: "2023",
    keyFeatures: [
      "MVVM architecture",
      "Room / SQLite persistence",
      "REST API integration",
      "Tested on devices & emulators",
    ],
  },
  {
    slug: "tutoring-lms",
    title: "Online Tutoring LMS",
    tagline: "A learning-management system for online tutoring",
    summary:
      "A learning-management system for online tutoring: course and lesson management, scheduling, and role-based access for tutors and students.",
    description:
      "Placeholder — replace with your write-up.\n\nDescribe the LMS's core features (courses, lessons, materials, scheduling, progress tracking), the roles and permissions model, the data model, and the stack you used for the front-end and back-end. Note anything about real-time features or media handling.",
    year: "2023",
    role: "Full-stack developer",
    github: "your-username/tutoring-lms",
    tech: ["Full-Stack", "Auth & RBAC", "Relational DB", "REST APIs"],
    images: [],
    accent: "deep",
    illustration: "teacher-student.svg",
    importance:
      "Placeholder — why this matters. Education platforms have to be dependable and accessible for non-technical users; this project shows the ability to translate a real workflow into reliable software.",
    technicality:
      "Placeholder — the hard parts. Role-based access control, a relational data model spanning courses/lessons/enrolments, and scheduling logic tying tutors and students together.",
    clarity:
      "Placeholder — how it's organized. A cleanly modeled domain with well-scoped permissions and a straightforward, documented API surface.",
    status: "completed",
    timeline: "2023",
    keyFeatures: [
      "Courses, lessons & materials",
      "Tutor/student scheduling",
      "Role-based access control",
      "Progress tracking",
    ],
  },

  /* ---- Slots 5–8: replace these placeholders with your remaining
     GitHub projects. Point `github` at "owner/repo" to light up the
     live stats panel, and swap the illustration if you like. ---- */
  {
    slug: "big-data-pipeline",
    title: "Big Data Analytics Pipeline",
    tagline: "Placeholder — batch/stream analytics pipeline",
    summary:
      "Placeholder — a data pipeline that ingests, processes, and visualizes large datasets, tied to my Honours in Data Science / Big Data Analytics.",
    description:
      "Placeholder — replace with your write-up. Describe the data sources, the processing framework (Spark / pandas / etc.), storage, and the dashboards or models you produced.",
    year: "2026",
    role: "Data engineering & analysis",
    github: "your-username/big-data-pipeline",
    tech: ["Python", "Big Data", "Data Science", "SQL"],
    images: [],
    accent: "orange",
    illustration: "dashboard.svg",
    status: "in-progress",
    timeline: "2026 · ongoing",
    importance:
      "Placeholder — why this matters.",
    technicality:
      "Placeholder — the hard parts.",
    clarity:
      "Placeholder — how it's organized.",
  },
  {
    slug: "algorithms-library",
    title: "Algorithms & Data Structures",
    tagline: "Placeholder — a reference library of algorithms",
    summary:
      "Placeholder — a well-tested collection of classic data structures and algorithms implemented from scratch.",
    description:
      "Placeholder — replace with your write-up. List the structures/algorithms covered, complexity analysis, and the testing/benchmark approach.",
    year: "2023",
    role: "Solo",
    github: "your-username/algorithms",
    tech: ["Java", "Algorithms", "Data Structures", "Testing"],
    images: [],
    accent: "deep",
    illustration: "brain-sides.svg",
    status: "completed",
    importance: "Placeholder — why this matters.",
    technicality: "Placeholder — the hard parts.",
    clarity: "Placeholder — how it's organized.",
  },
  {
    slug: "web-automation-toolkit",
    title: "Web Automation Toolkit",
    tagline: "Placeholder — scrapers & automation utilities",
    summary:
      "Placeholder — a toolkit for automating web tasks and normalizing scraped data into structured feeds.",
    description:
      "Placeholder — replace with your write-up. Describe the sites/targets, scheduling, anti-fragility, and how data is validated and published.",
    year: "2024",
    role: "Solo",
    github: "your-username/web-automation",
    tech: ["Python", "Web Automation", "APIs", "Scheduling"],
    images: [],
    accent: "brick",
    illustration: "robotics.svg",
    status: "completed",
    importance: "Placeholder — why this matters.",
    technicality: "Placeholder — the hard parts.",
    clarity: "Placeholder — how it's organized.",
  },
  {
    slug: "portfolio-website",
    title: "This Portfolio Website",
    tagline: "The project-based CV you're reading right now",
    summary:
      "A project-based portfolio and CV built with Next.js and deployed to Azure Static Web Apps — with live GitHub data, custom illustrations, and a hand-built design system.",
    description:
      "This very site. A project-based CV built with the Next.js App Router and TypeScript, styled with a custom Tailwind design system in a sunset palette. Illustrations are recolored Storyset artwork; motion is handled with Framer Motion. A serverless route proxies the GitHub API (holding a read-only token server-side) to render live repository stats on each project page. It deploys to Azure Static Web Apps via GitHub Actions.",
    year: "2026",
    role: "Design & development",
    github: "your-username/dev-portfolio",
    demoUrl: "",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Azure"],
    images: [],
    accent: "orange",
    illustration: "developer.svg",
    featured: true,
    status: "in-progress",
    timeline: "2026",
    outcome:
      "A living, project-based CV that pulls fresh GitHub stats and doubles as a project in its own right.",
    highlights: [
      "Live GitHub stats via a serverless proxy",
      "Custom recolored Storyset illustrations",
      "Deployed on Azure Static Web Apps",
    ],
    keyFeatures: [
      "Panelled projects view with prev/next",
      "Searchable project sidebar",
      "Auto-scrolling skills marquees",
      "Fully responsive, accessible design",
    ],
    importance:
      "Shows end-to-end product sense: design system, animation, live data integration, and cloud deployment in one shipped artifact.",
    technicality:
      "App Router with static + server routes, a GitHub API proxy with caching and rate-limit handling, and a token that never reaches the browser.",
    clarity:
      "Content is fully data-driven from a handful of typed config files, so adding a project or section is a one-object change.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Returns { prev, next } for the prev/next panel, wrapping around the list. */
export function getAdjacent(slug: string): {
  prev: Project | null;
  next: Project | null;
} {
  const i = projects.findIndex((p) => p.slug === slug);
  if (i === -1) return { prev: null, next: null };
  const prev = i > 0 ? projects[i - 1] : null;
  const next = i < projects.length - 1 ? projects[i + 1] : null;
  return { prev, next };
}

export const accentClasses: Record<
  Accent,
  { text: string; bg: string; bgSoft: string; border: string; ring: string }
> = {
  orange: {
    text: "text-accent",
    bg: "bg-accent",
    bgSoft: "bg-accent/10",
    border: "border-accent",
    ring: "ring-accent",
  },
  deep: {
    text: "text-accent-deep",
    bg: "bg-accent-deep",
    bgSoft: "bg-accent-deep/10",
    border: "border-accent-deep",
    ring: "ring-accent-deep",
  },
  brick: {
    text: "text-accent-dark",
    bg: "bg-accent-dark",
    bgSoft: "bg-accent-dark/10",
    border: "border-accent-dark",
    ring: "ring-accent-dark",
  },
  peach: {
    text: "text-accent-dark",
    bg: "bg-peach",
    bgSoft: "bg-peach/30",
    border: "border-peach",
    ring: "ring-peach",
  },
};
