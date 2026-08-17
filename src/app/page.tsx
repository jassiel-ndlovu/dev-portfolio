import Link from "next/link";
import { Hero } from "@/components/hero";
import { EducationSection } from "@/components/education-section";
import { Illustration } from "@/components/illustration";
import { projects, accentClasses } from "@/lib/projects";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Selected work */}
      <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-28">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent-deep">
            Selected work
          </p>
          <h2 className="display text-4xl tracking-tight sm:text-5xl">
            Things I&apos;ve built.
          </h2>
          <p className="mt-4 text-lg text-muted">
            A few of the projects — compilers, platforms, research and apps —
            explored in depth in the workbench.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {projects.slice(0, 6).map((p) => {
            const a = accentClasses[p.accent];
            return (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="group relative overflow-hidden rounded-3xl border border-border bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.18)]"
              >
                <div
                  className={`mb-4 inline-flex rounded-full ${a.bgSoft} px-3 py-1 text-xs font-medium ${a.text}`}
                >
                  {p.year} · {p.role}
                </div>
                <h3 className="font-display text-xl font-bold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-2 text-[15px] text-muted">{p.tagline}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-foreground/[0.04] px-2.5 py-0.5 text-xs text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span
                  className={`absolute right-7 top-7 text-lg opacity-0 transition-all group-hover:opacity-100 ${a.text}`}
                >
                  →
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
          >
            Open the workbench →
          </Link>
        </div>
      </section>

      {/* Education */}
      <EducationSection />

      {/* What I build */}
      <section className="border-t border-border bg-alt">
        <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-28">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent-deep">
              How I work
            </p>
            <h2 className="display text-4xl tracking-tight sm:text-5xl">
              What I build.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {[
              {
                t: "From scratch",
                d: "Compilers, SQL engines, and storage layers — I like understanding the tools all the way down.",
                img: "developer.svg",
                tint: "bg-tint-gold",
              },
              {
                t: "At scale",
                d: "Event-driven, containerized platforms with APIs and messaging holding the pieces together.",
                img: "digital-transformation.svg",
                tint: "bg-tint-mint",
              },
              {
                t: "For people",
                d: "Mobile apps and learning platforms built to be dependable for real, non-technical users.",
                img: "group-meeting.svg",
                tint: "bg-tint-peach",
              },
            ].map((c) => (
              <div
                key={c.t}
                className={`flex h-full flex-col rounded-3xl border border-border ${c.tint} p-6`}
              >
                <div className="mx-auto mb-4 h-40 w-40">
                  <Illustration name={c.img} alt={c.t} float={false} />
                </div>
                <h3 className="font-display text-xl font-bold">{c.t}</h3>
                <p className="mt-2 text-sm text-foreground/80">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
