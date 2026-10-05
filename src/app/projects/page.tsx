import Link from "next/link";
import type { Metadata } from "next";
import { projects } from "@/lib/projects";
import { site } from "@/lib/site";
import { fileMeta, fileName, vscStatus } from "@/lib/vscode";
import { EditorHeader } from "@/components/editor-parts";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: `Projects | ${site.name}`,
  description: `Every project by ${site.name}, opened in a VS Code-style workbench.`,
};

// Static index for /projects (no redirect, so it works with output: export).
// Styled after the VS Code Welcome tab.
export default function ProjectsIndex() {
  const featured = projects.filter((p) => p.featured).slice(0, 4);
  const start = featured.length ? featured : projects.slice(0, 4);
  const languages = [...new Set(projects.map((p) => p.language))];

  return (
    <div className="min-w-0 text-vsc-text">
      <EditorHeader
        tab="Welcome"
        icon="fa-solid fa-code"
        iconColor="#4daafc"
        crumbs={[{ label: "portfolio" }, { label: "projects" }]}
      />

      <div className="mx-auto w-full max-w-5xl px-5 py-12 sm:px-10 sm:py-16">
        <Reveal>
          <h1 className="display text-4xl text-white sm:text-5xl md:text-6xl">
            Projects
          </h1>
          <p className="mt-3 max-w-xl text-lg text-vsc-sub">
            {projects.length} projects across compilers, research, platforms
            and apps. Open a file from the explorer, or start below.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-2">
          {/* Start */}
          <Reveal delay={0.05}>
            <h2 className="mb-3 text-[15px] font-medium text-white">Featured</h2>
            <ul className="space-y-1">
              {start.map((p) => {
                const meta = fileMeta(p.language);
                return (
                  <li key={p.slug}>
                    <Link
                      href={`/projects/${p.slug}`}
                      className="group flex items-start gap-3 rounded-md px-2 py-2 transition-colors hover:bg-white/[0.04]"
                    >
                      <i
                        className="fa-regular fa-file-code mt-1 text-sm"
                        style={{ color: meta.color }}
                        aria-hidden="true"
                      />
                      <span className="min-w-0">
                        <span className="block text-[14px] text-[#4daafc] group-hover:underline">
                          {p.title}
                        </span>
                        <span className="block text-[13px] text-vsc-sub">
                          {p.tagline}
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Reveal>

          {/* All files */}
          <Reveal delay={0.1}>
            <h2 className="mb-3 text-[15px] font-medium text-white">All projects</h2>
            <ul className="mono text-[12.5px]">
              {projects.map((p) => {
                const s = vscStatus[p.status ?? "completed"];
                return (
                  <li key={p.slug}>
                    <Link
                      href={`/projects/${p.slug}`}
                      className="flex items-center gap-3 rounded-md px-2 py-1.5 transition-colors hover:bg-white/[0.04]"
                    >
                      <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${s.dot}`} title={s.label} />
                      <span className="min-w-0 flex-1 truncate text-[#4daafc]">
                        {fileName(p.slug, p.language)}
                      </span>
                      <span className="shrink-0 text-vsc-dim">{p.year}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </div>

        {/* Legend / summary */}
        <Reveal delay={0.1}>
          <div className="mt-14 flex flex-wrap gap-x-8 gap-y-3 border-t border-vsc-border pt-6 text-[13px] text-vsc-sub">
            {(["in-progress", "completed"] as const).map((k) => (
              <span key={k} className="flex items-center gap-2">
                <span className={`h-1.5 w-1.5 rounded-full ${vscStatus[k].dot}`} />
                {vscStatus[k].label}:{" "}
                {projects.filter((p) => (p.status ?? "completed") === k).length}
              </span>
            ))}
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-code text-[11px]" aria-hidden="true" />
              {languages.join(", ")}
            </span>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
