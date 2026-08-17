/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { site, certifications } from "@/lib/site";
import { Reveal } from "@/components/reveal";
import { Illustration } from "@/components/illustration";

export const metadata: Metadata = {
  title: `Certifications — ${site.name}`,
  description: `Professional certifications held by ${site.name}.`,
};

export default function CertificationsPage() {
  return (
    <div>
      {/* Header */}
      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-20 sm:py-28 md:grid-cols-[1.2fr_1fr]">
        <Reveal>
          <div>
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent-deep">
              Certifications
            </p>
            <h1 className="display text-5xl tracking-tight sm:text-6xl md:text-7xl">
              Verified in
              <br />
              <span className="text-accent">the cloud.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted sm:text-xl">
              Credentials and memberships that back up the hands-on work — with
              more on the way as I deepen my data-science and cloud skills.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mx-auto h-72 w-72 md:h-80 md:w-80">
            <Illustration name="cloud-computing.svg" alt="Cloud computing" />
          </div>
        </Reveal>
      </section>

      {/* Certificate cards */}
      <section className="mx-auto w-full max-w-6xl px-5 pb-24">
        <div className="grid gap-6 md:grid-cols-2">
          {certifications.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.08}>
              <a
                href={c.credentialUrl || c.image}
                target="_blank"
                rel="noreferrer"
                className="group block overflow-hidden rounded-3xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-24px_rgba(0,0,0,0.25)]"
              >
                <div className="aspect-video overflow-hidden border-b border-border bg-alt">
                  <img
                    src={c.image}
                    alt={`${c.name} certificate`}
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex items-start justify-between gap-4 p-6">
                  <div>
                    <h3 className="font-display text-lg font-bold tracking-tight">
                      {c.name}
                    </h3>
                    <div className="text-sm text-accent-deep">{c.issuer}</div>
                    {c.detail && (
                      <p className="mt-1.5 text-[13px] text-muted">{c.detail}</p>
                    )}
                  </div>
                  <span className="shrink-0 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors group-hover:border-accent group-hover:text-accent-deep">
                    View ↗
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
