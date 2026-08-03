/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import {
  site,
  experience,
  experienceSummary,
  olympiads,
} from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { Illustration } from "@/components/illustration";
import { LucideIcon } from "@/components/lucide-icon";

export const metadata: Metadata = {
  title: `Experience — ${site.name}`,
  description: `Tutoring experience and academic competitions of ${site.name}.`,
};

export default function ExperiencePage() {
  return (
    <div className="pb-16">
      {/* Header — soft peach panel */}
      <section className="relative overflow-hidden bg-tint-peach">
        <div className="pointer-events-none absolute -right-16 -top-20 h-72 w-72 rounded-full bg-accent/15" />
        <div className="pointer-events-none absolute bottom-10 left-10 h-9 w-9 rotate-12 rounded-lg bg-pop/20" />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-8 px-5 py-16 md:grid-cols-[1.25fr_1fr]">
          <Reveal>
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-surface-2 px-3 py-1 text-sm font-medium text-muted">
                <span className="h-2 w-2 rounded-full bg-pop" /> Experience
              </p>
              <h1 className="display text-5xl sm:text-6xl md:text-7xl">
                Four years of
                <br />
                <span className="text-accent">teaching what I love.</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-foreground/80">
                {experienceSummary}
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mx-auto h-72 w-72 md:h-80 md:w-80">
              <Illustration name="mathematics-tutor.svg" alt="Tutoring" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Tutoring roles */}
      <section className="mx-auto w-full max-w-6xl px-5 py-14">
        <Reveal>
          <h2 className="display text-3xl sm:text-4xl">Tutoring</h2>
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2">
          {experience.map((e, i) => (
            <Reveal key={e.company} delay={i * 0.08}>
              <div className="flex h-full flex-col rounded-2xl border border-border bg-surface p-6">
                <div className="flex items-center gap-4">
                  <div className="grid h-16 w-16 shrink-0 place-items-center overflow-hidden rounded-xl border border-border bg-white">
                    <img
                      src={e.logo}
                      alt={`${e.company} logo`}
                      className="h-full w-full object-contain p-1.5"
                    />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold leading-tight">
                      {e.company}
                    </h3>
                    <div className="text-sm text-accent-deep">{e.role}</div>
                    <div className="text-xs text-muted">{e.period}</div>
                  </div>
                </div>
                <p className="mt-4 text-sm text-foreground/80">{e.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Olympiads — mint (teal pop) panel */}
      <section className="bg-tint-mint">
        <div className="mx-auto w-full max-w-6xl px-5 py-16">
          <Reveal>
            <span className="mb-3 inline-block rounded-full bg-surface-2 px-3 py-1 text-sm font-medium text-pop">
              Competitive streak
            </span>
            <h2 className="display text-3xl sm:text-4xl md:text-5xl">
              Olympiads &amp; competitions
            </h2>
            <p className="mt-2 max-w-xl text-muted">
              A long-running love of competitive mathematics and computing.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {olympiads.map((o, i) => (
              <Reveal key={o.name} delay={(i % 2) * 0.08}>
                <div className="flex h-full items-start gap-4 rounded-2xl border border-border bg-surface-2 p-5">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/10 text-accent-deep">
                    <LucideIcon name="Sigma" size={22} />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-2">
                      <h3 className="font-display font-bold">{o.name}</h3>
                      <span className="text-xs text-muted">{o.years}</span>
                    </div>
                    <p className="mt-1 text-sm text-foreground/80">{o.result}</p>
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
