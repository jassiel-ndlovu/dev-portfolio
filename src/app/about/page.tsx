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
import { ProfilePhoto } from "@/components/profile-photo";
import { Band } from "@/components/band";
import { PageIntro } from "@/components/page-intro";
import { Figure, Shape } from "@/components/figure";

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
      <PageIntro
        title="About me"
        figure="transhumans/chill-sitting"
        fill="#ffc845"
        shape="#ffb8c6"
        lead={
          <ProfilePhoto className="mb-6 h-16 w-16 rounded-full border-2 border-ink object-cover" />
        }
      >
        I&apos;m {site.name}, a Computer Science graduate who likes
        understanding systems from the ground up and explaining them simply.
        Four years of tutoring Mathematics and IT taught me that good
        engineering and good teaching share a goal: making complex things
        clear.
      </PageIntro>

      {/* Tech stack marquees */}
      <Band tone="ink">
        <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:py-20">
          <SectionHeading
            title="Skills and frameworks"
            subtitle="Languages, frameworks and tools I use. Hover to pause."
            className="mb-10"
          />
        </div>
        <div className="-mt-6 space-y-3 pb-16 sm:pb-20">
          <TechMarquee items={rowA} direction="left" />
          <TechMarquee items={rowB} direction="right" />
        </div>
      </Band>

      <ValuesStrip />

      {/* Soft skills */}
      <Band tone="paper">
        <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:py-20">
          <div className="mb-10 flex items-end justify-between gap-6">
            <SectionHeading
              title="Soft skills"
              subtitle="Built through tutoring and teamwork."
              align="left"
            />
            <div className="relative hidden shrink-0 sm:block">
              <Shape kind="arch" color="#ff7a59" className="absolute bottom-0 left-1/2 h-24 w-24 -translate-x-1/2" />
              <Figure name="peeps/standing-18" fill="#ffffff" className="relative h-40" />
            </div>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {softSkills.map((s, i) => (
              <Reveal key={s.name} delay={(i % 4) * 0.05}>
                <div className="h-full rounded-2xl border-2 border-ink bg-surface p-5">
                  <span className="mb-4 grid h-10 w-10 place-items-center rounded-xl bg-yellow text-ink">
                    <LucideIcon name={s.lucide} size={20} />
                  </span>
                  <h3 className="font-semibold">{s.name}</h3>
                  <p className="mt-1 text-sm text-muted">{s.blurb}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Band>

      {/* Achievements */}
      <Band tone="yellow" decor>
        <div className="mx-auto grid w-full max-w-5xl items-center gap-10 px-5 py-16 sm:py-20 md:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <div className="relative mx-auto grid h-64 w-64 place-items-center md:h-72 md:w-72">
              <Shape kind="circle" color="#ffffff" className="absolute inset-0" />
              <Illustration name="success-factors.svg" alt="" className="relative h-[85%] w-[85%]" />
            </div>
          </Reveal>
          <div>
            <SectionHeading
              title="Achievements"
              subtitle="Academic results, awards and certifications."
              align="left"
              className="mb-6"
            />
            <Reveal delay={0.08}>
              <ul className="divide-y divide-ink/10 rounded-2xl border-2 border-ink bg-surface px-5">
                {achievements.map((a) => (
                  <li key={a} className="flex items-start gap-3 py-3.5">
                    <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-ink text-yellow">
                      <i className="fa-solid fa-check text-[10px]" aria-hidden="true" />
                    </span>
                    <span className="text-[15px]">{a}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </Band>

      {/* Recreation */}
      <Band tone="paper">
        <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:py-20">
          <SectionHeading
            title="Outside of code"
            subtitle="Games, art, writing and music."
            className="mb-10"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {recreation.map((r, i) => (
              <Reveal key={r.name} delay={(i % 3) * 0.06}>
                <div className="card-lift flex h-full flex-col items-center rounded-2xl border-2 border-ink bg-surface p-6 text-center">
                  <Illustration name={r.illustration} alt="" className="h-36 w-36" />
                  <h3 className="display mt-3 text-xl">{r.name}</h3>
                  <p className="mt-1 text-sm text-muted">{r.blurb}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Band>
    </div>
  );
}
