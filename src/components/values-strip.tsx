import { values, tintClasses } from "@/lib/site";
import { Illustration } from "./illustration";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { FlowSection } from "./flow-section";

export function ValuesStrip() {
  return (
    <FlowSection tone="sky" flip>
      <div className="mx-auto w-full max-w-6xl px-5 py-28 sm:py-36">
        <SectionHeading
          title="How I work"
          subtitle="Principles I bring to every project."
          className="mb-16"
        />

        <div className="grid gap-5 sm:grid-cols-2">
          {values.map((v, i) => (
            <Reveal key={v.title} delay={(i % 2) * 0.08}>
              <div className="flex h-full flex-col-reverse items-center gap-6 rounded-[28px] border border-white bg-white/75 p-8 text-center backdrop-blur sm:flex-row sm:text-left">
                <div className="min-w-0">
                  <h3 className="display text-2xl">{v.title}</h3>
                  <p className="mt-2 text-[15px] text-muted">{v.blurb}</p>
                </div>
                <div
                  className={`h-28 w-28 shrink-0 rounded-3xl p-2 sm:h-32 sm:w-32 ${tintClasses[v.tint]}`}
                >
                  <Illustration name={v.illustration} alt="" className="h-full w-full" />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </FlowSection>
  );
}
