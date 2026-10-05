"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getProject } from "@/lib/projects";
import { fileName, focusProjectSearch } from "@/lib/vscode";

/** macOS-style window title bar with a VS Code command centre. */
export function TitleBar() {
  const pathname = usePathname();
  const project = getProject(pathname.split("/")[2] ?? "");
  const title = project
    ? fileName(project.slug, project.language)
    : "Welcome";

  return (
    <div className="relative hidden h-9 shrink-0 items-center border-b border-vsc-border bg-vsc-titlebar px-3 md:flex">
      <div className="flex items-center gap-2" aria-hidden="true">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
      </div>

      {/* Command centre: opens the explorer search */}
      <button
        type="button"
        onClick={focusProjectSearch}
        className="mono absolute left-1/2 top-1/2 flex w-[min(420px,45%)] -translate-x-1/2 -translate-y-1/2 items-center justify-center gap-2 rounded-md border border-vsc-border bg-white/[0.04] px-3 py-1 text-xs text-vsc-sub transition-colors hover:bg-white/[0.08] hover:text-vsc-text"
      >
        <i className="fa-solid fa-magnifying-glass text-[10px]" aria-hidden="true" />
        <span className="truncate">portfolio · {title}</span>
      </button>

      <div className="ml-auto flex items-center gap-3 text-[11px] text-vsc-sub" aria-hidden="true">
        <i className="fa-regular fa-square" />
        <i className="fa-solid fa-table-columns" />
      </div>
    </div>
  );
}

const activity = [
  { icon: "fa-regular fa-copy", label: "Explorer", active: true },
  { icon: "fa-solid fa-magnifying-glass", label: "Search projects", search: true },
  { icon: "fa-solid fa-code-branch", label: "Source control" },
  { icon: "fa-solid fa-bug", label: "Run and debug" },
  { icon: "fa-solid fa-cubes", label: "Extensions" },
];

/** Left-most icon strip. Explorer is active; search focuses the filter. */
export function ActivityBar() {
  return (
    <div className="hidden w-12 shrink-0 flex-col items-center border-r border-vsc-border bg-vsc-activity py-1 md:flex">
      {activity.map((a) =>
        a.search ? (
          <button
            key={a.label}
            type="button"
            onClick={focusProjectSearch}
            title={a.label}
            aria-label={a.label}
            className="grid h-12 w-12 place-items-center text-lg text-vsc-dim transition-colors hover:text-vsc-text"
          >
            <i className={a.icon} aria-hidden="true" />
          </button>
        ) : (
          <span
            key={a.label}
            title={a.label}
            aria-hidden="true"
            className={`grid h-12 w-12 place-items-center border-l-2 text-lg ${
              a.active
                ? "border-white text-vsc-text"
                : "border-transparent text-vsc-dim"
            }`}
          >
            <i className={a.icon} />
          </span>
        )
      )}
      <div className="mt-auto flex flex-col items-center">
        <Link
          href="/about"
          title="About"
          aria-label="About"
          className="grid h-12 w-12 place-items-center text-lg text-vsc-dim transition-colors hover:text-vsc-text"
        >
          <i className="fa-regular fa-circle-user" aria-hidden="true" />
        </Link>
        <span
          className="grid h-12 w-12 place-items-center text-lg text-vsc-dim"
          aria-hidden="true"
        >
          <i className="fa-solid fa-gear" />
        </span>
      </div>
    </div>
  );
}

/**
 * The editor area. On desktop it scrolls on its own (like a real editor),
 * so it is the ScrollTrigger scroller and resets to the top per project.
 */
export function EditorPane({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    ref.current?.scrollTo({ top: 0 });
  }, [pathname]);

  return (
    <div
      ref={ref}
      data-scroller
      className="vsc-scroll min-h-0 min-w-0 flex-1 bg-vsc-bg md:overflow-y-auto"
    >
      {children}
    </div>
  );
}
