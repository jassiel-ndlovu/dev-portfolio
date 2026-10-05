import { education } from "@/lib/site";
import { Illustration } from "./illustration";
import { Reveal } from "./reveal";
import { SectionHeading } from "./section-heading";
import { FlowSection } from "./flow-section";

export function EducationSection() {
  return (
    <FlowSection tone="green">
      <div className="mx-auto w-full max-w-6xl px-5 py-28 sm:py-36">
        <SectionHeading
          title="Education"
          subtitle="Degrees and school results, most recent first."
          className="mb-16"
        />

        <div className="grid gap-5 md:grid-cols-3">
          {education.map((e, i) => (
            <Reveal key={e.qualification} delay={i * 0.08}>
              <div className="relative flex h-full flex-col rounded-[28px] border border-white bg-white/75 p-8 shadow-[0_1px_2px_rgba(17,24,39,0.04)] backdrop-blur">
                {e.status === "current" && (
                  <span className="absolute right-6 top-6 inline-flex items-center gap-1.5 rounded-full bg-tint-green px-2.5 py-1 text-xs font-medium text-green">
                    <span className="h-1.5 w-1.5 rounded-full bg-green" />
                    In progress
                  </span>
                )}
                <Illustration
                  name={e.illustration}
                  alt=""
                  className="mb-6 h-32 w-32"
                />
                <div className="label">{e.period}</div>
                <h3 className="display mt-2 text-xl leading-snug">
                  {e.qualification}
                </h3>
                <div className="mt-1 text-sm text-subtle">{e.institution}</div>
                <p className="mt-4 text-[15px] text-muted">{e.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </FlowSection>
  );
}
