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
      <section className="mx-auto w-full max-w-6xl px-5 py-16">
        <div className="mb-8 flex items-end justify-between">
          <h2 className="display text-3xl sm:text-4xl">Selected work</h2>
          <Link
            href="/projects"
            className="text-sm font-medium text-muted hover:text-foreground"
          >
            All projects →
          </Link>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          {projects.map((p) => {
            const a = accentClasses[p.accent];
            return (
              <Link
                key={p.slug}
                href={`/projects/${p.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div
                  className={`mb-4 inline-flex rounded-lg ${a.bgSoft} px-2.5 py-1 text-xs font-medium ${a.text}`}
                >
                  {p.year} · {p.role}
                </div>
                <h3 className="font-display text-xl font-bold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted">{p.tagline}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tech.slice(0, 4).map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-foreground/5 px-2 py-0.5 text-xs text-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span
                  className={`absolute right-6 top-6 text-lg opacity-0 transition-all group-hover:opacity-100 ${a.text}`}
                >
                  →
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Education */}
      <EducationSection />

      {/* What I build */}
      <section className="border-t border-border bg-surface">
        <div className="mx-auto w-full max-w-6xl px-5 py-16">
          <h2 className="display mb-8 text-3xl sm:text-4xl">What I build</h2>
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
