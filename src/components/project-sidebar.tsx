"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { projects, getAdjacent } from "@/lib/projects";
import { fileMeta, fileName, vscStatus } from "@/lib/vscode";

// Most-common tech across all projects → filter chips.
const topTech = (() => {
  const counts = new Map<string, number>();
  for (const p of projects)
    for (const t of p.tech) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([t]) => t);
})();

/** VS Code explorer: search, tech filters, a project file tree, prev/next. */
export function ProjectSidebar() {
  const pathname = usePathname();
  const activeSlug = pathname.split("/")[2] ?? "";
  const { prev, next } = getAdjacent(activeSlug);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(true);

  const q = query.trim().toLowerCase();
  const filtered = useMemo(
    () =>
      projects.filter(
        (p) =>
          !q ||
          p.title.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.summary.toLowerCase().includes(q) ||
          p.tech.some((t) => t.toLowerCase().includes(q))
      ),
    [q]
  );

  const toggleTech = (t: string) =>
    setQuery((cur) => (cur.toLowerCase() === t.toLowerCase() ? "" : t));

  return (
    <div className="flex h-full min-w-0 flex-col text-vsc-text">
      {/* Explorer title */}
      <div className="flex h-9 shrink-0 items-center justify-between px-4">
        <span className="text-[11px] uppercase tracking-wider text-vsc-sub">
          Explorer
        </span>
        <span className="text-[11px] text-vsc-dim">
          {q ? `${filtered.length} of ${projects.length}` : ""}
        </span>
      </div>

      {/* Search */}
      <div className="px-3 pb-2">
        <div className="relative">
          <i
            className="fa-solid fa-magnifying-glass pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[11px] text-vsc-sub"
            aria-hidden="true"
          />
          <input
            id="project-search"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Escape" && setQuery("")}
            placeholder="Search projects or tech"
            aria-label="Search projects"
            className="w-full rounded-[3px] border border-vsc-border bg-[#313131] py-1.5 pl-7 pr-7 text-[13px] text-vsc-text outline-none placeholder:text-vsc-sub focus:border-yellow"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-1.5 top-1/2 grid h-5 w-5 -translate-y-1/2 place-items-center rounded text-vsc-sub hover:bg-white/10 hover:text-vsc-text"
            >
              <i className="fa-solid fa-xmark text-[11px]" aria-hidden="true" />
            </button>
          )}
        </div>

        {/* Tech filters */}
        <div className="mt-2 flex flex-wrap gap-1">
          {topTech.map((t) => {
            const active = q === t.toLowerCase();
            return (
              <button
                key={t}
                type="button"
                onClick={() => toggleTech(t)}
                aria-pressed={active}
                className={`mono rounded-[3px] px-1.5 py-0.5 text-[11px] transition-colors ${
                  active
                    ? "bg-yellow text-ink"
                    : "bg-white/[0.06] text-vsc-sub hover:bg-white/10 hover:text-vsc-text"
                }`}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* Folder header */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex h-6 shrink-0 items-center gap-1 border-t border-vsc-border px-2 text-[11px] font-bold uppercase tracking-wide text-vsc-text hover:bg-white/[0.04]"
      >
        <i
          className={`fa-solid fa-chevron-right w-3 text-[9px] transition-transform ${open ? "rotate-90" : ""}`}
          aria-hidden="true"
        />
        Projects
        <span className="ml-auto rounded-full bg-white/10 px-1.5 text-[10px] font-normal text-vsc-sub">
          {filtered.length}
        </span>
      </button>

      {/* File list: horizontal on mobile, a tree on desktop */}
      {open && (
        <nav
          aria-label="Projects"
          className="vsc-scroll flex min-h-0 min-w-0 gap-1 overflow-x-auto px-2 py-1 md:flex-1 md:flex-col md:gap-0 md:overflow-x-visible md:overflow-y-auto md:px-0"
        >
          {filtered.length === 0 && (
            <div className="px-4 py-4 text-[13px] text-vsc-sub">
              No projects match &ldquo;{query}&rdquo;.{" "}
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-yellow hover:underline"
              >
                Clear search
              </button>
            </div>
          )}
          {filtered.map((p) => {
            const active = p.slug === activeSlug;
            const meta = fileMeta(p.language);
            const s = vscStatus[p.status ?? "completed"];
            return (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                title={`${p.title}: ${p.tagline}`}
                aria-current={active ? "page" : undefined}
                className={`group flex min-w-[200px] shrink-0 items-center gap-2 rounded-[3px] border px-2 py-1 text-[13px] md:min-w-0 md:rounded-none md:pl-6 md:pr-3 ${
                  active
                    ? "border-yellow bg-vsc-select text-white md:border-y-transparent md:border-l-yellow md:border-r-transparent md:border-l-2"
                    : "border-transparent hover:bg-vsc-active"
                }`}
              >
                <i
                  className="fa-regular fa-file-code w-3.5 shrink-0 text-center text-xs"
                  style={{ color: meta.color }}
                  aria-hidden="true"
                />
                <span className="min-w-0 flex-1 truncate">
                  <span className="mono text-[12.5px]">
                    {fileName(p.slug, p.language)}
                  </span>
                  <span className="ml-2 text-[12px] text-vsc-dim">{p.title}</span>
                </span>
                {p.isPrivate && (
                  <i
                    className="fa-solid fa-lock shrink-0 text-[10px] text-vsc-sub"
                    title="Private"
                    aria-hidden="true"
                  />
                )}
                {p.featured && !p.isPrivate && (
                  <i
                    className="fa-solid fa-star shrink-0 text-[10px] text-[#e2c08d]"
                    title="Featured"
                    aria-hidden="true"
                  />
                )}
                <span
                  className={`h-1.5 w-1.5 shrink-0 rounded-full ${s.dot}`}
                  title={s.label}
                />
              </Link>
            );
          })}
        </nav>
      )}

      {/* Prev / next (desktop) */}
      <div className="mt-auto hidden shrink-0 border-t border-vsc-border md:block">
        <div className="flex h-6 items-center gap-1 px-2 text-[11px] font-bold uppercase tracking-wide">
          <i className="fa-solid fa-chevron-right w-3 rotate-90 text-[9px]" aria-hidden="true" />
          Navigate
        </div>
        <div className="grid grid-cols-2 gap-1.5 px-3 pb-3 pt-1">
          <PrevNext dir="prev" project={prev} />
          <PrevNext dir="next" project={next} />
        </div>
      </div>
    </div>
  );
}

function PrevNext({
  dir,
  project,
}: {
  dir: "prev" | "next";
  project: { slug: string; title: string } | null;
}) {
  const label = dir === "prev" ? "‹ Previous" : "Next ›";
  if (!project) {
    return (
      <div
        className={`rounded-[3px] border border-dashed border-vsc-border px-2.5 py-2 text-[11px] text-vsc-dim/60 ${
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
      className={`rounded-[3px] bg-white/[0.04] px-2.5 py-2 transition-colors hover:bg-white/[0.08] ${
        dir === "next" ? "text-right" : ""
      }`}
    >
      <div className="text-[11px] text-vsc-sub">{label}</div>
      <div className="truncate text-[12.5px] text-vsc-text">{project.title}</div>
    </Link>
  );
}
