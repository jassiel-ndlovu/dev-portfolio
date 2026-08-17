"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  projects,
  getAdjacent,
  accentClasses,
  statusMeta,
} from "@/lib/projects";

// Most-common tech across all projects → suggestion chips.
const topTech = (() => {
  const counts = new Map<string, number>();
  for (const p of projects)
    for (const t of p.tech) counts.set(t, (counts.get(t) ?? 0) + 1);
  return [...counts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([t]) => t);
})();

export function ProjectSidebar() {
  const pathname = usePathname();
  const activeSlug = pathname.split("/")[2] ?? "";
  const { prev, next } = getAdjacent(activeSlug);
  const [query, setQuery] = useState("");

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
      {/* Heading */}
      <div className="mb-2 flex items-center justify-between px-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-vsc-sub">
          Projects
        </span>
        <span className="text-xs text-vsc-sub">
          {q ? `${filtered.length} of ${projects.length}` : projects.length}
        </span>
      </div>

      {/* Search */}
      <div className="relative mb-2.5">
        <i
          className="fa-solid fa-magnifying-glass pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-vsc-sub"
          aria-hidden="true"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Escape" && setQuery("")}
          placeholder="Search projects or tech…"
          aria-label="Search projects"
          className="w-full rounded-lg border border-vsc-border bg-vsc-panel py-2 pl-8 pr-8 text-sm text-vsc-text outline-none transition-colors placeholder:text-vsc-sub focus:border-accent"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            aria-label="Clear search"
            className="absolute right-2 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-full text-vsc-sub transition-colors hover:bg-vsc-active hover:text-vsc-text"
          >
            <i className="fa-solid fa-xmark text-xs" aria-hidden="true" />
          </button>
        )}
      </div>

      {/* Suggestion chips */}
      <div className="mb-3 flex flex-wrap gap-1.5">
        {topTech.map((t) => {
          const active = q === t.toLowerCase();
          return (
            <button
              key={t}
              type="button"
              onClick={() => toggleTech(t)}
              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium transition-colors ${
                active
                  ? "border-accent bg-accent/15 text-accent"
                  : "border-vsc-border bg-vsc-panel text-vsc-sub hover:border-accent/50 hover:text-vsc-text"
              }`}
            >
              <i className="fa-solid fa-tag text-[10px]" aria-hidden="true" />
              {t}
            </button>
          );
        })}
      </div>

      {/* List — horizontal scroll on mobile, vertical on desktop */}
      <nav className="vsc-scroll -mx-1 flex min-w-0 gap-2 overflow-x-auto px-1 pb-2 md:flex-1 md:flex-col md:overflow-x-visible md:overflow-y-auto">
        {filtered.length === 0 && (
          <div className="flex min-w-[220px] flex-col items-center gap-1 px-1 py-6 text-center text-sm text-vsc-sub md:min-w-0">
            <i className="fa-regular fa-face-frown text-lg" aria-hidden="true" />
            <span>No projects match &ldquo;{query}&rdquo;.</span>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-1 text-xs font-medium text-accent hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
        {filtered.map((p) => {
          const idx = projects.findIndex((x) => x.slug === p.slug);
          const a = accentClasses[p.accent];
          const active = p.slug === activeSlug;
          const s = statusMeta[p.status ?? "completed"];
          return (
            <Link
              key={p.slug}
              href={`/projects/${p.slug}`}
              className={`group flex min-w-[220px] items-start gap-3 rounded-xl border p-3 transition-colors md:min-w-0 ${
                active
                  ? "border-accent bg-vsc-active shadow-sm"
                  : "border-vsc-border bg-vsc-panel/60 hover:border-vsc-sub/60 hover:bg-vsc-panel"
              }`}
            >
              <span
                className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg font-mono text-xs font-bold ${
                  active ? `${a.bg} text-white` : `${a.bgSoft} ${a.text}`
                }`}
              >
                {String(idx + 1).padStart(2, "0")}
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1.5">
                  <span className="block truncate font-medium leading-tight">
                    {p.title}
                  </span>
                  {p.isPrivate && (
                    <i
                      className="fa-solid fa-lock shrink-0 text-[10px] text-vsc-sub"
                      title="Private"
                      aria-hidden="true"
                    />
                  )}
                  {p.featured && !p.isPrivate && (
                    <span className="text-accent" title="Featured">
                      ★
                    </span>
                  )}
                </span>
                <span className="mt-0.5 flex items-center gap-1.5 text-xs text-vsc-sub">
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${s.dot}`} />
                  <span className="truncate">{p.tagline}</span>
                </span>
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Prev / Next panel (bottom-left) */}
      <div className="mt-3 hidden grid-cols-2 gap-2 border-t border-vsc-border pt-3 md:grid">
        <PrevNext dir="prev" project={prev} />
        <PrevNext dir="next" project={next} />
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
  const label = dir === "prev" ? "← Previous" : "Next →";
  if (!project) {
    return (
      <div className="rounded-xl border border-dashed border-vsc-border p-3 text-xs text-vsc-sub/50">
        <div className="mb-1">{label}</div>
        <div>—</div>
      </div>
    );
  }
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`rounded-xl border border-vsc-border bg-vsc-panel p-3 transition-colors hover:border-vsc-sub/60 ${
        dir === "next" ? "text-right" : ""
      }`}
    >
      <div className="mb-1 text-xs text-vsc-sub">{label}</div>
      <div className="truncate text-sm font-medium text-vsc-text">
        {project.title}
      </div>
    </Link>
  );
}
