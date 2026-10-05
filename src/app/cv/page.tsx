import type { Metadata } from "next";
import {
  site,
  socials,
  cv,
  education,
  experience,
  olympiads,
  certifications,
  awards,
  scholarships,
} from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { Figure, Shape } from "@/components/figure";

export const metadata: Metadata = {
  title: `CV | ${site.name}`,
  description: `Curriculum vitae of ${site.name}, ${site.role}.`,
};

export default function CVPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-14 sm:py-16">
      <Reveal>
        <header className="relative pb-10 sm:pr-40">
          <div className="absolute right-0 top-0 hidden sm:block" aria-hidden="true">
            <Shape kind="circle" color="#ffc845" className="absolute bottom-0 left-1/2 h-32 w-32 -translate-x-1/2" />
            <Figure name="transhumans/perserverance-dedication-focus" fill="#ffffff" className="relative h-44" />
          </div>
          <p className="label mb-4">Curriculum vitae</p>
          <h1 className="display text-5xl sm:text-6xl">
            {site.name}
          </h1>
          <p className="mt-3 text-xl text-subtle">{site.role}</p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            {cv.summary}
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-subtle">
            <span>{site.location}</span>
            {socials
              .filter((s) => s.href)
              .map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="flex items-center gap-1.5 transition-colors hover:text-ink"
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
              className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-black"
            >
              Download PDF
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

      <Section title="Awards and honours">
        {awards.map((a, i) => (
          <Row
            key={i}
            period=""
            title={a.title}
            org={a.detail}
            detail=""
            delay={i * 0.04}
          />
        ))}
      </Section>

      <Section title="Scholarships">
        {scholarships.map((s, i) => (
          <Row
            key={i}
            period=""
            title={s.title}
            org={s.detail}
            detail=""
            delay={i * 0.04}
          />
        ))}
      </Section>

      <Section title="Skills">
        <div className="grid gap-6 sm:grid-cols-2">
          {Object.entries(cv.skills).map(([group, items]) => (
            <Reveal key={group}>
              <div>
                <div className="mb-2.5 text-sm font-semibold">{group}</div>
                <div className="flex flex-wrap gap-2">
                  {items.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border-2 border-ink bg-surface px-3 py-0.5 text-xs font-medium"
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

      <Section title="Olympiads and competitions">
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
            detail={c.detail ?? ""}
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
    <section className="border-t-2 border-ink py-10">
      <h2 className="display mb-6 text-2xl">
        <span className="marker">{title}</span>
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
      <div className="grid gap-1 sm:grid-cols-[150px_1fr]">
        <div className="pt-0.5 text-sm text-subtle">{period}</div>
        <div>
          <div className="font-semibold tracking-tight">
            {title}
            {org && <span className="font-normal text-subtle"> · {org}</span>}
          </div>
          {detail && (
            <p className="mt-1.5 text-[15px] leading-relaxed text-muted">
              {detail}
            </p>
          )}
        </div>
      </div>
    </Reveal>
  );
}
