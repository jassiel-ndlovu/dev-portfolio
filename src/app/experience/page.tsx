/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { site, experience, experienceSummary, olympiads } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { Illustration } from "@/components/illustration";
import { LucideIcon } from "@/components/lucide-icon";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: `Experience — ${site.name}`,
  description: `Tutoring experience and academic competitions of ${site.name}.`,
};

export default function ExperiencePage() {
  return (
    <div>
      {/* Header */}
      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-20 sm:py-28 md:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent-deep">
              Experience
            </p>
            <h1 className="display text-5xl tracking-tight sm:text-6xl md:text-7xl">
              Four years of
              <br />
              <span className="text-accent">teaching what I love.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted sm:text-xl">
              {experienceSummary}
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mx-auto h-72 w-72 md:h-80 md:w-80">
            <Illustration name="mathematics-tutor.svg" alt="Tutoring" />
          </div>
        </Reveal>
      </section>

      {/* Tutoring */}
      <section className="mx-auto w-full max-w-6xl px-5 pb-8">
        <SectionHeading eyebrow="Tutoring" title="Where I've taught." className="mb-12" />
        <div className="grid gap-5 md:grid-cols-2">
          {experience.map((e, i) => (
            <Reveal key={e.company} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-3xl border border-border bg-surface p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.18)]">
                <div className="flex items-center gap-4">
                  <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-2xl border border-border bg-white">
                    <img
                      src={e.logo}
                      alt={`${e.company} logo`}
                      className="h-full w-full object-contain p-1.5"
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold tracking-tight">
                      {e.company}
                    </h3>
                    <div className="text-sm text-accent-deep">{e.role}</div>
                    <div className="text-xs text-muted">{e.period}</div>
                  </div>
                </div>
                <p className="mt-5 text-[15px] text-muted">{e.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Olympiads — alt grey band */}
      <section className="mt-12 border-t border-border bg-alt">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-28">
          <SectionHeading
            eyebrow="Competitive streak"
            title="Olympiads & competitions."
            subtitle="A long-running love of competitive mathematics and computing."
            className="mb-12"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {olympiads.map((o, i) => (
              <Reveal key={o.name} delay={(i % 2) * 0.08}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-border bg-surface p-6">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-accent/10 text-accent-deep">
                    <LucideIcon name="Sigma" size={22} />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-2">
                      <h3 className="font-display font-bold tracking-tight">
                        {o.name}
                      </h3>
                      <span className="text-xs text-muted">{o.years}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted">{o.result}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
