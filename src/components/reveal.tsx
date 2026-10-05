"use client";

import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

/**
 * Fades and lifts its children into view once, using GSAP ScrollTrigger.
 * Inside the projects workbench the editor pane scrolls on its own, so the
 * nearest `[data-scroller]` that actually scrolls is used as the scroller.
 */
export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        gsap.set(el, { opacity: 1, y: 0 });
        return;
      }

      const host = el.closest<HTMLElement>("[data-scroller]");
      const scrolls =
        host && /(auto|scroll)/.test(getComputedStyle(host).overflowY);

      gsap.fromTo(
        el,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            scroller: scrolls ? host : undefined,
            start: "top 90%",
            once: true,
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className} data-reveal style={{ opacity: 0 }}>
      {children}
    </div>
  );
}
