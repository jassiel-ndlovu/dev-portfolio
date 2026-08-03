"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  projects,
  getAdjacent,
  accentClasses,
  statusMeta,
} from "@/lib/projects";

export function ProjectSidebar() {
  const pathname = usePathname();
  const activeSlug = pathname.split("/")[2] ?? "";
  const { prev, next } = getAdjacent(activeSlug);
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const filtered = projects.filter(
    (p) =>
      !q ||
      p.title.toLowerCase().includes(q) ||
      p.tagline.toLowerCase().includes(q) ||
      p.tech.some((t) => t.toLowerCase().includes(q))
  );

  return (
    <div className="flex h-full flex-col">
      {/* Heading + search */}
      <div className="mb-2 flex items-center justify-between px-1">
        <span className="text-xs font-semibold uppercase tracking-wider text-muted">
          Projects · {projects.length}
        </span>
      </div>
      <div className="relative mb-3">
        <i className="fa-solid fa-magnifying-glass pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-xs text-muted" aria-hidden="true" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search projects or tech…"
          className="w-full rounded-lg border border-border bg-surface py-2 pl-8 pr-3 text-sm outline-none transition-colors placeholder:text-muted/70 focus:border-accent"
        />
      </div>

      <nav className="thin-scroll -mx-1 flex gap-2 overflow-x-auto px-1 pb-2 md:flex-1 md:flex-col md:overflow-x-visible md:overflow-y-auto">
        {filtered.length === 0 && (
          <p className="px-1 py-4 text-sm text-muted">No matches.</p>
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
                  ? "border-foreground bg-surface shadow-sm"
                  : "border-border bg-surface/50 hover:border-foreground/30 hover:bg-surface"
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
                  {p.featured && (
                    <span className="text-accent" title="Featured">
                      ★
                    </span>
                  )}
                </span>
                <span className="mt-0.5 flex items-center gap-1.5 text-xs text-muted">
                  <span className={`h-1.5 w-1.5 shrink-0 rounded-full ${s.dot}`} />
                  <span className="truncate">{p.tagline}</span>
                </span>
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Prev / Next panel (bottom-left) */}
      <div className="mt-3 hidden grid-cols-2 gap-2 border-t border-border pt-3 md:grid">
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
      <div className="rounded-xl border border-dashed border-border p-3 text-xs text-muted/50">
        <div className="mb-1">{label}</div>
        <div>—</div>
      </div>
    );
  }
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`rounded-xl border border-border bg-surface p-3 transition-colors hover:border-foreground/40 ${
        dir === "next" ? "text-right" : ""
      }`}
    >
      <div className="mb-1 text-xs text-muted">{label}</div>
      <div className="truncate text-sm font-medium">{project.title}</div>
    </Link>
  );
}
