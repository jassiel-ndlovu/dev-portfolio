import Link from "next/link";
import { Hero } from "@/components/hero";
import { EducationSection } from "@/components/education-section";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { Band } from "@/components/band";
import { Figure, Shape } from "@/components/figure";
import type { FigureName } from "@/lib/figures";
import { projects, accentClasses } from "@/lib/projects";

const focus: { t: string; d: string; fig: FigureName; fill: string; bg: string }[] = [
  {
    t: "From scratch",
    d: "Compilers, SQL engines and storage layers. I like knowing how my tools work underneath.",
    fig: "transhumans/growth-study",
    fill: "#ffffff",
    bg: "#ffc845",
  },
  {
    t: "At scale",
    d: "Event-driven, containerised platforms with APIs and messaging holding the pieces together.",
    fig: "transhumans/team-cooperation",
    fill: "#ffffff",
    bg: "#ff7a59",
  },
  {
    t: "For people",
    d: "Mobile apps and learning platforms that non-technical users can depend on.",
    fig: "transhumans/shopping-walk-good",
    fill: "#ffffff",
    bg: "#ffb8c6",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Selected projects */}
      <Band tone="paper">
        <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:py-20">
          <div className="mb-10 flex items-end justify-between gap-6">
            <SectionHeading
              title="Selected projects"
              subtitle="Compilers, research, platforms and apps."
              align="left"
            />
            <div className="relative hidden shrink-0 sm:block">
              <Shape kind="circle" color="#ffc845" className="absolute bottom-0 left-1/2 h-28 w-28 -translate-x-1/2" />
              <Figure name="peeps/sitting-11" fill="#ffffff" className="relative h-32" />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {projects.slice(0, 6).map((p, i) => {
              const a = accentClasses[p.accent];
              return (
                <Reveal key={p.slug} delay={(i % 2) * 0.06}>
                  <Link
                    href={`/projects/${p.slug}`}
                    className="card-lift group flex h-full flex-col rounded-2xl border-2 border-ink bg-surface p-6"
                  >
                    <div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                      <span className={`rounded-full px-2.5 py-1 ${a.chip}`}>{p.year}</span>
                      <span className="text-subtle">{p.role}</span>
                    </div>
                    <h3 className="display mt-4 text-2xl">{p.title}</h3>
                    <p className="mt-1.5 text-[15px] text-muted">{p.tagline}</p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.tech.slice(0, 4).map((t) => (
                        <span key={t} className="rounded-full bg-background px-2.5 py-1 text-xs text-muted">
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="mt-auto pt-6">
                      <span className="link-arrow text-sm">
                        Read more <span aria-hidden="true">→</span>
                      </span>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/projects"
              className="inline-flex rounded-full bg-ink px-6 py-3 font-semibold text-white transition-colors hover:bg-black"
            >
              See all projects
            </Link>
          </div>
        </div>
      </Band>

      {/* Education */}
      <EducationSection />

      {/* Focus areas */}
      <Band tone="white">
        <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:py-20">
          <SectionHeading
            title="What I build"
            subtitle="Three kinds of work I keep coming back to."
            className="mb-12"
          />
          <div className="grid gap-10 md:grid-cols-3 md:gap-6">
            {focus.map((c, i) => (
              <Reveal key={c.t} delay={i * 0.08} className="text-center">
                <div className="relative mx-auto flex h-48 w-48 items-end justify-center">
                  <Shape kind="blob" color={c.bg} className="absolute inset-0 h-full w-full" />
                  <Figure name={c.fig} fill={c.fill} className="relative h-44" />
                </div>
                <h3 className="display mt-5 text-2xl">{c.t}</h3>
                <p className="mx-auto mt-2 max-w-xs text-[15px] text-muted">{c.d}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Band>
    </>
  );
}
