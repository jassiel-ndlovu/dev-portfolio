import { education } from "@/lib/site";
import { Illustration } from "./illustration";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { Band } from "./band";
import { Figure } from "./figure";

export function EducationSection() {
  return (
    <Band tone="yellow" decor>
      <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:py-20">
        <div className="mb-10 flex items-end justify-between gap-6">
          <SectionHeading
            title="Education"
            subtitle="Degrees and school results, most recent first."
            align="left"
          />
          <Figure
            name="transhumans/school-run-innocent"
            fill="#ffffff"
            className="hidden h-36 sm:block"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {education.map((e, i) => (
            <Reveal key={e.qualification} delay={i * 0.08}>
              <div className="relative flex h-full flex-col rounded-2xl border-2 border-ink bg-surface p-6">
                {e.status === "current" && (
                  <span className="absolute right-5 top-5 inline-flex items-center gap-1.5 rounded-full bg-ink px-2.5 py-1 text-xs font-semibold text-yellow">
                    <span className="h-1.5 w-1.5 rounded-full bg-yellow" />
                    In progress
                  </span>
                )}
                <Illustration name={e.illustration} alt="" className="mb-4 h-28 w-28" />
                <div className="label">{e.period}</div>
                <h3 className="display mt-1.5 text-xl leading-snug">{e.qualification}</h3>
                <div className="mt-1 text-sm text-subtle">{e.institution}</div>
                <p className="mt-3 text-[15px] text-muted">{e.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Band>
  );
}
