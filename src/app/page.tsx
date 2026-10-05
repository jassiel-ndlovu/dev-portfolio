import Link from "next/link";
import { Hero } from "@/components/hero";
import { EducationSection } from "@/components/education-section";
import { Illustration } from "@/components/illustration";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { projects, accentClasses } from "@/lib/projects";

const focus = [
  {
    t: "From scratch",
    d: "Compilers, SQL engines and storage layers. I like knowing how my tools work underneath.",
    img: "developer.svg",
    tint: "bg-tint-blue",
  },
  {
    t: "At scale",
    d: "Event-driven, containerised platforms with APIs and messaging holding the pieces together.",
    img: "digital-transformation.svg",
    tint: "bg-tint-sky",
  },
  {
    t: "For people",
    d: "Mobile apps and learning platforms that non-technical users can depend on.",
    img: "group-meeting.svg",
    tint: "bg-tint-green",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      {/* Selected projects */}
      <section className="mx-auto w-full max-w-6xl px-5 py-28 sm:py-36">
        <SectionHeading
          title="Selected projects"
          subtitle="Compilers, research, platforms and apps."
          className="mb-16"
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {projects.slice(0, 6).map((p, i) => {
            const a = accentClasses[p.accent];
            return (
              <Reveal key={p.slug} delay={(i % 2) * 0.08}>
                <Link
                  href={`/projects/${p.slug}`}
                  className="card-lift group flex h-full flex-col rounded-[28px] bg-alt p-8 sm:p-9"
                >
                  <div className="flex items-center gap-2 text-xs font-medium">
                    <span className={`h-1.5 w-1.5 rounded-full ${a.bg}`} />
                    <span className={a.text}>{p.year}</span>
                    <span className="text-subtle">· {p.role}</span>
                  </div>
                  <h3 className="display mt-4 text-2xl sm:text-[1.75rem]">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-[15px] text-muted">{p.tagline}</p>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {p.tech.slice(0, 4).map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-white px-2.5 py-1 text-xs text-muted"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="link-arrow mt-auto pt-7 text-sm">
                    Read more <span aria-hidden="true">›</span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <div className="mt-14 text-center">
          <Link
            href="/projects"
            className="inline-flex rounded-full bg-accent px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-accent-hover"
          >
            See all projects
          </Link>
        </div>
      </section>

      {/* Education */}
      <EducationSection />

      {/* Focus areas */}
      <section className="mx-auto w-full max-w-6xl px-5 py-28 sm:py-36">
        <SectionHeading
          title="What I build"
          subtitle="Three kinds of work I keep coming back to."
          className="mb-16"
        />
        <div className="grid gap-5 md:grid-cols-3">
          {focus.map((c, i) => (
            <Reveal key={c.t} delay={i * 0.08}>
              <div className="flex h-full flex-col overflow-hidden rounded-[28px] bg-alt">
                <div className={`${c.tint} px-8 pt-8`}>
                  <Illustration
                    name={c.img}
                    alt=""
                    className="mx-auto h-44 w-44"
                  />
                </div>
                <div className="p-8">
                  <h3 className="display text-2xl">{c.t}</h3>
                  <p className="mt-2 text-[15px] text-muted">{c.d}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
