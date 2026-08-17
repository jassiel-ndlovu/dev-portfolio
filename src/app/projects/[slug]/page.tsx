import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProject, getAdjacent, statusMeta } from "@/lib/projects";
import { site } from "@/lib/site";
import { fileMeta, fileName } from "@/lib/vscode";
import { Illustration } from "@/components/illustration";
import { ImageGallery } from "@/components/image-gallery";
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
  { key: "importance", label: "importance", hint: "why it matters" },
  { key: "technicality", label: "technicality", hint: "the hard parts" },
  { key: "clarity", label: "clarity", hint: "how it's organized" },
] as const;

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const { prev, next } = getAdjacent(slug);
  const status = statusMeta[project.status ?? "completed"];
  const meta = fileMeta(project.language);
  const file = fileName(project.slug, project.language);

  return (
    <div className="flex min-w-0 flex-col text-vsc-text">
      {/* Tab bar */}
      <div className="flex items-stretch border-b border-vsc-border bg-vsc-panel">
        <div className="mono flex items-center gap-2 border-r border-vsc-border border-t-2 border-t-accent bg-vsc-bg px-3 py-2 text-xs">
          <i
            className="fa-regular fa-file-code text-[11px]"
            style={{ color: meta.color }}
            aria-hidden="true"
          />
          <span className="max-w-[60vw] truncate">{file}</span>
          <i className="fa-solid fa-xmark ml-1 text-[10px] text-vsc-sub" aria-hidden="true" />
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="mono flex items-center gap-1.5 border-b border-vsc-border/60 px-4 py-1.5 text-[11px] text-vsc-sub">
        <Link href="/projects" className="hover:text-vsc-text">
          projects
        </Link>
        <i className="fa-solid fa-chevron-right text-[8px]" aria-hidden="true" />
        <span className="text-vsc-text">{file}</span>
      </div>

      {/* Editor content */}
      <article className="vsc-scroll min-w-0 px-5 py-7 sm:px-8 sm:py-9">
        {/* Header */}
        <Reveal>
          <div className="grid items-start gap-6 sm:grid-cols-[1fr_auto]">
            <div className="min-w-0">
              <div className="mono mb-3 flex flex-wrap items-center gap-2 text-[11px]">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 ${status.className}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                  {status.label}
                </span>
                {project.timeline && (
                  <span className="rounded-full border border-vsc-border px-2.5 py-1 text-vsc-sub">
                    {project.timeline}
                  </span>
                )}
                <span className="rounded-full border border-vsc-border px-2.5 py-1 text-vsc-sub">
                  {project.role}
                </span>
                {project.featured && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-accent">
                    <i className="fa-solid fa-star text-[9px]" aria-hidden="true" /> Featured
                  </span>
                )}
              </div>

              <h1 className="display text-3xl text-white sm:text-4xl md:text-5xl">
                {project.title}
              </h1>
              <p className="mt-3 max-w-xl text-vsc-sub">{project.tagline}</p>

              {/* Tech stack */}
              <div className="mono mt-5 flex flex-wrap gap-1.5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded border border-vsc-border bg-vsc-panel px-2 py-1 text-[11px] text-vsc-type"
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="mono mt-6 flex flex-wrap gap-2 text-xs">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2 font-medium text-dark transition-transform hover:-translate-y-0.5"
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
                    Live site
                  </a>
                )}
                {!project.isPrivate && project.github && (
                  <a
                    href={`https://github.com/${project.github}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-vsc-border px-4 py-2 font-medium text-vsc-text transition-colors hover:bg-vsc-active"
                  >
                    <i className="fa-brands fa-github" aria-hidden="true" /> View repo
                  </a>
                )}
                {project.isPrivate && (
                  <span className="inline-flex items-center gap-2 rounded-md border border-vsc-border px-4 py-2 text-vsc-sub">
                    <i className="fa-solid fa-lock" aria-hidden="true" /> Private repository
                  </span>
                )}
                {project.links?.map((l) => (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-md border border-vsc-border px-4 py-2 font-medium text-vsc-text transition-colors hover:bg-vsc-active"
                  >
                    {l.icon && <i className={l.icon} aria-hidden="true" />}
                    {l.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Illustration on a light panel so it reads on the dark editor */}
            <div className="hidden aspect-square w-40 shrink-0 rounded-2xl bg-[var(--tint-peach)] p-3 sm:block">
              <Illustration name={project.illustration} alt={project.title} />
            </div>
          </div>
        </Reveal>

        {/* Outcome + highlights */}
        {(project.outcome || project.highlights?.length) && (
          <Reveal delay={0.05}>
            <div className="mt-8 rounded-lg border border-vsc-border bg-vsc-panel p-5">
              {project.outcome && (
                <p className="text-[15px] font-medium text-white">{project.outcome}</p>
              )}
              {project.highlights?.length ? (
                <div className="mono mt-4 flex flex-wrap gap-2">
                  {project.highlights.map((h) => (
                    <span
                      key={h}
                      className="rounded border border-vsc-border bg-vsc-bg px-2.5 py-1.5 text-xs text-vsc-text"
                    >
                      {h}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
          </Reveal>
        )}

        {/* Overview */}
        <Reveal delay={0.05}>
          <SectionLabel>overview</SectionLabel>
          <div className="max-w-2xl space-y-4 text-[15px] leading-relaxed text-vsc-text">
            {project.description.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </Reveal>

        {/* Key features */}
        {project.keyFeatures?.length ? (
          <Reveal delay={0.05}>
            <SectionLabel>key features</SectionLabel>
            <ul className="grid max-w-2xl gap-2.5 sm:grid-cols-2">
              {project.keyFeatures.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 rounded-md border border-vsc-border bg-vsc-panel p-3 text-sm text-vsc-text"
                >
                  <i
                    className="fa-solid fa-check mt-0.5 shrink-0 text-xs text-vsc-type"
                    aria-hidden="true"
                  />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        ) : null}

        {/* Screenshots (only when present) */}
        {project.images.length > 0 && (
          <Reveal delay={0.05}>
            <SectionLabel>screenshots</SectionLabel>
            <ImageGallery images={project.images} />
          </Reveal>
        )}

        {/* Importance / Technicality / Clarity — styled like code comments */}
        <div className="mt-9 grid gap-4 md:grid-cols-3">
          {lenses.map((lens, i) => (
            <Reveal key={lens.key} delay={i * 0.08}>
              <div className="h-full rounded-lg border border-vsc-border bg-vsc-panel p-5">
                <div className="mono text-xs text-vsc-comment">
                  {"// "}
                  {lens.label}
                </div>
                <div className="mono mb-3 text-[11px] text-vsc-sub">{lens.hint}</div>
                <p className="text-sm leading-relaxed text-vsc-text">
                  {project[lens.key]}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Prev / Next */}
        <div className="mt-9 grid grid-cols-2 gap-3">
          <PrevNext dir="prev" project={prev} />
          <PrevNext dir="next" project={next} />
        </div>
      </article>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mono mb-3 mt-9 text-[11px] uppercase tracking-wider text-accent">
      {children}
    </h2>
  );
}

function PrevNext({
  dir,
  project,
}: {
  dir: "prev" | "next";
  project: { slug: string; title: string; language: string } | null;
}) {
  const label = dir === "prev" ? "‹ prev" : "next ›";
  if (!project) {
    return (
      <div className="mono rounded-md border border-dashed border-vsc-border p-3 text-[11px] text-vsc-sub/50">
        {label}
      </div>
    );
  }
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`mono rounded-md border border-vsc-border bg-vsc-panel p-3 transition-colors hover:bg-vsc-active ${
        dir === "next" ? "text-right" : ""
      }`}
    >
      <div className="mb-1 text-[11px] text-vsc-sub">{label}</div>
      <div className="truncate text-sm text-vsc-text">
        {fileName(project.slug, project.language)}
      </div>
    </Link>
  );
}
