import Link from "next/link";
import { projects } from "@/lib/projects";
import { fileName } from "@/lib/vscode";

// Static index for /projects (no redirect, so it works with output: export).
// Renders inside the dark projects workbench, in the editor pane.
export default function ProjectsIndex() {
  const featured = projects.filter((p) => p.featured).slice(0, 4);
  const list = featured.length ? featured : projects.slice(0, 4);

  return (
    <div className="min-w-0 text-vsc-text">
      {/* Tab bar */}
      <div className="flex items-stretch border-b border-vsc-border bg-vsc-panel">
        <div className="mono flex items-center gap-2 border-r border-vsc-border border-t-2 border-t-accent bg-vsc-bg px-3 py-2 text-xs">
          <i className="fa-regular fa-folder-open text-[11px] text-accent" aria-hidden="true" />
          <span>projects</span>
        </div>
      </div>

      <div className="px-5 py-10 sm:px-8 sm:py-14">
        <p className="mono mb-3 text-[11px] uppercase tracking-widest text-accent">
          Workbench
        </p>
        <h1 className="display text-3xl text-white sm:text-4xl md:text-5xl">
          Ten projects, one place.
        </h1>
        <p className="mono mt-4 max-w-xl text-sm leading-relaxed text-vsc-sub">
          Pick a file from the explorer to open a project — compilers, research,
          platforms and apps. A few to start with:
        </p>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {list.map((p) => (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="mono group flex items-center gap-3 rounded-lg border border-vsc-border bg-vsc-panel px-4 py-3 transition-colors hover:border-accent hover:bg-vsc-active"
            >
              <i className="fa-regular fa-file-code text-sm text-accent" aria-hidden="true" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-sm text-vsc-text">
                  {fileName(p.slug, p.language)}
                </span>
                <span className="block truncate text-xs text-vsc-sub">
                  {p.tagline}
                </span>
              </span>
              <span className="text-vsc-sub transition-colors group-hover:text-accent">
                →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
