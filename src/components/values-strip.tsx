import { values, tintClasses } from "@/lib/site";
import { Illustration } from "./illustration";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { Band } from "./band";
import { Figure } from "./figure";

export function ValuesStrip() {
  return (
    <Band tone="green" decor>
      <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:py-20">
        <div className="mb-10 flex items-end justify-between gap-6">
          <SectionHeading
            title="How I work"
            subtitle="Principles I bring to every project."
            align="left"
          />
          <Figure
            name="transhumans/perserverance-dedication-focus"
            fill="#ffc845"
            className="hidden h-36 sm:block"
          />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={(i % 2) * 0.06}>
              <div className="flex h-full items-center gap-5 rounded-2xl bg-surface p-6 text-ink">
                <div className={`h-24 w-24 shrink-0 rounded-2xl p-1.5 ${tintClasses[v.tint]}`}>
                  <Illustration name={v.illustration} alt="" className="h-full w-full" />
                </div>
                <div className="min-w-0">
                  <h3 className="display text-xl">{v.title}</h3>
                  <p className="mt-1.5 text-[15px] text-muted">{v.blurb}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Band>
  );
}
