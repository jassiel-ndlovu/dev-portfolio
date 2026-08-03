import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  projects,
  getProject,
  getAdjacent,
  accentClasses,
  statusMeta,
} from "@/lib/projects";
import { site } from "@/lib/site";
import { GitHubPanel } from "@/components/github-panel";
import { ImageGallery } from "@/components/image-gallery";
import { Illustration } from "@/components/illustration";
import { Reveal } from "@/components/reveal";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: "Project not found" };
  return { title: `${project.title} — ${site.name}`, description: project.summary };
}

const lenses = [
  { key: "importance", label: "Importance", hint: "Why it matters" },
  { key: "technicality", label: "Technicality", hint: "The hard parts" },
  { key: "clarity", label: "Clarity", hint: "How it's organized" },
] as const;

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const a = accentClasses[project.accent];
  const { prev, next } = getAdjacent(slug);

  return (
    <article className="pb-10">
      {/* Header */}
      <Reveal>
        <div className="relative overflow-hidden rounded-2xl border border-border bg-surface p-6 sm:p-8">
          <div className="grid items-center gap-6 sm:grid-cols-[1fr_auto]">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2 text-xs font-medium">
                <span
                  className={`inline-flex items-center gap-2 rounded-full ${a.bgSoft} px-3 py-1 ${a.text}`}
                >
                  <span className={`h-2 w-2 rounded-full ${a.bg}`} />
                  {project.year} · {project.role}
                </span>
                {(() => {
                  const s = statusMeta[project.status ?? "completed"];
                  return (
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 ${s.className}`}
                    >
                      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                      {s.label}
                    </span>
                  );
                })()}
                {project.timeline && (
                  <span className="rounded-full border border-border px-3 py-1 text-muted">
                    {project.timeline}
                  </span>
                )}
                {project.featured && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/10 px-3 py-1 text-accent-deep">
                    ★ Featured
                  </span>
                )}
              </div>
              <h1 className="display text-3xl sm:text-4xl md:text-5xl">
                {project.title}
              </h1>
              <p className="mt-3 max-w-xl text-muted">{project.summary}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-muted"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`rounded-full ${a.bg} px-5 py-2.5 text-sm font-medium text-white transition-transform hover:-translate-y-0.5`}
                  >
                    Live demo ↗
                  </a>
                )}
                {project.github && (
                  <a
                    href={`https://github.com/${project.github}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium transition-colors hover:bg-foreground/5"
                  >
                    <i className="fa-brands fa-github" aria-hidden="true" /> Source ↗
                  </a>
                )}
                {project.links?.map((l) => (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border bg-background px-5 py-2.5 text-sm font-medium transition-colors hover:bg-foreground/5"
                  >
                    {l.icon && <i className={l.icon} aria-hidden="true" />}
                    {l.label} ↗
                  </a>
                ))}
              </div>
            </div>

            <Illustration
              name={project.illustration}
              alt={`${project.title} illustration`}
              className="mx-auto hidden aspect-square w-40 sm:block"
            />
          </div>
        </div>
      </Reveal>

      {/* Outcome + highlights callout */}
      {(project.outcome || project.highlights?.length) && (
        <Reveal delay={0.05} className="mt-6">
          <div className={`rounded-2xl border border-border ${a.bgSoft} p-6`}>
            {project.outcome && (
              <p className="text-base font-medium text-foreground">
                {project.outcome}
              </p>
            )}
            {project.highlights?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {project.highlights.map((h) => (
                  <span
                    key={h}
                    className="rounded-full bg-surface px-3 py-1.5 text-sm text-foreground/80 shadow-sm"
                  >
                    {h}
                  </span>
                ))}
              </div>
            ) : null}
          </div>
        </Reveal>
      )}

      {/* GitHub live panel */}
      {project.github && (
        <Reveal delay={0.05} className="mt-8">
          <SectionLabel>Repository</SectionLabel>
          <GitHubPanel repo={project.github} />
        </Reveal>
      )}

      {/* Overview */}
      <Reveal delay={0.05} className="mt-8">
        <SectionLabel>Overview</SectionLabel>
        <div className="space-y-4 text-foreground/85">
          {project.description.split("\n\n").map((para, i) => (
            <p key={i}>{para}</p>
          ))}
        </div>
      </Reveal>

      {/* Key features */}
      {project.keyFeatures?.length ? (
        <Reveal delay={0.05} className="mt-8">
          <SectionLabel>Key features</SectionLabel>
          <ul className="grid gap-3 sm:grid-cols-2">
            {project.keyFeatures.map((f) => (
              <li
                key={f}
                className="flex items-start gap-3 rounded-xl border border-border bg-surface p-4"
              >
                <span
                  className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full ${a.bg} text-[11px] font-bold text-white`}
                >
                  ✓
                </span>
                <span className="text-sm text-foreground/85">{f}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      ) : null}

      {/* Screenshots */}
      <Reveal delay={0.05} className="mt-8">
        <SectionLabel>Screenshots & demo</SectionLabel>
        <ImageGallery images={project.images} />
      </Reveal>

      {/* Importance / Technicality / Clarity */}
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {lenses.map((lens, i) => (
          <Reveal key={lens.key} delay={i * 0.08}>
            <div className="h-full rounded-2xl border border-border bg-surface p-6">
              <div className={`text-xs font-semibold uppercase tracking-wider ${a.text}`}>
                {lens.label}
              </div>
              <div className="mb-3 text-xs text-muted">{lens.hint}</div>
              <p className="text-sm leading-relaxed text-foreground/85">
                {project[lens.key]}
              </p>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Mobile prev/next (sidebar version is desktop-only) */}
      <div className="mt-8 grid grid-cols-2 gap-3 md:hidden">
        <MobileNav dir="prev" project={prev} />
        <MobileNav dir="next" project={next} />
      </div>
    </article>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
      {children}
    </h2>
  );
}

function MobileNav({
  dir,
  project,
}: {
  dir: "prev" | "next";
  project: { slug: string; title: string } | null;
}) {
  const label = dir === "prev" ? "← Previous" : "Next →";
  if (!project)
    return (
      <div className="rounded-xl border border-dashed border-border p-3 text-xs text-muted/50">
        {label}
      </div>
    );
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`rounded-xl border border-border bg-surface p-3 ${
        dir === "next" ? "text-right" : ""
      }`}
    >
      <div className="mb-1 text-xs text-muted">{label}</div>
      <div className="truncate text-sm font-medium">{project.title}</div>
    </Link>
  );
}
