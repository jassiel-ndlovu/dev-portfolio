/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { site, certifications } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { Band } from "@/components/band";
import { PageIntro } from "@/components/page-intro";

export const metadata: Metadata = {
  title: `Certifications | ${site.name}`,
  description: `Professional certifications held by ${site.name}.`,
};

export default function CertificationsPage() {
  return (
    <div>
      <PageIntro
        title="Certifications"
        tone="yellow"
        figure="peeps/standing-26"
        fill="#ffffff"
        shape="#ff7a59"
      >
        Credentials and professional memberships. More to come as I study
        data science and cloud.
      </PageIntro>

      <Band tone="paper">
        <div className="mx-auto w-full max-w-5xl px-5 py-16 sm:py-20">
          <div className="grid gap-5 md:grid-cols-2">
            {certifications.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.06}>
                <a
                  href={c.credentialUrl || c.image}
                  target="_blank"
                  rel="noreferrer"
                  className="card-lift group flex h-full flex-col overflow-hidden rounded-2xl border-2 border-ink bg-surface"
                >
                  <div className="aspect-video overflow-hidden border-b-2 border-ink bg-alt p-5">
                    <img
                      src={c.image}
                      alt={`${c.name} certificate`}
                      className="h-full w-full object-contain"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="label">{c.issuer}</div>
                    <h3 className="display mt-1.5 text-2xl">{c.name}</h3>
                    {c.detail && <p className="mt-2 text-sm text-muted">{c.detail}</p>}
                    <span className="mt-auto pt-5">
                      <span className="link-arrow text-sm">
                        View certificate <span aria-hidden="true">↗</span>
                      </span>
                    </span>
                  </div>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </Band>
    </div>
  );
}
