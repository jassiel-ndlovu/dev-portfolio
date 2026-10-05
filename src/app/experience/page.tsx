/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { site, experience, experienceSummary, olympiads } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { LucideIcon } from "@/components/lucide-icon";
import { SectionHeading } from "@/components/section-heading";
import { Band } from "@/components/band";
import { PageIntro } from "@/components/page-intro";
import { Figure } from "@/components/figure";

export const metadata: Metadata = {
  title: `Experience | ${site.name}`,
  description: `Tutoring experience and academic competitions of ${site.name}.`,
};

export default function ExperiencePage() {
  return (
    <div>
      <PageIntro
        title="Experience"
        figure="transhumans/team-cooperation"
        fill="#ffffff"
        shape="#ffc845"
      >
        {experienceSummary}
      </PageIntro>

      {/* Roles */}
      <Band tone="white">
        <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:py-20">
          <SectionHeading
            title="Roles"
            subtitle="Tutoring, teaching content and design work."
            className="mb-10"
          />
          <div className="grid gap-4 md:grid-cols-2">
            {experience.map((e, i) => (
              <Reveal key={e.company} delay={(i % 2) * 0.06}>
                <div className="flex h-full flex-col rounded-2xl border-2 border-ink bg-background p-6">
                  <div className="flex items-center gap-4">
                    <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl border-2 border-ink bg-white">
                      <img
                        src={e.logo}
                        alt={`${e.company} logo`}
                        className="h-full w-full object-contain p-1"
                      />
                    </div>
                    <div className="min-w-0">
                      <h3 className="display text-xl leading-snug">{e.company}</h3>
                      <div className="text-sm font-semibold">{e.role}</div>
                    </div>
                  </div>
                  <span className="mt-5 self-start rounded-full bg-yellow px-2.5 py-1 text-xs font-semibold">
                    {e.period}
                  </span>
                  <p className="mt-3 text-[15px] text-muted">{e.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Band>

      {/* Olympiads */}
      <Band tone="ink" decor>
        <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:py-20">
          <div className="mb-10 flex items-end justify-between gap-6">
            <SectionHeading
              title="Olympiads and competitions"
              subtitle="Mathematics and computing contests since school."
              align="left"
            />
            <Figure
              name="transhumans/looking-sitting-introspective"
              fill="#ffb8c6"
              className="hidden h-32 sm:block"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {olympiads.map((o, i) => (
              <Reveal key={o.name} delay={(i % 2) * 0.06}>
                <div className="flex h-full items-start gap-4 rounded-2xl bg-ink-2 p-5">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-yellow text-ink">
                    <LucideIcon name="Sigma" size={20} />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-semibold text-white">{o.name}</h3>
                      <span className="text-xs text-yellow">{o.years}</span>
                    </div>
                    <p className="mt-1 text-sm text-white/70">{o.result}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Band>
    </div>
  );
}
