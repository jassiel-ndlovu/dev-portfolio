"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { site } from "@/lib/site";
import { Illustration } from "./illustration";
import { FlowArt } from "./flow-section";

gsap.registerPlugin(useGSAP);

// Characters along the bottom of the hero. Outer figures are hidden on
// small screens so mobile shows a clean trio.
const lineup = [
  { name: "creative-thinker.svg", box: "h-32 w-32 sm:h-44 sm:w-44", hide: true },
  { name: "curious.svg", box: "h-28 w-28 sm:h-40 sm:w-40", hide: true },
  { name: "developer.svg", box: "h-36 w-36 sm:h-56 sm:w-56", hide: false },
  { name: "launching.svg", box: "h-44 w-44 sm:h-72 sm:w-72", hide: false },
  { name: "problem-solving.svg", box: "h-36 w-36 sm:h-56 sm:w-56", hide: false },
  { name: "robotics.svg", box: "h-28 w-28 sm:h-40 sm:w-40", hide: true },
  { name: "mathematics-tutor.svg", box: "h-32 w-32 sm:h-44 sm:w-44", hide: true },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  // One-off load sequence: copy rises in, then the characters follow.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set("[data-hero]", { opacity: 1, y: 0 });
        return;
      }
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          "[data-hero='copy']",
          { opacity: 0, y: 28 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 }
        )
        .fromTo(
          "[data-hero='figure']",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.07 },
          "-=0.5"
        );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative isolate overflow-hidden">
      <FlowArt tone="blue" className="-z-10" />

      <div className="relative mx-auto max-w-3xl px-5 pt-20 text-center sm:pt-32">
        <p
          data-hero="copy"
          style={{ opacity: 0 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-black/[0.06] bg-white/80 px-4 py-1.5 text-sm text-muted backdrop-blur"
        >
          <span className="h-2 w-2 rounded-full bg-green" />
          {site.role} · Open to work
        </p>

        <h1
          data-hero="copy"
          style={{ opacity: 0 }}
          className="display text-[14vw] leading-[0.95] sm:text-7xl md:text-8xl"
        >
          {site.name.split(" ")[0]}
          <br />
          <span className="text-accent">{site.name.split(" ").slice(1).join(" ")}</span>
        </h1>

        <p
          data-hero="copy"
          style={{ opacity: 0 }}
          className="mx-auto mt-7 max-w-xl text-lg text-muted sm:text-xl"
        >
          Computer Science graduate. I build compilers, platforms and apps from
          the ground up.
        </p>

        <div
          data-hero="copy"
          style={{ opacity: 0 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          <Link
            href="/projects"
            className="rounded-full bg-accent px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-accent-hover"
          >
            View projects
          </Link>
          <Link href="/about" className="link-arrow text-[15px]">
            About me <span aria-hidden="true">›</span>
          </Link>
        </div>
      </div>

      {/* Character lineup */}
      <div className="relative mt-14 sm:mt-16">
        <div className="flex items-end justify-center px-2">
          {lineup.map((l) => (
            <div
              key={l.name}
              data-hero="figure"
              style={{ opacity: 0 }}
              className={`${l.box} ${l.hide ? "hidden sm:block" : ""} -mx-2 shrink-0 sm:-mx-5`}
            >
              <Illustration name={l.name} alt="" className="h-full w-full" />
            </div>
          ))}
        </div>
        <div className="h-px w-full bg-black/[0.08]" />
      </div>
    </section>
  );
}
