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
    <div className="pb-16">
      {/* Header — soft gold panel */}
      <section className="relative overflow-hidden bg-tint-gold">
        <div className="pointer-events-none absolute -left-16 -top-16 h-64 w-64 rounded-full bg-pop/12" />
        <div className="pointer-events-none absolute bottom-8 right-10 h-10 w-10 rotate-12 rounded-lg bg-accent/20" />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-8 px-5 py-16 md:grid-cols-[1.25fr_1fr]">
          <Reveal>
            <div>
              <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-surface-2 px-3 py-1 text-sm font-medium text-muted">
                <span className="h-2 w-2 rounded-full bg-pop" /> Certifications
              </p>
              <h1 className="display text-5xl sm:text-6xl md:text-7xl">
                Verified in
                <br />
                <span className="text-accent">the cloud.</span>
              </h1>
              <p className="mt-5 max-w-xl text-lg text-foreground/80">
                Credentials that back up the hands-on work — with more on the
                way as I deepen my data science and cloud skills.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mx-auto h-72 w-72 md:h-80 md:w-80">
              <Illustration name="cloud-computing.svg" alt="Cloud computing" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Certificate cards */}
      <section className="mx-auto w-full max-w-6xl px-5 py-14">
        <div className="grid gap-6 md:grid-cols-2">
          {certifications.map((c, i) => (
            <Reveal key={c.name} delay={i * 0.08}>
              <div className="overflow-hidden rounded-2xl border border-border bg-surface">
                <a
                  href={c.credentialUrl || c.image}
                  target="_blank"
                  rel="noreferrer"
                  className="group block"
                >
                  <div className="aspect-video overflow-hidden border-b border-border bg-white">
                    <img
                      src={c.image}
                      alt={`${c.name} certificate`}
                      className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="flex items-center justify-between gap-4 p-5">
                    <div>
                      <h3 className="font-display text-lg font-bold leading-tight">
                        {c.name}
                      </h3>
                      <div className="text-sm text-accent-deep">{c.issuer}</div>
                    </div>
                    <span className="shrink-0 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted transition-colors group-hover:border-accent group-hover:text-accent-deep">
                      View ↗
                    </span>
                  </div>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
