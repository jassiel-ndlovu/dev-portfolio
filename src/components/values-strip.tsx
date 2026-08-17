import { values } from "@/lib/site";
import { Illustration } from "./illustration";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";

export function ValuesStrip() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-20 sm:py-28">
      <SectionHeading
        eyebrow="How I work"
        title="A few things I hold to."
        className="mb-12"
      />

      <div className="grid gap-5 sm:grid-cols-2">
        {values.map((v, i) => (
          <Reveal key={v.title} delay={(i % 2) * 0.08}>
            <div className="group flex h-full flex-col-reverse items-center gap-4 rounded-3xl border border-border bg-surface p-8 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.18)] sm:flex-row sm:gap-6 sm:text-left">
              <div className="min-w-0">
                <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl">
                  {v.title}
                </h3>
                <p className="mt-2 text-[15px] text-muted">{v.blurb}</p>
              </div>
              <div className="h-28 w-28 shrink-0 transition-transform duration-300 group-hover:scale-105 sm:h-36 sm:w-36">
                <Illustration name={v.illustration} alt={v.title} float={false} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
