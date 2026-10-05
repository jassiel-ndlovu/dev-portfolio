"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { site } from "@/lib/site";
import type { FigureName } from "@/lib/figures";
import { Figure, Shape } from "./figure";

gsap.registerPlugin(useGSAP);

// The crowd along the bottom of the hero. `from` sets the breakpoint where a
// figure appears, so the group grows with the screen and bleeds off the
// edges on wide displays. Mobile keeps a tidy group of five.
const show = {
  all: "",
  md: "hidden md:block",
  lg: "hidden lg:block",
  xl: "hidden xl:block",
} as const;

const crowd: {
  name: FigureName;
  fill: string;
  h: string;
  from: keyof typeof show;
  flip?: boolean;
}[] = [
  { name: "peeps/sitting-18", fill: "#ff7a59", h: "h-56", from: "xl" },
  { name: "peeps/standing-1", fill: "#ffb8c6", h: "h-80", from: "xl" },
  { name: "peeps/sitting-14", fill: "#ffb8c6", h: "h-44 lg:h-56", from: "md" },
  { name: "peeps/standing-22", fill: "#ffffff", h: "h-64 lg:h-80", from: "md" },
  { name: "peeps/standing-24", fill: "#a7d3f5", h: "h-[19rem]", from: "lg" },
  { name: "peeps/standing-25", fill: "#ff7a59", h: "h-52 sm:h-64 lg:h-80", from: "all" },
  { name: "peeps/standing-13", fill: "#ffffff", h: "h-56 sm:h-72 lg:h-[22rem]", from: "all" },
  { name: "peeps/sitting-1", fill: "#cdbdf3", h: "h-36 sm:h-44 lg:h-52", from: "all" },
  { name: "peeps/standing-16", fill: "#a7d3f5", h: "h-52 sm:h-64 lg:h-80", from: "all", flip: true },
  { name: "peeps/standing-5", fill: "#ffffff", h: "h-52 sm:h-64 lg:h-80", from: "all" },
  { name: "peeps/standing-7", fill: "#ff7a59", h: "h-[19rem]", from: "lg", flip: true },
  { name: "peeps/standing-23", fill: "#cdbdf3", h: "h-64 lg:h-80", from: "md", flip: true },
  { name: "peeps/sitting-17", fill: "#ffffff", h: "h-44 lg:h-56", from: "md", flip: true },
  { name: "peeps/standing-4", fill: "#a7d3f5", h: "h-80", from: "xl" },
];

export function Hero() {
  const root = useRef<HTMLElement>(null);

  // One-off load sequence: copy rises in, the block grows, the crowd follows.
  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set("[data-hero]", { opacity: 1, y: 0, scaleY: 1 });
        return;
      }
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .fromTo(
          "[data-hero='copy']",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.08 }
        )
        .fromTo(
          "[data-hero='block']",
          { opacity: 0, scaleY: 0.4, transformOrigin: "bottom" },
          { opacity: 1, scaleY: 1, duration: 0.7 },
          "-=0.4"
        )
        .fromTo(
          "[data-hero='figure']",
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.06 },
          "-=0.45"
        );
    },
    { scope: root }
  );

  return (
    <section ref={root} className="relative isolate overflow-hidden bg-ink text-white">
      {/* scattered decor */}
      <div aria-hidden="true" className="absolute inset-0 -z-10 hidden sm:block">
        <Shape kind="sparkle" color="#ffc845" className="absolute left-[9%] top-16 h-7 w-7" />
        <Shape kind="sparkle" color="#ffb8c6" className="absolute left-[16%] top-36 h-4 w-4" />
        <Shape kind="sparkle" color="#ffc845" className="absolute right-[12%] top-24 h-5 w-5" />
        <Shape kind="squiggle" color="#ff7a59" className="absolute right-[6%] top-48 h-5 w-24" />
        <Shape kind="dots" color="#ffffff" className="absolute left-[5%] top-56 h-6 w-10 opacity-30" />
        <Shape kind="sparkle" color="#a7d3f5" className="absolute right-[22%] top-12 h-3.5 w-3.5" />
        <Shape kind="circle" color="#ff7a59" className="absolute left-[24%] top-28 h-2.5 w-2.5" />
        <Shape kind="squiggle" color="#ffc845" className="absolute left-[18%] top-[22rem] h-4 w-16" />
      </div>

      {/* Figures framing the headline on wide screens */}
      <div
        data-hero="figure"
        style={{ opacity: 0 }}
        className="pointer-events-none absolute left-[5%] top-24 hidden xl:block"
        aria-hidden="true"
      >
        <div className="relative flex h-64 w-56 items-end justify-center">
          <Shape kind="blob" color="#ff7a59" className="absolute inset-x-0 bottom-0 h-48 w-56" />
          <Figure name="peeps/standing-10" fill="#ffc845" className="relative h-64" />
        </div>
      </div>
      <div
        data-hero="figure"
        style={{ opacity: 0 }}
        className="pointer-events-none absolute right-[5%] top-32 hidden xl:block"
        aria-hidden="true"
      >
        <div className="relative flex h-56 w-56 items-end justify-center">
          <Shape kind="circle" color="#ffc845" className="absolute bottom-0 left-1/2 h-44 w-44 -translate-x-1/2" />
          <Figure name="peeps/sitting-4" fill="#ffb8c6" flip className="relative h-52" />
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-5 pt-16 text-center sm:pt-20">
        <p
          data-hero="copy"
          style={{ opacity: 0 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-white/80"
        >
          <span className="h-2 w-2 rounded-full bg-yellow" />
          {site.role} · Open to work
        </p>

        <h1
          data-hero="copy"
          style={{ opacity: 0 }}
          className="display text-[15vw] leading-[0.95] sm:text-7xl md:text-8xl"
        >
          {site.name.split(" ")[0]}{" "}
          <span className="text-yellow">{site.name.split(" ").slice(1).join(" ")}</span>
        </h1>

        <p
          data-hero="copy"
          style={{ opacity: 0 }}
          className="mx-auto mt-6 max-w-lg text-lg text-white/75 sm:text-xl"
        >
          Computer Science graduate. I build compilers, platforms and apps from
          the ground up.
        </p>

        <div
          data-hero="copy"
          style={{ opacity: 0 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
        >
          <Link
            href="/projects"
            className="rounded-full bg-yellow px-6 py-3 font-semibold text-ink transition-colors hover:bg-yellow-deep"
          >
            View projects
          </Link>
          <Link href="/about" className="link-arrow hover:text-ink">
            About me <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>

      {/* The crowd, standing in front of a yellow block */}
      <div className="relative mt-12 sm:mt-14">
        <div
          data-hero="block"
          style={{ opacity: 0 }}
          className="absolute inset-x-[6%] bottom-0 h-[55%] rounded-t-[2.5rem] bg-yellow sm:inset-x-[12%]"
        />
        <div className="relative flex items-end justify-center">
          {crowd.map((c) => (
            <div
              key={c.name}
              data-hero="figure"
              style={{ opacity: 0 }}
              className={`-mx-3 sm:-mx-4 ${show[c.from]}`}
            >
              <Figure name={c.name} fill={c.fill} flip={c.flip} className={c.h} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
