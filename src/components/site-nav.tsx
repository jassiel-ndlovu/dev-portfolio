/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

const links = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/certifications", label: "Certifications" },
  { href: "/cv", label: "CV" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export function SiteNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  // The projects workbench is the one dark page; the bar follows it.
  const dark = pathname.startsWith("/projects");

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-xl backdrop-saturate-150 ${
        dark
          ? "border-b border-white/10 bg-[#181818]/85 text-white"
          : "border-b border-black/[0.06] bg-white/80 text-foreground"
      }`}
    >
      <nav className="mx-auto flex h-12 w-full max-w-6xl items-center justify-between px-5">
        {/* Wordmark */}
        <Link href="/" className="group flex min-w-0 items-center gap-2.5">
          <img
            src={site.photo}
            alt=""
            className="h-7 w-7 shrink-0 rounded-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <span className="truncate text-[15px] font-semibold tracking-tight">
            {site.name}
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={active ? "page" : undefined}
                  className={`rounded-full px-3 py-1.5 text-[13px] transition-colors ${
                    active
                      ? dark
                        ? "text-white"
                        : "text-foreground"
                      : dark
                        ? "text-white/60 hover:text-white"
                        : "text-subtle hover:text-foreground"
                  }`}
                >
                  {l.label}
                  <span
                    className={`mx-auto mt-0.5 block h-px transition-all ${
                      active ? "w-full bg-accent" : "w-0"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="grid h-9 w-9 place-items-center rounded-full md:hidden"
        >
          <span className="relative block h-3 w-4">
            <span
              className={`absolute left-0 h-px w-4 bg-current transition-all duration-300 ${
                open ? "top-1.5 rotate-45" : "top-0.5"
              }`}
            />
            <span
              className={`absolute left-0 h-px w-4 bg-current transition-all duration-300 ${
                open ? "top-1.5 -rotate-45" : "top-2.5"
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
          {links.map((l) => {
            const active = isActive(pathname, l.href);
            return (
              <li key={l.href}>
                <Link
                  href={l.href}
                  tabIndex={open ? undefined : -1}
                  onClick={() => setOpen(false)}
                  className={`flex items-center justify-between border-b py-3.5 text-lg font-medium ${
                    dark ? "border-white/10" : "border-black/[0.06]"
                  } ${active ? "text-accent" : ""}`}
                >
                  {l.label}
                  <span aria-hidden="true" className="text-sm opacity-40">
                    ›
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
