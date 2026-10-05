/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { site, experience, experienceSummary, olympiads } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { Illustration } from "@/components/illustration";
import { LucideIcon } from "@/components/lucide-icon";
import { SectionHeading } from "@/components/section-heading";
import { FlowSection } from "@/components/flow-section";

export const metadata: Metadata = {
  title: `Experience | ${site.name}`,
  description: `Tutoring experience and academic competitions of ${site.name}.`,
};

export default function ExperiencePage() {
  return (
    <div>
      {/* Header */}
      <FlowSection tone="blue">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-24 sm:py-32 md:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <h1 className="display text-5xl sm:text-6xl md:text-7xl">Experience</h1>
            <p className="mt-6 max-w-xl text-lg text-muted sm:text-xl">
              {experienceSummary}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Illustration
              name="mathematics-tutor.svg"
              alt=""
              className="mx-auto h-72 w-72 md:h-96 md:w-96"
            />
          </Reveal>
        </div>
      </FlowSection>

      {/* Roles */}
      <section className="mx-auto w-full max-w-6xl px-5 py-28 sm:py-36">
        <SectionHeading
          title="Roles"
          subtitle="Tutoring, teaching content and design work."
          className="mb-16"
        />
        <div className="grid gap-5 md:grid-cols-2">
          {experience.map((e, i) => (
            <Reveal key={e.company} delay={(i % 2) * 0.08}>
              <div className="flex h-full flex-col rounded-[28px] bg-alt p-8 sm:p-9">
                <div className="flex items-center gap-4">
                  <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-2xl bg-white">
                    <img
                      src={e.logo}
                      alt={`${e.company} logo`}
                      className="h-full w-full object-contain p-1.5"
                    />
                  </div>
                  <div className="min-w-0">
                    <h3 className="display text-xl leading-snug">{e.company}</h3>
                    <div className="text-sm font-medium text-accent">{e.role}</div>
                  </div>
                </div>
                <div className="label mt-6">{e.period}</div>
                <p className="mt-2 text-[15px] text-muted">{e.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Olympiads */}
      <FlowSection tone="sky" flip>
        <div className="mx-auto w-full max-w-6xl px-5 py-28 sm:py-36">
          <SectionHeading
            title="Olympiads and competitions"
            subtitle="Mathematics and computing contests since school."
            className="mb-16"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {olympiads.map((o, i) => (
              <Reveal key={o.name} delay={(i % 2) * 0.08}>
                <div className="flex h-full items-start gap-4 rounded-3xl border border-white bg-white/75 p-7 backdrop-blur">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-tint-sky text-sky">
                    <LucideIcon name="Sigma" size={20} />
                  </span>
                  <div>
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-semibold tracking-tight">{o.name}</h3>
                      <span className="text-xs text-subtle">{o.years}</span>
                    </div>
                    <p className="mt-1 text-sm text-muted">{o.result}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </FlowSection>
    </div>
  );
}
