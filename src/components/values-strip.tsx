import { values, tintClasses } from "@/lib/site";
import { Illustration } from "./illustration";
import { Reveal } from "./reveal";

export function ValuesStrip() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-16">
      <Reveal>
        <div className="mb-10 max-w-xl">
          <span className="mb-3 inline-block rounded-full bg-pop-soft px-3 py-1 text-sm font-medium text-pop">
            How I work
          </span>
          <h2 className="display text-3xl sm:text-4xl md:text-5xl">
            A few things I
            <span className="text-accent"> hold to.</span>
          </h2>
        </div>
      </Reveal>

      <div className="grid gap-5 sm:grid-cols-2">
        {values.map((v, i) => (
          <Reveal key={v.title} delay={(i % 2) * 0.08}>
            <div
              className={`group relative flex h-full flex-col-reverse items-center gap-3 overflow-hidden rounded-3xl border border-border ${tintClasses[v.tint]} p-6 text-center transition-transform hover:-translate-y-1 sm:flex-row sm:gap-5 sm:text-left`}
            >
              <div className="min-w-0">
                <h3 className="font-display text-xl font-bold sm:text-2xl">
                  {v.title}
                </h3>
                <p className="mt-2 text-sm text-foreground/80">{v.blurb}</p>
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
