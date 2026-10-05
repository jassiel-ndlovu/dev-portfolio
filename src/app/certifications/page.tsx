/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { site, certifications } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { Illustration } from "@/components/illustration";
import { FlowSection } from "@/components/flow-section";

export const metadata: Metadata = {
  title: `Certifications | ${site.name}`,
  description: `Professional certifications held by ${site.name}.`,
};

export default function CertificationsPage() {
  return (
    <div>
      {/* Header */}
      <FlowSection tone="sky">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-24 sm:py-32 md:grid-cols-[1.2fr_1fr]">
          <Reveal>
            <h1 className="display text-5xl sm:text-6xl md:text-7xl">
              Certifications
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted sm:text-xl">
              Credentials and professional memberships. More to come as I
              study data science and cloud.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <Illustration
              name="cloud-computing.svg"
              alt=""
              className="mx-auto h-72 w-72 md:h-96 md:w-96"
            />
          </Reveal>
        </div>
      </FlowSection>

      {/* Certificate cards */}
      <section className="mx-auto w-full max-w-6xl px-5 py-28 sm:py-36">
        <div className="grid gap-6 md:grid-cols-2">
          {certifications.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.08}>
              <a
                href={c.credentialUrl || c.image}
                target="_blank"
                rel="noreferrer"
                className="card-lift group block h-full overflow-hidden rounded-[28px] bg-alt"
              >
                <div className="aspect-video overflow-hidden p-6">
                  <img
                    src={c.image}
                    alt={`${c.name} certificate`}
                    className="h-full w-full rounded-xl object-contain"
                  />
                </div>
                <div className="px-8 pb-8">
                  <div className="label">{c.issuer}</div>
                  <h3 className="display mt-2 text-2xl">{c.name}</h3>
                  {c.detail && (
                    <p className="mt-2 text-sm text-muted">{c.detail}</p>
                  )}
                  <span className="link-arrow mt-5 text-sm">
                    View certificate <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
