"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site, socials } from "@/lib/site";

const pages = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/certifications", label: "Certifications" },
  { href: "/cv", label: "CV" },
];

export function SiteFooter() {
  const pathname = usePathname();
  const dark = pathname.startsWith("/projects");
  const active = socials.filter((s) => s.href);

  return (
    <footer
      className={
        dark
          ? "border-t border-white/10 bg-[#181818] text-white/60"
          : "border-t border-border bg-alt text-subtle"
      }
    >
      <div className="mx-auto w-full max-w-6xl px-5 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div
              className={`display text-xl ${dark ? "text-white" : "text-foreground"}`}
            >
              {site.name}
            </div>
            <p className="mt-1 text-sm">{site.role}</p>
            <div className="mt-5 flex items-center gap-2">
              {active.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  title={s.label}
                  className={`grid h-9 w-9 place-items-center rounded-full transition-colors ${
                    dark
                      ? "bg-white/5 hover:bg-white/10 hover:text-white"
                      : "bg-white hover:text-accent"
                  }`}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                >
                  <i className={`${s.icon} text-[15px]`} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <ul className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm sm:grid-cols-1">
            {pages.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className={dark ? "hover:text-white" : "hover:text-foreground"}
                >
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div
          className={`mt-10 flex flex-col gap-3 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between ${
            dark ? "border-white/10" : "border-border"
          }`}
        >
          <p>
            © {new Date().getFullYear()} {site.name}. Built with Next.js and
            hosted on AWS Amplify.
          </p>
          {/* Storyset attribution (required by the free license) */}
          <a
            href="https://storyset.com"
            target="_blank"
            rel="noreferrer"
            className={`underline underline-offset-2 ${
              dark ? "hover:text-white" : "hover:text-foreground"
            }`}
          >
            Illustrations by Storyset
          </a>
        </div>
      </div>
    </footer>
  );
}
