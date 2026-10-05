/**
 * Project catalogue
 * -----------------
 * Real projects, each driving a dedicated page in the VS Code–style workbench.
 * `github` is "owner/repo" and, when the repo is public, becomes a link.
 * Private/proprietary projects set `isPrivate: true` and show no repo link.
 * Extra links (papers, dashboards, notebooks, live sites) go in `links`.
 */

export type Accent = "yellow" | "coral" | "pink" | "green";

export interface ProjectImage {
  src: string;
  alt: string;
}

export type ProjectStatus = "completed" | "in-progress" | "archived";

export interface ProjectLink {
  label: string;
  url: string;
  icon?: string; // Font Awesome classes
}

export interface Project {
  slug: string;
  title: string;
  tagline: string;
  summary: string;
  description: string; // paragraphs split on \n\n
  year: string;
  role: string;
  /** "owner/repo"; becomes a repo link when the project is public. */
  github?: string;
  /** Proprietary / in-dev repos: no public link is rendered. */
  isPrivate?: boolean;
  demoUrl?: string;
  tech: string[];
  /** Primary language shown in the VS Code status bar. */
  language: string;
  images: ProjectImage[];
  accent: Accent;
  illustration: string;
  importance: string;
  technicality: string;
  clarity: string;
  featured?: boolean;
  status?: ProjectStatus;
  timeline?: string;
  links?: ProjectLink[];
  highlights?: string[];
  keyFeatures?: string[];
  outcome?: string;
}

export const projects: Project[] = [
  {
    slug: "nexa-lms",
    title: "Nexa LMS",
    tagline: "Invite-only learning platform for tutors and their students",
    summary:
      "A full-stack learning-management system for individual tutors and practices: authored courses, LaTeX-rich lessons, timed tests with 12 question types and per-question grading, assignments, and a shared schedule.",
    description:
      "Nexa is an invite-only LMS built for individual tutors and tutoring practices. Tutors author courses, publish lessons with LaTeX (MathJax) and markdown, run timed tests with twelve question types and nested sub-questions, grade per-answer with feedback, and share a schedule with their students. Students take tests, submit assignments, and see per-question grades in one place.\n\nThe test runner autosaves each answer (~3s debounced, flushed on navigation), counts down and auto-submits on expiry, and shows an online/offline indicator. Tutors get a drag-to-reorder authoring flow, JSON import/export for bulk test creation, and per-question grading with a sticky save bar. Every server entry point is role-gated (STUDENT / TUTOR).",
    year: "2025",
    role: "Full-stack developer",
    github: "jassiel-ndlovu/grit-lms",
    tech: [
      "Next.js 15",
      "React 19",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "NextAuth",
      "Tailwind v4",
      "shadcn/ui",
      "MathJax",
    ],
    language: "TypeScript",
    images: [],
    accent: "yellow",
    illustration: "teacher-student.svg",
    featured: true,
    status: "in-progress",
    timeline: "2025 – present",
    outcome:
      "A production-shaped LMS covering the full tutor and student workflow (authoring, testing, grading, scheduling) in one role-gated app.",
    highlights: [
      "12 question types incl. nested sub-questions",
      "Timed tests with debounced autosave & auto-submit",
      "LaTeX (MathJax) + markdown lesson rendering",
    ],
    keyFeatures: [
      "Course authoring, enrolment & lesson publishing",
      "Per-question grading with markdown feedback",
      "JSON import/export for bulk test creation",
      "Unified calendar of events & due dates",
      "Vercel Blob uploads; notifications feed",
    ],
    importance:
      "Turns a real tutoring workflow into dependable software for non-technical users, in a domain I know first-hand from four years of tutoring.",
    technicality:
      "Next.js 15 App Router with RSC, typed Zod-validated server actions (next-safe-action), Prisma/PostgreSQL, NextAuth with role gating, and MathJax rendering throughout.",
    clarity:
      "Organized as feature modules with a consistent server-action pattern, so each capability (tests, grading, calendar) is self-contained and easy to extend.",
  },
  {
    slug: "pmf-study",
    title: "Probabilistic Matrix Factorization",
    tagline: "A comparative study of PMF & Bayesian MF on MovieLens",
    summary:
      "Five factorization models and four baselines on MovieLens 100K and 1M, with ablations on capacity, regularization, link function and optimizer, error stratified by user activity, and a measurement of how training cost scales.",
    description:
      "A rigorous comparative study of probabilistic and Bayesian matrix factorization for recommendation. Each user and item carries a latent vector; an observed rating is a noisy inner product, and with Gaussian priors the MAP objective reduces to regularized squared error where the regularization strength is a ratio of variances, which is the sense in which the factorization is 'probabilistic'. The Bayesian extension (BPMF) replaces fixed prior variances with Gaussian–Wishart hyperpriors and integrates by Gibbs sampling.\n\nBPMF is the strongest model at 0.9087 test RMSE on MovieLens 100K, 0.0341 ahead of the best non-factorization baseline, and its advantage concentrates in sparse-profile users, exactly where the hierarchical prior should help. The ordering is preserved at ten times the data (1M), and training cost is shown to scale linearly in the number of observed entries. The repo ships 51 passing tests with finite-difference-checked gradients.",
    year: "2025",
    role: "Solo: research & implementation",
    github: "jassiel-ndlovu/Probabilistic-Matrix-Factorization",
    tech: ["Python", "NumPy", "Bayesian Inference", "Gibbs Sampling", "MovieLens"],
    language: "Python",
    images: [],
    accent: "coral",
    illustration: "aritificial-intelligence.svg",
    featured: true,
    status: "completed",
    timeline: "2025",
    outcome:
      "BPMF reaches 0.9087 RMSE on MovieLens 100K, beating the strongest baseline by 0.034, with gains concentrated where profiles are sparsest.",
    highlights: [
      "5 factorization models + 4 baselines",
      "51 passing tests, finite-difference-checked gradients",
      "Linear training-cost scaling verified empirically",
    ],
    keyFeatures: [
      "PMF, PMF+biases, logistic link, Adam, and BPMF",
      "Ablations on capacity, regularization & optimizer",
      "Error stratified by user activity",
      "MovieLens 100K & 1M with confidence intervals",
    ],
    links: [
      {
        label: "Paper (PDF)",
        url: "https://github.com/jassiel-ndlovu/Probabilistic-Matrix-Factorization/blob/master/report/main.pdf",
        icon: "fa-solid fa-file-pdf",
      },
    ],
    importance:
      "Demonstrates the ability to run a careful, honest empirical study (the metric that matters, controlled ablations and confidence intervals), not just train a model.",
    technicality:
      "From-scratch MAP and Bayesian (Gibbs-sampled) matrix factorization with variance-ratio regularization, plus a scaling analysis of training cost.",
    clarity:
      "A reproducible pipeline with a tested code base, an IEEE-style report, and an interactive results page tying every number back to a real run.",
  },
  {
    slug: "aura-fraud-detection",
    title: "AURA: Autoencoder Fraud Detection",
    tagline: "Label-free fraud detection via reconstruction error",
    summary:
      "Detecting fraudulent bank-account-opening applications without fraud labels, using a deep autoencoder trained only on legitimate records; anomalies are flagged by high reconstruction error on the NeurIPS-2022 BAF benchmark.",
    description:
      "AURA detects fraudulent bank-account-opening applications without any fraud labels. A deep autoencoder is trained only on legitimate transactions, and anomalies are flagged by high reconstruction error, giving a label-free first-line filter that narrows the review population. It is built on the Bank Account Fraud (BAF, NeurIPS 2022) benchmark: 1,000,000 records at 1.1% fraud.\n\nOn the held-out test set the autoencoder reaches ROC-AUC 0.592 and PR-AUC 0.016, beating an Isolation Forest baseline and the random floor on every metric. Average precision is treated as the honest headline for a 1.1%-prevalence problem (a 'never fraud' classifier already scores 98.9% accuracy). The project is a corrected, reproducible rebuild of an earlier course project. It fixes leakage, missing-value sentinels, categorical cardinalities, and thresholding done on validation rather than test.",
    year: "2025",
    role: "Solo: research & implementation",
    github: "jassiel-ndlovu/acml-project",
    tech: ["Python", "PyTorch", "Autoencoders", "Anomaly Detection", "Colab"],
    language: "Python",
    images: [],
    accent: "green",
    illustration: "security.svg",
    featured: true,
    status: "completed",
    timeline: "2025",
    outcome:
      "A leakage-free, fully unsupervised detector that beats an Isolation Forest baseline on every metric over 1M records.",
    highlights: [
      "Trained on 1M records at 1.1% fraud (BAF benchmark)",
      "Honest PR-AUC reporting, not misleading accuracy",
      "Leakage-free preprocessing; thresholds set on validation",
    ],
    keyFeatures: [
      "Deep autoencoder scored by reconstruction error",
      "Missing-indicator features + median imputation",
      "Isolation Forest baseline for context",
      "GPU-ready end-to-end Colab notebook",
    ],
    links: [
      {
        label: "Report (PDF)",
        url: "https://github.com/jassiel-ndlovu/acml-project/blob/main/AURA_report.pdf",
        icon: "fa-solid fa-file-pdf",
      },
    ],
    importance:
      "Fraud rarely comes labelled. This shows an unsupervised approach that adds value on a deliberately hard, imbalanced, real-world benchmark.",
    technicality:
      "Autoencoder anomaly detection with careful, leakage-free preprocessing (scaling, outlier clipping, missing-value handling) and honest imbalanced-classification evaluation.",
    clarity:
      "Config-driven scripts for split → preprocess → train → evaluate, an IEEE-style report, and a documented account of exactly what was fixed versus the original.",
  },
  {
    slug: "glyphcnn",
    title: "GlyphCNN",
    tagline: "A CNN that classifies heavily-degraded letter glyphs",
    summary:
      "A compact PyTorch CNN classifying degraded 32×32 binary images of capital letters into 21 classes, rebuilt from a first-year assignment into a modular, tested, reproducible, config-driven pipeline with a static results dashboard.",
    description:
      "GlyphCNN classifies heavily-degraded 32×32 binary images of capital letters (21 classes: the alphabet minus D, H, K, X, Z) under random orientation, salt-and-pepper noise and out-of-range pixels. It is a full revamp of one of my first ML projects. The original was a single flat script with hard-coded paths, no tests and no reproducibility; this rebuild is a modular, tested, installable package with a config dataclass describing every run.\n\nThe pretrained model scores 93.4% accuracy / 0.929 macro-F1 on recovered glyphs. Because the original raw pixel files were lost, a reconstruction script recovers the 32×32 arrays from 151 surviving matplotlib renders, a convention validated empirically by the pretrained model's score. A single self-contained HTML dashboard renders hero metrics, class gallery, training curves, confusion matrix and every classified sample.",
    year: "2025",
    role: "Solo",
    github: "jassiel-ndlovu/ml-classifier",
    tech: ["Python", "PyTorch", "CNNs", "pytest", "GitHub Actions"],
    language: "Python",
    images: [],
    accent: "yellow",
    illustration: "brain-sides.svg",
    status: "completed",
    timeline: "2025",
    outcome:
      "Pretrained model hits 93.4% accuracy / 0.929 macro-F1; the whole pipeline is reproducible, tested, and CI-checked.",
    highlights: [
      "93.4% accuracy, 0.929 macro-F1 (pretrained)",
      "Config-driven, installable, pytest + CI",
      "Dataset recovered from lost source via rendering",
    ],
    keyFeatures: [
      "3-conv-block CNN with FC head",
      "Stratified split, augmentation, early stopping",
      "Empirically-validated dataset reconstruction",
      "Single-file interactive results dashboard",
    ],
    importance:
      "Shows the jump from 'a script that runs' to real ML engineering: reproducibility, testing, packaging and honest reporting.",
    technicality:
      "A PyTorch CNN with a config-dataclass pipeline, plus a non-trivial dataset-recovery step that reconstructs the inputs from rendered images.",
    clarity:
      "An installable package with clear modules (config, data, model, engine, metrics) and legacy code preserved untouched for comparison.",
  },
  {
    slug: "sudoku-studio",
    title: "Sudoku Studio",
    tagline: "Generate, solve & explain Sudoku from 4×4 to 64×64",
    summary:
      "An Angular app that generates, solves, and explains Sudoku puzzles of any size from 4×4 to 64×64, with two traced solvers (DFS backtracking and Knuth's Dancing Links) and a step-through player that narrates the derivation.",
    description:
      "Sudoku Studio generates, solves, and explains Sudoku of any size (sub-grid n from 2 to 8, giving boards from 4×4 up to 64×64) across four difficulties controlled by how aggressively clues are carved from a full solution (uniqueness verified for n ≤ 4).\n\nIt ships two solvers, both fully traced: DFS backtracking with the Minimum-Remaining-Values heuristic (distinguishing forced deductions from guesses), and Knuth's Dancing Links / Algorithm X, which models Sudoku as an exact-cover problem over four constraint families and typically solves hard boards with zero guesses. A step-through player lets you scrub, play/pause and read a narrated log of every placement, deduction, guess and backtrack, with the touched cell highlighted. Boards can be imported/exported as JSON, and big boards get guardrails (time limits, trace caps).",
    year: "2025",
    role: "Solo",
    github: "jassiel-ndlovu/soduku-solver",
    tech: ["Angular 19", "TypeScript", "Algorithm X (DLX)", "Backtracking"],
    language: "TypeScript",
    images: [],
    accent: "coral",
    illustration: "problem-solving.svg",
    status: "completed",
    timeline: "2025",
    outcome:
      "Two traced solvers and a narrated step-through player over boards from 4×4 to 64×64.",
    highlights: [
      "Boards from 4×4 up to 64×64",
      "DFS (MRV) and Dancing Links / Algorithm X",
      "Move-by-move narrated explanation",
    ],
    keyFeatures: [
      "Unique-solution generation for n ≤ 4",
      "Exact-cover modelling with O(1) cover/uncover",
      "JSON import/export & hand entry",
      "Time & trace guardrails for large boards",
    ],
    importance:
      "A clear demonstration of algorithms & data structures, and of making a hard algorithm legible by narrating exactly how it reasons.",
    technicality:
      "Two complete solvers, including a Dancing Links exact-cover implementation with Knuth's S-heuristic, plus generation with uniqueness verification.",
    clarity:
      "A traced engine with a headless correctness harness separate from the Angular UI, so the algorithms can be tested without a browser.",
  },
  {
    slug: "latex-template-manager",
    title: "LaTeX Template Manager",
    tagline: "Cross-platform CLI + desktop app for LaTeX templates",
    summary:
      "A cross-platform desktop app and CLI for storing, scaffolding, previewing, and sharing LaTeX templates. One shared .NET 10 core sits behind two thin front-ends, with an Avalonia desktop UI styled after VS Code.",
    description:
      "LaTeX Template Manager turns the repetitive parts of starting a LaTeX document into a guided workflow: pick a template, fill a short form, and get a ready-to-compile project with a build profile, a .gitignore, an optional git repo, and one-click PDF preview. It ships a curated library (IEEE papers plus a teaching set) and lets you package your own projects into reusable templates to import, export and share.\n\nAll logic (storage, variable substitution, scaffolding, compilation, validation) lives in a single Core library with zero external NuGet packages; the CLI and the Avalonia GUI are thin shells over it, so behaviour never diverges. The desktop UI is a VS Code-style workbench (activity bar, side bar, editor, accent status bar; Dark+ palette) built with Avalonia 11 / MVVM, compiling via latexmk and rendering the PDF inline with PDFium.",
    year: "2025",
    role: "Solo",
    github: "jassiel-ndlovu/LatexTemplateManager",
    tech: ["C#", ".NET 10", "Avalonia 11 (MVVM)", "PDFium", "latexmk"],
    language: "C#",
    images: [],
    accent: "green",
    illustration: "research-paper.svg",
    status: "completed",
    timeline: "2025",
    outcome:
      "One .NET core powering both a CLI and a VS Code-style desktop app, with real LaTeX build + inline PDF preview.",
    highlights: [
      "Single core, two thin front-ends (CLI + GUI)",
      "VS Code-style Avalonia desktop UI",
      "Real latexmk build + inline PDFium preview",
    ],
    keyFeatures: [
      "Guided, manifest-driven project scaffolding",
      "Template authoring, validation & .zip sharing",
      "Toolchain detection (TeX, VS Code, git)",
      "Dependency-free, cross-platform core",
    ],
    importance:
      "Shows clean architecture in practice: shared domain logic, two independent front-ends, and a real cross-platform desktop UI.",
    technicality:
      "A dependency-free .NET 10 core of single-purpose services behind interfaces, consumed by a DI-wired Avalonia MVVM GUI and a hand-wired CLI.",
    clarity:
      "Strict separation between core and presentation means the CLI and GUI can never drift; everything the GUI does, `ltm` does too.",
  },
  {
    slug: "playbot",
    title: "Playbot",
    tagline: "Multi-architecture betting automator with an ML loop",
    summary:
      "A multi-layer web automator that places bets, streams the outcomes into a data + feature store, trains an ML model on them, and feeds a risk-aware decision engine. It is a closed learning loop across .NET, Kafka, PostgreSQL and Python.",
    description:
      "Playbot is a multi-architecture automation platform: it places a bet, collects the bet's data and circumstances into a store, trains Playbot-ML on that data to suggest future bets, and a decision engine (automatic or human-gated) schedules the next action, closing the loop.\n\nIt is designed in layers: a .NET 8 automation core (Playwright + Multilogin profile management) for navigation and placement; a normalization layer producing structured events; a Kafka/Redis stream; PostgreSQL plus a feature store; a Python/PyTorch training-and-inference service behind FastAPI; and a decision engine implementing bankroll management and Kelly-Criterion bet sizing with risk thresholds and a manual-approval gate. Shared Protobuf/JSON contracts tie the services together, with Docker and Terraform for infra.",
    year: "2025",
    role: "Solo: architecture & implementation",
    isPrivate: true,
    tech: [
      ".NET 8",
      "Playwright",
      "Kafka",
      "PostgreSQL",
      "Python",
      "PyTorch",
      "FastAPI",
      "Docker",
    ],
    language: "C#",
    images: [],
    accent: "yellow",
    illustration: "robotics.svg",
    status: "in-progress",
    timeline: "2025 – present",
    outcome:
      "An event-driven automation + ML loop spanning six services, currently in development (private while secrets are hardened and prod-tested).",
    highlights: [
      "Closed automate → collect → train → decide loop",
      "Kelly-Criterion sizing with risk thresholds",
      "Event-driven microservices with shared contracts",
    ],
    keyFeatures: [
      ".NET automation core (Playwright + Multilogin)",
      "Kafka/Redis event streaming",
      "PyTorch training + FastAPI inference",
      "Docker + Terraform infrastructure",
    ],
    importance:
      "An ambitious distributed system that ties automation, streaming data, ML and risk-managed decisioning into one coherent architecture.",
    technicality:
      "Six coordinated services across .NET, Kafka, PostgreSQL, a feature store and PyTorch/FastAPI, with Protobuf/JSON event contracts and IaC.",
    clarity:
      "Each layer is a bounded context with an explicit contract; events are the single source of truth between automation, ML and decisioning.",
  },
  {
    slug: "photography-portfolio",
    title: "Blessings Dube Photography",
    tagline: "Portfolio & booking site for a Johannesburg photographer",
    summary:
      "A client portfolio-and-booking website for a Johannesburg photographer: browse the portfolio and book a chosen service directly on the site, with email delivery via Resend and animation via GSAP.",
    description:
      "A portfolio-and-booking website for a small startup around Johannesburg photographer Mbonisi Blessings Dube, where clients browse the portfolio and book the photographer for a specific service directly on the site. Booking requests are delivered by email via Resend.\n\nDelivered with a team of five (the editor/developer also handling graphic design, merch and design), the site is built with TypeScript, Tailwind CSS and GSAP for motion, and deployed on Vercel. The repository is private while the product is finished for production.",
    year: "2025",
    role: "Developer (team of 5)",
    isPrivate: true,
    demoUrl: "https://blessings-dube-portfolio.vercel.app/",
    tech: ["TypeScript", "Tailwind CSS", "GSAP", "Resend", "Vercel"],
    language: "TypeScript",
    images: [],
    accent: "pink",
    illustration: "digital-artist.svg",
    status: "in-progress",
    timeline: "2025 – present",
    outcome:
      "A live client site where visitors browse work and book a service, with bookings delivered by email.",
    highlights: [
      "Client booking flow with Resend email delivery",
      "GSAP-driven motion & transitions",
      "Shipped with a 5-person team",
    ],
    keyFeatures: [
      "Service-based booking on-site",
      "Portfolio browsing experience",
      "Deployed on Vercel",
    ],
    importance:
      "Real client work for a startup: shipping a polished, animated product that has to convert visitors into bookings.",
    technicality:
      "A TypeScript/Tailwind site with GSAP motion and a Resend-backed booking pipeline.",
    clarity:
      "A focused site built around a single conversion goal (view the work, book a service), delivered collaboratively.",
  },
  {
    slug: "dev-portfolio",
    title: "This Portfolio & CV",
    tagline: "The project-based CV you're reading right now",
    summary:
      "A project-based portfolio and CV built with Next.js and deployed to AWS Amplify, with a black, white and yellow design system, Open Peeps, Transhumans and recolored Storyset illustrations, and this VS Code-style projects workbench.",
    description:
      "This very site: a project-based portfolio and CV built with the Next.js App Router and TypeScript, styled with a hand-built Tailwind design system in a black, white and warm yellow palette, with Open Peeps, Transhumans and recolored Storyset illustrations, and GSAP ScrollTrigger animations. The projects section is a VS Code-inspired workbench: an explorer sidebar, an editor pane and a status bar carrying repo, tech and status.\n\nContent is fully data-driven from a handful of typed config files, so adding a project or a whole section is a one-object change. It deploys to AWS Amplify Hosting via a Git-connected pipeline.",
    year: "2026",
    role: "Design & development",
    github: "jassiel-ndlovu/dev-portfolio",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "GSAP", "AWS Amplify"],
    language: "TypeScript",
    images: [],
    accent: "coral",
    illustration: "developer.svg",
    status: "in-progress",
    timeline: "2026",
    outcome:
      "A living, data-driven CV that doubles as a project in its own right.",
    highlights: [
      "VS Code-style projects workbench",
      "Custom recolored Storyset illustration set",
      "Deployed on AWS Amplify",
    ],
    keyFeatures: [
      "Data-driven content from typed config",
      "Searchable project explorer",
      "Auto-scrolling skills marquees",
      "Responsive, accessible design",
    ],
    importance:
      "End-to-end product sense in one shipped artifact: design system, motion, and cloud deployment.",
    technicality:
      "App Router with static generation, a bespoke Tailwind v4 theme, and an SVG recolouring pipeline for the illustration set.",
    clarity:
      "A handful of typed config files drive every page, so the whole site is one small edit away from new content.",
  },
  {
    slug: "cv-labs",
    title: "Computer Vision Labs",
    tagline: "Colab labs: filtering, CNNs from scratch, transfer learning",
    summary:
      "Colab-ready computer-vision lab notebooks (Wits COMS4036A / COMS7050A): classical convolution and filtering, a CNN built from scratch on CIFAR-10, and transfer learning on a chosen dataset.",
    description:
      "A set of Colab-ready computer-vision labs from Wits (COMS4036A / COMS7050A): convolution and classical filtering; building a CNN from scratch and training it on CIFAR-10; and transfer learning on a dataset of choice. The notebooks are GPU-ready and self-contained.\n\nThis is coursework rather than a product, included to show hands-on depth in computer vision and deep learning fundamentals, from hand-rolled convolutions to modern transfer learning.",
    year: "2025",
    role: "Coursework (Wits)",
    github: "jassiel-ndlovu/cv-labs",
    tech: ["Python", "PyTorch", "Computer Vision", "CIFAR-10", "Colab"],
    language: "Python",
    images: [],
    accent: "green",
    illustration: "desktop-computer.svg",
    status: "completed",
    timeline: "2025",
    outcome:
      "Hands-on CV fundamentals: classical filtering, a from-scratch CNN, and transfer learning.",
    keyFeatures: [
      "Convolution & classical filtering",
      "A CNN from scratch on CIFAR-10",
      "Transfer learning on a chosen dataset",
    ],
    importance:
      "Grounds the deep-learning work in fundamentals: understanding convolutions and training dynamics from first principles.",
    technicality:
      "From hand-rolled convolution to a from-scratch CNN and modern transfer learning, all GPU-ready in Colab.",
    clarity:
      "Self-contained notebooks, each focused on one concept and runnable end-to-end.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

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

export const statusMeta: Record<
  ProjectStatus,
  { label: string; dot: string; className: string }
> = {
  completed: {
    label: "Completed",
    dot: "bg-green",
    className: "text-green bg-green-soft",
  },
  "in-progress": {
    label: "In progress",
    dot: "bg-yellow-deep",
    className: "text-ink bg-yellow-soft",
  },
  archived: {
    label: "Archived",
    dot: "bg-subtle",
    className: "text-subtle bg-alt",
  },
};

/** Per-project accent: a bold chip colour and a soft wash. */
export const accentClasses: Record<
  Accent,
  { chip: string; soft: string; hex: string }
> = {
  yellow: { chip: "bg-yellow text-ink", soft: "bg-yellow-soft", hex: "#ffc845" },
  coral: { chip: "bg-coral text-ink", soft: "bg-[#ffe1d8]", hex: "#ff7a59" },
  pink: { chip: "bg-pink text-ink", soft: "bg-[#ffe6ec]", hex: "#ffb8c6" },
  green: { chip: "bg-green text-white", soft: "bg-green-soft", hex: "#1e5b43" },
};
