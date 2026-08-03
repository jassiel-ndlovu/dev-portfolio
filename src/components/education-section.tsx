import { education } from "@/lib/site";
import { Illustration } from "./illustration";
import { Reveal } from "./reveal";

export function EducationSection() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-16">
      <div className="mb-8">
        <h2 className="display text-3xl sm:text-4xl">Education</h2>
        <p className="mt-2 max-w-xl text-muted">
          A steady climb from matric distinctions to postgraduate data science.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {education.map((e, i) => (
          <Reveal key={e.qualification} delay={i * 0.08}>
            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6">
              {e.status === "current" && (
                <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2.5 py-1 text-xs font-medium text-accent-deep">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
                  In progress
                </span>
              )}
              <div className="mb-4 h-36 w-36">
                <Illustration
                  name={e.illustration}
                  alt={e.qualification}
                  float={false}
                />
              </div>
              <div className="text-xs font-semibold uppercase tracking-wider text-accent-deep">
                {e.period}
              </div>
              <h3 className="mt-1 font-display text-lg font-bold leading-tight">
                {e.qualification}
              </h3>
              <div className="text-sm text-muted">{e.institution}</div>
              <p className="mt-3 text-sm text-foreground/80">{e.detail}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
