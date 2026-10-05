"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";
import { ProfilePhoto } from "./profile-photo";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/certifications", label: "Certifications" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const cvActive = isActive(pathname, "/cv");

  return (
    <header className="sticky top-0 z-50 bg-ink text-white">
      <nav className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-4 px-5">
        {/* Wordmark */}
        <Link href="/" className="group flex min-w-0 items-center gap-2.5">
          <ProfilePhoto className="h-8 w-8 shrink-0 rounded-full bg-yellow object-cover ring-2 ring-yellow" />
          <span className="display truncate text-lg">{site.name}</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          <ul className="flex items-center gap-1">
            {links.map((l) => {
              const active = isActive(pathname, l.href);
              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    aria-current={active ? "page" : undefined}
                    className={`relative rounded-full px-3 py-1.5 text-sm transition-colors ${
                      active ? "text-white" : "text-white/60 hover:text-white"
                    }`}
                  >
                    {l.label}
                    {active && (
                      <span className="absolute inset-x-3 -bottom-0.5 h-[3px] rounded-full bg-yellow" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
          <Link
            href="/cv"
            aria-current={cvActive ? "page" : undefined}
            className={`ml-2 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
              cvActive
                ? "bg-white text-ink"
                : "bg-yellow text-ink hover:bg-yellow-deep"
            }`}
          >
            CV
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-10 w-10 place-items-center rounded-full bg-white/10 md:hidden"
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 h-0.5 w-4 rounded bg-current transition-all duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 h-0.5 w-4 rounded bg-current transition-all duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 md:hidden ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <ul className="min-h-0 px-5">
          {[...links, { href: "/cv", label: "CV" }].map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  tabIndex={open ? undefined : -1}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between border-b border-white/10 py-3.5 text-lg ${
                    active ? "text-yellow" : "text-white"
                  }`}
                >
                  <span className="display">{l.label}</span>
                  <span aria-hidden="true" className="text-sm opacity-40">
                    →
                  </span>
                </Link>
              </li>
            );
          })}
          <li className="h-4" />
        </ul>
      </div>
    </header>
  );
}
