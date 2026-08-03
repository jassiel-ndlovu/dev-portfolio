import type { Metadata } from "next";
import {
  site,
  socials,
  cv,
  education,
  experience,
  olympiads,
  certifications,
} from "@/lib/site";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: `CV — ${site.name}`,
  description: `Curriculum vitae of ${site.name}, ${site.role}.`,
};

export default function CVPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-12">
      <Reveal>
        <header className="border-b border-border pb-6">
          <h1 className="display text-4xl sm:text-5xl">{site.name}</h1>
          <p className="mt-2 text-lg text-accent">{site.role}</p>
          <p className="mt-3 text-muted">{cv.summary}</p>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted">
            <span>{site.location}</span>
            {socials
              .filter((s) => s.href)
              .map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="flex items-center gap-1.5 hover:text-foreground"
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                >
                  <i className={s.icon} aria-hidden="true" />
                  {s.label}
                </a>
              ))}
          </div>
          {cv.resumePdf && (
            <a
              href={cv.resumePdf}
              className="mt-5 inline-block rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background"
            >
              Download PDF ↓
            </a>
          )}
        </header>
      </Reveal>

      <Section title="Experience">
        {experience.map((e, i) => (
          <Row
            key={i}
            period={e.period}
            title={e.role}
            org={e.company}
            detail={e.detail}
            delay={i * 0.05}
          />
        ))}
      </Section>

      <Section title="Education">
        {education.map((e, i) => (
          <Row
            key={i}
            period={e.period}
            title={e.qualification}
            org={e.institution}
            detail={e.detail}
            delay={i * 0.05}
          />
        ))}
      </Section>

      <Section title="Skills">
        <div className="grid gap-5 sm:grid-cols-2">
          {Object.entries(cv.skills).map(([group, items]) => (
            <Reveal key={group}>
              <div>
                <div className="mb-2 text-sm font-semibold">{group}</div>
                <div className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-border bg-surface px-2.5 py-1 text-xs text-muted"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section title="Olympiads & Competitions">
        {olympiads.map((o, i) => (
          <Row
            key={i}
            period={o.years}
            title={o.name}
            org=""
            detail={o.result}
            delay={i * 0.04}
          />
        ))}
      </Section>

      <Section title="Certifications">
        {certifications.map((c, i) => (
          <Row
            key={i}
            period=""
            title={c.name}
            org={c.issuer}
            detail=""
            delay={i * 0.04}
          />
        ))}
      </Section>
    </div>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="mb-5 text-xs font-semibold uppercase tracking-wider text-muted">
        {title}
      </h2>
      <div className="space-y-6">{children}</div>
    </section>
  );
}

function Row({
  period,
  title,
  org,
  detail,
  delay,
}: {
  period: string;
  title: string;
  org: string;
  detail: string;
  delay: number;
}) {
  return (
    <Reveal delay={delay}>
      <div className="grid gap-1 sm:grid-cols-[140px_1fr]">
        <div className="text-sm text-muted">{period}</div>
        <div>
          <div className="font-medium">
            {title}
            {org && <span className="text-muted"> · {org}</span>}
          </div>
          {detail && (
            <p className="mt-1 text-sm text-foreground/80">{detail}</p>
          )}
        </div>
      </div>
    </Reveal>
  );
}
