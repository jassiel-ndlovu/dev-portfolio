/* eslint-disable @next/next/no-img-element */
import { site, socials } from "@/lib/site";

export function SiteFooter() {
  const active = socials.filter((s) => s.href);
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="font-display text-lg font-bold">{site.name}</div>
          <p className="mt-1 text-sm text-muted">
            © {new Date().getFullYear()} · {site.role}
          </p>
          {/* Built with / deployed on */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-muted">
            <span>Built with</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1">
              <img src="/next.svg" alt="Next.js" className="h-3 w-auto" />
            </span>
            <span>· deployed on</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-2.5 py-1 font-medium text-foreground">
              <i className="fa-brands fa-aws text-sm text-accent-deep" aria-hidden="true" />
              AWS Amplify
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {active.map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              title={s.label}
              className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-muted transition-colors hover:border-accent hover:text-accent-deep"
              target={s.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
            >
              <i className={`${s.icon} text-lg`} aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>

      {/* Storyset attribution (required by the free license) */}
      <div className="border-t border-border/60 px-5 py-3 text-center text-xs text-muted/80">
        <a
          href="https://storyset.com"
          target="_blank"
          rel="noreferrer"
          className="underline hover:text-foreground"
        >
          Illustrations by Storyset
        </a>
      </div>
    </footer>
  );
}
