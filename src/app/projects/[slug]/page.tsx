import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { projects, getProject, getAdjacent } from "@/lib/projects";
import { site } from "@/lib/site";
import { fileMeta, fileName, vscStatus } from "@/lib/vscode";
import { Illustration } from "@/components/illustration";
import { ImageGallery } from "@/components/image-gallery";
import { Reveal } from "@/components/reveal";
import {
  EditorHeader,
  CodeLines,
  MdHeading,
  K,
  V,
  S,
  C,
  P,
} from "@/components/editor-parts";

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
  return { title: `${project.title} | ${site.name}`, description: project.summary };
}

const lenses = [
  { key: "importance", label: "importance", hint: "Why it matters" },
  { key: "technicality", label: "technicality", hint: "The hard parts" },
  { key: "clarity", label: "clarity", hint: "How it's organised" },
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
  const status = vscStatus[project.status ?? "completed"];
  const meta = fileMeta(project.language);
  const file = fileName(project.slug, project.language);

  // Project facts rendered as a small, syntax-coloured source file.
  const code: React.ReactNode[] = [
    <C key="c">{`// ${project.title}`}</C>,
    <>
      <K>export const</K> <V>project</V> <P>=</P> {"{"}
    </>,
    <>
      {"  "}
      <V>status</V>: <S>{project.status ?? "completed"}</S>,
    </>,
    project.timeline ? (
      <>
        {"  "}
        <V>timeline</V>: <S>{project.timeline}</S>,
      </>
    ) : (
      <>
        {"  "}
        <V>year</V>: <S>{project.year}</S>,
      </>
    ),
    <>
      {"  "}
      <V>role</V>: <S>{project.role}</S>,
    </>,
    <>
      {"  "}
      <V>language</V>: <S>{project.language}</S>,
    </>,
    <>
      {"  "}
      <V>stack</V>: [
    </>,
    ...project.tech.map((t) => (
      <>
        {"    "}
        <S>{t}</S>,
      </>
    )),
    <>{"  "}],</>,
    <>{"};"}</>,
  ];

  return (
    <div className="flex min-w-0 flex-col text-vsc-text">
      <EditorHeader
        tab={file}
        icon="fa-regular fa-file-code"
        iconColor={meta.color}
        crumbs={[
          { label: "portfolio" },
          { label: "projects", href: "/projects" },
          { label: file },
        ]}
      />

      <article className="mx-auto w-full max-w-4xl min-w-0 px-5 py-10 sm:px-10 sm:py-14">
        {/* Header */}
        <Reveal>
          <div className="grid items-start gap-8 sm:grid-cols-[1fr_auto]">
            <div className="min-w-0">
              <div className="mb-4 flex flex-wrap items-center gap-2 text-xs">
                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 ${status.chip}`}
                >
                  <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
                  {status.label}
                </span>
                {project.featured && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-[#e2c08d]/10 px-2.5 py-1 text-[#e2c08d]">
                    <i className="fa-solid fa-star text-[9px]" aria-hidden="true" /> Featured
                  </span>
                )}
              </div>

              <h1 className="display text-4xl text-white sm:text-5xl">
                {project.title}
              </h1>
              <p className="mt-3 max-w-xl text-lg text-vsc-sub">{project.tagline}</p>

              {/* Links */}
              <div className="mt-7 flex flex-wrap gap-2 text-[13px]">
                {project.demoUrl && (
                  <a
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-[3px] bg-yellow px-3.5 py-1.5 font-semibold text-ink transition-colors hover:bg-yellow-deep"
                  >
                    <i className="fa-solid fa-arrow-up-right-from-square text-[11px]" aria-hidden="true" />
                    Live site
                  </a>
                )}
                {!project.isPrivate && project.github && (
                  <a
                    href={`https://github.com/${project.github}`}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-2 rounded-[3px] px-3.5 py-1.5 font-medium transition-colors ${
                      project.demoUrl
                        ? "bg-[#313131] text-vsc-text hover:bg-[#3c3c3c]"
                        : "bg-yellow font-semibold text-ink hover:bg-yellow-deep"
                    }`}
                  >
                    <i className="fa-brands fa-github" aria-hidden="true" /> View repo
                  </a>
                )}
                {project.isPrivate && (
                  <span className="inline-flex items-center gap-2 rounded-[3px] bg-[#313131] px-3.5 py-1.5 text-vsc-sub">
                    <i className="fa-solid fa-lock text-[11px]" aria-hidden="true" /> Private repository
                  </span>
                )}
                {project.links?.map((l) => (
                  <a
                    key={l.url}
                    href={l.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-[3px] bg-[#313131] px-3.5 py-1.5 font-medium text-vsc-text transition-colors hover:bg-[#3c3c3c]"
                  >
                    {l.icon && <i className={l.icon} aria-hidden="true" />}
                    {l.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Illustration on a light panel so it reads on the dark editor */}
            <div className="hidden aspect-square w-44 shrink-0 rounded-2xl bg-yellow p-3 sm:block">
              <Illustration name={project.illustration} alt="" className="h-full w-full" />
            </div>
          </div>
        </Reveal>

        {/* Project facts as code */}
        <Reveal delay={0.05}>
          <div className="mt-10">
            <CodeLines lines={code} />
          </div>
        </Reveal>

        {/* Outcome + highlights */}
        {(project.outcome || project.highlights?.length) && (
          <Reveal delay={0.05}>
            <div className="mt-8 rounded-r-md border-l-2 border-yellow bg-yellow/[0.07] px-5 py-4">
              {project.outcome && (
                <p className="text-[15px] leading-relaxed text-white">{project.outcome}</p>
              )}
              {project.highlights?.length ? (
                <ul className="mt-3 flex flex-wrap gap-2">
                  {project.highlights.map((h) => (
                    <li
                      key={h}
                      className="rounded-[3px] bg-white/[0.06] px-2.5 py-1 text-xs text-vsc-text"
                    >
                      {h}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </Reveal>
        )}

        {/* Overview */}
        <Reveal delay={0.05}>
          <MdHeading>Overview</MdHeading>
          <div className="max-w-2xl space-y-4 text-[15px] leading-relaxed text-vsc-text">
            {project.description.split("\n\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </Reveal>

        {/* Key features */}
        {project.keyFeatures?.length ? (
          <Reveal delay={0.05}>
            <MdHeading>Key features</MdHeading>
            <ul className="grid gap-2 sm:grid-cols-2">
              {project.keyFeatures.map((f) => (
                <li
                  key={f}
                  className="flex items-start gap-2.5 rounded-md bg-white/[0.03] p-3 text-sm text-vsc-text"
                >
                  <i
                    className="fa-solid fa-check mt-1 shrink-0 text-[11px] text-[#34d399]"
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
            <MdHeading>Screenshots</MdHeading>
            <ImageGallery images={project.images} />
          </Reveal>
        )}

        {/* Importance / Technicality / Clarity, styled like doc comments */}
        <Reveal delay={0.05}>
          <MdHeading>Notes</MdHeading>
        </Reveal>
        <div className="grid gap-3 md:grid-cols-3">
          {lenses.map((lens, i) => (
            <Reveal key={lens.key} delay={i * 0.08}>
              <div className="mono h-full rounded-md border border-vsc-border bg-[#181818] p-5 text-[12.5px] leading-relaxed">
                <div className="text-vsc-comment">{"/**"}</div>
                <div className="text-vsc-comment">
                  {" * "}
                  <span className="text-vsc-keyword">@{lens.label}</span>{" "}
                  {lens.hint}
                </div>
                <p className="font-sans text-[14px] leading-relaxed text-vsc-text before:mr-1 before:text-vsc-comment before:content-['*']">
                  {project[lens.key]}
                </p>
                <div className="text-vsc-comment">{" */"}</div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Prev / Next */}
        <div className="mt-12 grid grid-cols-2 gap-3 border-t border-vsc-border pt-6">
          <PrevNext dir="prev" project={prev} />
          <PrevNext dir="next" project={next} />
        </div>
      </article>
    </div>
  );
}

function PrevNext({
  dir,
  project,
}: {
  dir: "prev" | "next";
  project: { slug: string; title: string; language: string } | null;
}) {
  const label = dir === "prev" ? "‹ Previous" : "Next ›";
  if (!project) {
    return (
      <div
        className={`rounded-md border border-dashed border-vsc-border p-3 text-xs text-vsc-dim/60 ${
          dir === "next" ? "text-right" : ""
        }`}
      >
        {label}
      </div>
    );
  }
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`rounded-md bg-white/[0.03] p-3 transition-colors hover:bg-white/[0.07] ${
        dir === "next" ? "text-right" : ""
      }`}
    >
      <div className="mb-1 text-xs text-vsc-sub">{label}</div>
      <div className="truncate text-sm text-white">{project.title}</div>
      <div className="mono truncate text-[11px] text-vsc-dim">
        {fileName(project.slug, project.language)}
      </div>
    </Link>
  );
}
