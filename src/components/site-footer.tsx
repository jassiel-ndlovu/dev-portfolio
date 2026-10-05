import Link from "next/link";
import { site, socials } from "@/lib/site";
import { Figure, Shape } from "./figure";

const pages = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/experience", label: "Experience" },
  { href: "/certifications", label: "Certifications" },
  { href: "/cv", label: "CV" },
];

export function SiteFooter() {
  const active = socials.filter((s) => s.href);

  return (
    <footer className="relative overflow-hidden bg-ink text-white/70">
      <div className="mx-auto w-full max-w-5xl px-5 pt-14">
        <div className="relative flex flex-col gap-10 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="display text-3xl text-white">{site.name}</div>
            <p className="mt-1">{site.role}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 inline-flex rounded-full bg-yellow px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-yellow-deep"
            >
              Get in touch
            </a>
            <div className="mt-5 flex items-center gap-2">
              {active.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  title={s.label}
                  className="grid h-9 w-9 place-items-center rounded-full bg-white/10 transition-colors hover:bg-yellow hover:text-ink"
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                >
                  <i className={`${s.icon} text-[15px]`} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <ul className="grid grid-cols-2 gap-x-10 gap-y-2 pb-6 text-sm sm:grid-cols-1">
            {pages.map((p) => (
              <li key={p.href}>
                <Link href={p.href} className="hover:text-yellow">
                  {p.label}
                </Link>
              </li>
            ))}
          </ul>

          {/* Two figures sitting on the footer line */}
          <div className="pointer-events-none absolute bottom-0 right-[24%] hidden items-end gap-1 md:flex">
            <Shape kind="sparkle" color="#ffc845" className="mb-28 h-5 w-5" />
            <Figure name="peeps/sitting-12" fill="#ffc845" className="h-36" />
            <Figure name="peeps/sitting-9" fill="#ffb8c6" flip className="h-32" />
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t-2 border-white/15 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}. Built with Next.js and
            hosted on AWS Amplify.
          </p>
          <p>
            Illustrations by{" "}
            <a href="https://storyset.com" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-yellow">
              Storyset
            </a>
            ,{" "}
            <a href="https://www.openpeeps.com" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-yellow">
              Open Peeps
            </a>{" "}
            and{" "}
            <a href="https://www.pablostanley.com" target="_blank" rel="noreferrer" className="underline underline-offset-2 hover:text-yellow">
              Transhumans
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
