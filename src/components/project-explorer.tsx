"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { projects } from "@/lib/projects";
import { fileMeta, fileName } from "@/lib/vscode";

export function ProjectExplorer() {
  const pathname = usePathname();
  const activeSlug = pathname.split("/")[2] ?? "";
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
          p.tech.some((t) => t.toLowerCase().includes(q))
      ),
    [q]
  );

  return (
    <div className="flex h-full min-w-0 flex-col bg-vsc-panel text-vsc-text">
      {/* Explorer title */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <span className="mono text-[11px] uppercase tracking-wider text-vsc-sub">
          Explorer
        </span>
        <i className="fa-solid fa-ellipsis text-xs text-vsc-sub" aria-hidden="true" />
      </div>

      {/* Search */}
      <div className="px-3 pb-2">
        <div className="relative">
          <i
            className="fa-solid fa-magnifying-glass pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-[11px] text-vsc-sub"
            aria-hidden="true"
          />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Escape" && setQuery("")}
            placeholder="Search"
            aria-label="Search projects"
            className="mono w-full rounded border border-vsc-border bg-vsc-bg py-1.5 pl-7 pr-6 text-xs text-vsc-text outline-none placeholder:text-vsc-sub focus:border-accent"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              aria-label="Clear search"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 text-vsc-sub hover:text-vsc-text"
            >
              <i className="fa-solid fa-xmark text-xs" aria-hidden="true" />
            </button>
          )}
        </div>
      </div>

      {/* Folder row */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="mono flex items-center gap-1 px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-vsc-text hover:bg-vsc-active"
      >
        <i
          className={`fa-solid fa-chevron-right text-[9px] transition-transform ${open ? "rotate-90" : ""}`}
          aria-hidden="true"
        />
        projects
        <span className="ml-1 text-vsc-sub">{filtered.length}</span>
      </button>

      {/* File list */}
      {open && (
        <nav className="vsc-scroll -mx-0 flex gap-1 overflow-x-auto px-2 pb-2 md:flex-1 md:flex-col md:overflow-x-visible md:overflow-y-auto">
          {filtered.length === 0 && (
            <p className="mono px-3 py-3 text-xs text-vsc-sub">No matches.</p>
          )}
          {filtered.map((p) => {
            const active = p.slug === activeSlug;
            const meta = fileMeta(p.language);
            return (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                title={p.title}
                className={`mono group flex min-w-[220px] items-center gap-2 rounded px-2 py-1.5 text-[13px] md:min-w-0 md:pl-6 ${
                  active
                    ? "bg-vsc-active text-white"
                    : "text-vsc-text hover:bg-vsc-active/60"
                }`}
              >
                <i
                  className="fa-regular fa-file-code shrink-0 text-xs"
                  style={{ color: meta.color }}
                  aria-hidden="true"
                />
                <span className="truncate">{fileName(p.slug, p.language)}</span>
                {p.isPrivate && (
                  <i
                    className="fa-solid fa-lock ml-auto shrink-0 text-[10px] text-vsc-sub"
                    title="Private"
                    aria-hidden="true"
                  />
                )}
                {p.featured && !p.isPrivate && (
                  <i
                    className="fa-solid fa-star ml-auto shrink-0 text-[10px] text-accent"
                    title="Featured"
                    aria-hidden="true"
                  />
                )}
              </Link>
            );
          })}
        </nav>
      )}
    </div>
  );
}
