/* eslint-disable @next/next/no-img-element */
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

export const metadata: Metadata = {
  title: `About — ${site.name}`,
  description: `About ${site.name}: skills, frameworks, soft skills, and achievements.`,
};

const half = Math.ceil(techStack.length / 2);
const rowA = techStack.slice(0, half);
const rowB = techStack.slice(half);

export default function AboutPage() {
  return (
    <div className="pb-4">
      {/* Intro — soft peach panel */}
      <section className="relative overflow-hidden bg-tint-peach">
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/15" />
        <div className="pointer-events-none absolute bottom-8 left-8 h-10 w-10 rotate-12 rounded-lg bg-pop/20" />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-8 px-5 py-16 md:grid-cols-[1.25fr_1fr]">
          <Reveal>
            <div>
              <div className="mb-4 flex items-center gap-3">
                <img
                  src={site.photo}
                  alt={site.name}
                  className="h-14 w-14 rounded-full border-2 border-surface-2 object-cover shadow-md"
                  // onError={(e) => {
                  //   e.currentTarget.style.display = "none";
                  // }}
                />
                <p className="inline-flex items-center gap-2 rounded-full bg-surface-2 px-3 py-1 text-sm font-medium text-muted">
                  <span className="h-2 w-2 rounded-full bg-pop" /> About me
                </p>
              </div>
              <h1 className="display text-5xl sm:text-6xl md:text-7xl">
                Curious by default,
                <br />
                <span className="text-accent">builder by habit.</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-foreground/80">
                I&apos;m {site.name}, a Computer Science graduate who enjoys
                understanding systems from the ground up — and explaining them
                simply. Between building projects and four years of tutoring
                Mathematics and IT, I&apos;ve learned that the best engineering
                and the best teaching share the same goal: making the complex
                feel clear.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mx-auto h-72 w-72 md:h-80 md:w-80">
              <Illustration name="creative-thinker.svg" alt="Creative thinker" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Tech stack marquees — neutral so chips pop */}
      <section className="mx-auto w-full max-w-6xl px-5 py-16">
        <Reveal>
          <span className="mb-3 inline-block rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent-deep">
            Toolbox
          </span>
          <h2 className="display text-3xl sm:text-4xl md:text-5xl">
            Skills &amp; frameworks
          </h2>
          <p className="mt-2 max-w-xl text-muted">
            Languages, frameworks, and tools I&apos;ve built with. Hover to
            pause.
          </p>
        </Reveal>
        <div className="mt-8 space-y-4">
          <TechMarquee items={rowA} direction="left" />
          <TechMarquee items={rowB} direction="right" />
        </div>
      </section>

      {/* Values / how I work */}
      <ValuesStrip />

      {/* Soft skills — gold panel */}
      <section className="bg-tint-gold">
        <div className="mx-auto w-full max-w-6xl px-5 py-16">
          <Reveal>
            <span className="mb-3 inline-block rounded-full bg-surface-2 px-3 py-1 text-sm font-medium text-accent-deep">
              The human side
            </span>
            <h2 className="display text-3xl sm:text-4xl md:text-5xl">
              Soft skills
            </h2>
            <p className="mt-2 max-w-xl text-muted">
              Sharpened by years of tutoring and teamwork.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {softSkills.map((s, i) => (
              <Reveal key={s.name} delay={(i % 4) * 0.06}>
                <div className="group h-full rounded-2xl border border-border bg-surface-2 p-5 transition-all hover:-translate-y-1 hover:border-accent/50">
                  <span className="mb-3 grid h-12 w-12 place-items-center rounded-xl bg-accent/10 text-accent-deep transition-colors group-hover:bg-accent group-hover:text-dark">
                    <LucideIcon name={s.lucide} size={24} />
                  </span>
                  <h3 className="font-display font-bold">{s.name}</h3>
                  <p className="mt-1 text-sm text-muted">{s.blurb}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements — mint (teal pop) panel */}
      <section className="bg-tint-mint">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-16 md:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <div className="mx-auto h-72 w-72 md:h-80 md:w-80">
              <Illustration name="success-factors.svg" alt="Achievements" />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <span className="mb-3 inline-block rounded-full bg-surface-2 px-3 py-1 text-sm font-medium text-pop">
                Milestones
              </span>
              <h2 className="display text-3xl sm:text-4xl md:text-5xl">
                Achievements
              </h2>
              <ul className="mt-6 space-y-3">
                {achievements.map((a) => (
                  <li key={a} className="flex items-start gap-3">
                    <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-pop/15 text-pop">
                      <LucideIcon name="Lightbulb" size={14} />
                    </span>
                    <span className="text-foreground/85">{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Recreation — rose panel with illustrated cards */}
      <section className="bg-tint-rose">
        <div className="mx-auto w-full max-w-6xl px-5 py-16">
          <Reveal>
            <span className="mb-3 inline-block rounded-full bg-surface-2 px-3 py-1 text-sm font-medium text-accent-deep">
              Beyond the code
            </span>
            <h2 className="display text-3xl sm:text-4xl md:text-5xl">
              Recreation
            </h2>
            <p className="mt-2 max-w-xl text-muted">
              When I&apos;m not building software, I&apos;m usually making,
              playing, or writing something.
            </p>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {recreation.map((r, i) => (
              <Reveal key={r.name} delay={(i % 3) * 0.07}>
                <div className="group flex h-full flex-col items-center rounded-3xl border border-border bg-surface-2 p-6 text-center transition-transform hover:-translate-y-1">
                  <div className="h-40 w-40 transition-transform duration-300 group-hover:scale-105">
                    <Illustration name={r.illustration} alt={r.name} float={false} />
                  </div>
                  <h3 className="mt-2 font-display text-lg font-bold">{r.name}</h3>
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
