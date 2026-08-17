import type { Metadata } from "next";
import {
  site,
  techStack,
  softSkills,
  achievements,
  recreation,
} from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { Illustration } from "@/components/illustration";
import { LucideIcon } from "@/components/lucide-icon";
import { TechMarquee } from "@/components/tech-marquee";
import { ValuesStrip } from "@/components/values-strip";
import { SectionHeading } from "@/components/section-heading";
import { Avatar } from "@/components/avatar";

export const metadata: Metadata = {
  title: `About — ${site.name}`,
  description: `About ${site.name}: skills, frameworks, soft skills, and achievements.`,
};

const half = Math.ceil(techStack.length / 2);
const rowA = techStack.slice(0, half);
const rowB = techStack.slice(half);

export default function AboutPage() {
  return (
    <div>
      {/* Intro */}
      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-20 sm:py-28 md:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <div>
            <div className="mb-5 flex items-center gap-3">
              <Avatar
                src={site.photo}
                alt={site.name}
                className="h-14 w-14 rounded-full border border-border object-cover"
              />
              <p className="text-sm font-semibold uppercase tracking-widest text-accent-deep">
                About me
              </p>
            </div>
            <h1 className="display text-5xl tracking-tight sm:text-6xl md:text-7xl">
              Curious by default,
              <br />
              <span className="text-accent">builder by habit.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted sm:text-xl">
              I&apos;m {site.name}, a Computer Science graduate who enjoys
              understanding systems from the ground up — and explaining them
              simply. Between building projects and four years of tutoring
              Mathematics and IT, I&apos;ve learned that the best engineering
              and the best teaching share one goal: making the complex feel
              clear.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mx-auto h-72 w-72 md:h-80 md:w-80">
            <Illustration name="creative-thinker.svg" alt="Creative thinker" />
          </div>
        </Reveal>
      </section>

      {/* Tech stack marquees — alt grey band */}
      <section className="border-y border-border bg-alt">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-24">
          <SectionHeading
            eyebrow="Toolbox"
            title="Skills & frameworks."
            subtitle="Languages, frameworks, and tools I've built with. Hover to pause."
            className="mb-12"
          />
          <div className="space-y-4">
            <TechMarquee items={rowA} direction="left" />
            <TechMarquee items={rowB} direction="right" />
          </div>
        </div>
      </section>

      {/* Values / how I work */}
      <ValuesStrip />

      {/* Soft skills — alt grey band */}
      <section className="border-y border-border bg-alt">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-28">
          <SectionHeading
            eyebrow="The human side"
            title="Soft skills."
            subtitle="Sharpened by years of tutoring and teamwork."
            className="mb-12"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {softSkills.map((s, i) => (
              <Reveal key={s.name} delay={(i % 4) * 0.06}>
                <div className="group h-full rounded-2xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.18)]">
                  <span className="mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-accent/10 text-accent-deep transition-colors group-hover:bg-accent group-hover:text-white">
                    <LucideIcon name={s.lucide} size={24} />
                  </span>
                  <h3 className="font-display font-bold tracking-tight">
                    {s.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{s.blurb}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-20 sm:py-28 md:grid-cols-[1fr_1.2fr]">
        <Reveal>
          <div className="mx-auto h-72 w-72 md:h-80 md:w-80">
            <Illustration name="success-factors.svg" alt="Achievements" />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div>
            <SectionHeading
              eyebrow="Milestones"
              title="Achievements."
              align="left"
              className="mb-6"
            />
            <ul className="space-y-4">
              {achievements.map((a) => (
                <li key={a} className="flex items-start gap-3">
                  <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-accent/10 text-accent-deep">
                    <LucideIcon name="Lightbulb" size={14} />
                  </span>
                  <span className="text-[15px] text-foreground/90">{a}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* Recreation — alt grey band */}
      <section className="border-t border-border bg-alt">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-28">
          <SectionHeading
            eyebrow="Beyond the code"
            title="Recreation."
            subtitle="When I'm not building software, I'm usually making, playing, or writing something."
            className="mb-12"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recreation.map((r, i) => (
              <Reveal key={r.name} delay={(i % 3) * 0.07}>
                <div className="group flex h-full flex-col items-center rounded-3xl border border-border bg-surface p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.18)]">
                  <div className="h-40 w-40 transition-transform duration-300 group-hover:scale-105">
                    <Illustration name={r.illustration} alt={r.name} float={false} />
                  </div>
                  <h3 className="mt-2 font-display text-lg font-bold tracking-tight">
                    {r.name}
                  </h3>
                  <p className="mt-1 text-sm text-muted">{r.blurb}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
