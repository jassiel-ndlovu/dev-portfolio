/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site, socials } from "@/lib/site";

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

function NavLinks({
  pathname,
  className = "",
}: {
  pathname: string;
  className?: string;
}) {
  return (
    <ul className={className}>
      {links.map((l) => (
        <li key={l.href}>
          <Link
            href={l.href}
            className={`whitespace-nowrap rounded-full px-3 py-2 text-sm font-medium transition-colors ${
              isActive(pathname, l.href)
                ? "bg-foreground text-background"
                : "text-muted hover:bg-foreground/5 hover:text-foreground"
            }`}
          >
            {l.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function SiteNav() {
  const pathname = usePathname();
  const activeSocials = socials.filter((s) => s.href);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <nav className="mx-auto w-full max-w-6xl px-5">
        <div className="grid h-16 grid-cols-[1fr_auto_1fr] items-center gap-2">
          {/* Left — socials (hidden on the smallest screens; also in footer) */}
          <ul className="col-start-1 hidden items-center gap-0.5 justify-self-start sm:flex">
            {activeSocials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  aria-label={s.label}
                  title={s.label}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:bg-foreground/5 hover:text-accent-deep"
                >
                  <i className={`${s.icon} text-lg`} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>

          {/* Centre — avatar + wordmark logo (always in the middle column) */}
          <Link
            href="/"
            className="col-start-2 group flex min-w-0 items-center gap-2 justify-self-center sm:gap-2.5"
          >
            <img
              src={site.photo}
              alt={site.name}
              className="h-8 w-8 shrink-0 rounded-full border border-border object-cover transition-transform group-hover:-rotate-6 sm:h-9 sm:w-9"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <span className="truncate font-display text-base font-bold tracking-tight sm:text-xl">
              {site.name}
            </span>
          </Link>

          {/* Right — nav links (desktop) */}
          <NavLinks
            pathname={pathname}
            className="col-start-3 hidden items-center gap-1 justify-self-end lg:flex"
          />
        </div>

        {/* Nav links (mobile / tablet) */}
        <NavLinks
          pathname={pathname}
          className="thin-scroll -mx-1 flex items-center gap-1 overflow-x-auto px-1 pb-2 lg:hidden"
        />
      </nav>
    </header>
  );
}
