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
import { FlowSection } from "@/components/flow-section";

export const metadata: Metadata = {
  title: `About | ${site.name}`,
  description: `About ${site.name}: skills, frameworks, soft skills and achievements.`,
};

const half = Math.ceil(techStack.length / 2);
const rowA = techStack.slice(0, half);
const rowB = techStack.slice(half);

export default function AboutPage() {
  return (
    <div>
      {/* Intro */}
      <FlowSection tone="blue">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-24 sm:py-32 md:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <Avatar
              src={site.photo}
              alt={site.name}
              className="mb-8 h-16 w-16 rounded-full object-cover ring-4 ring-white"
            />
            <h1 className="display text-5xl sm:text-6xl md:text-7xl">About me</h1>
            <p className="mt-6 max-w-xl text-lg text-muted sm:text-xl">
              I&apos;m {site.name}, a Computer Science graduate who likes
              understanding systems from the ground up and explaining them
              simply. Four years of tutoring Mathematics and IT taught me that
              good engineering and good teaching share a goal: making complex
              things clear.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Illustration
              name="creative-thinker.svg"
              alt=""
              className="mx-auto h-72 w-72 md:h-96 md:w-96"
            />
          </Reveal>
        </div>
      </FlowSection>

      {/* Tech stack marquees */}
      <section className="mx-auto w-full max-w-6xl px-5 py-28 sm:py-36">
        <SectionHeading
          title="Skills and frameworks"
          subtitle="Languages, frameworks and tools I use. Hover to pause."
          className="mb-14"
        />
        <div className="space-y-3">
          <TechMarquee items={rowA} direction="left" />
          <TechMarquee items={rowB} direction="right" />
        </div>
      </section>

      {/* Values */}
      <ValuesStrip />

      {/* Soft skills */}
      <section className="mx-auto w-full max-w-6xl px-5 py-28 sm:py-36">
        <SectionHeading
          title="Soft skills"
          subtitle="Built through tutoring and teamwork."
          className="mb-16"
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {softSkills.map((s, i) => (
            <Reveal key={s.name} delay={(i % 4) * 0.06}>
              <div className="h-full rounded-3xl bg-alt p-7">
                <span className="mb-5 grid h-11 w-11 place-items-center rounded-2xl bg-white text-accent">
                  <LucideIcon name={s.lucide} size={22} />
                </span>
                <h3 className="font-semibold tracking-tight">{s.name}</h3>
                <p className="mt-1 text-sm text-muted">{s.blurb}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Achievements */}
      <FlowSection tone="green">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-14 px-5 py-28 sm:py-36 md:grid-cols-[1fr_1.2fr]">
          <Reveal>
            <Illustration
              name="success-factors.svg"
              alt=""
              className="mx-auto h-72 w-72 md:h-80 md:w-80"
            />
          </Reveal>
          <div>
            <SectionHeading
              title="Achievements"
              subtitle="Academic results, awards and certifications."
              align="left"
              className="mb-8"
            />
            <Reveal delay={0.1}>
              <ul className="divide-y divide-black/[0.06] rounded-3xl border border-white bg-white/75 px-6 backdrop-blur">
                {achievements.map((a) => (
                  <li key={a} className="flex items-start gap-3 py-4">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-tint-green text-green">
                      <i className="fa-solid fa-check text-[10px]" aria-hidden="true" />
                    </span>
                    <span className="text-[15px]">{a}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </FlowSection>

      {/* Recreation */}
      <section className="mx-auto w-full max-w-6xl px-5 py-28 sm:py-36">
        <SectionHeading
          title="Outside of code"
          subtitle="Games, art, writing and music."
          className="mb-16"
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {recreation.map((r, i) => (
            <Reveal key={r.name} delay={(i % 3) * 0.07}>
              <div className="card-lift flex h-full flex-col items-center rounded-[28px] bg-alt p-8 text-center">
                <Illustration name={r.illustration} alt="" className="h-40 w-40" />
                <h3 className="display mt-4 text-xl">{r.name}</h3>
                <p className="mt-1 text-sm text-muted">{r.blurb}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
