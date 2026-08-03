"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { site } from "@/lib/site";
import { Illustration } from "./illustration";
import { Moon, Star } from "lucide-react";

const item = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" as const } },
};
const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};

// The parade of characters along the bottom — edges bleed off, Banjo-style.
// Outer figures are hidden on small screens so mobile shows a clean trio.
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
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-background to-tint-peach/50">
      {/* soft sun + sky */}
      {/* <div className="pointer-events-none absolute -top-24 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-accent/15 blur-2xl" />
      <div className="pointer-events-none absolute right-[12%] top-24 h-24 w-24 rounded-full bg-pop/10 blur-xl" /> */}

      {/* drifting clouds (decor — hidden on small screens) */}
      <Cloud className="hidden left-[6%] top-24 w-28 text-tint-peach/90 sm:block" duration={26} />
      <Cloud className="hidden right-[10%] top-40 w-20 text-tint-peach/80 sm:block" duration={32} delay={4} />
      <Cloud className="hidden left-[22%] top-52 w-16 text-tint-peach/70 sm:block" duration={38} delay={8} />

      {/* floating sparkles (decor — hidden on small screens) */}
      <motion.span
        className="absolute left-[14%] top-40 hidden text-2xl text-accent sm:block"
        animate={{ y: [0, -10, 0], rotate: [0, 15, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <Star className="h-5 w-5 fill-accent" />
      </motion.span>
      <motion.span
        className="absolute right-[18%] top-28 hidden text-xl text-pop sm:block"
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
      >
        <Moon className="h-5 w-5 fill-pop" />
      </motion.span>

      {/* headline */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative mx-auto max-w-3xl px-5 pt-14 text-center sm:pt-24"
      >
        <motion.p
          variants={item}
          className="mb-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-muted shadow-sm"
        >
          <span className="h-2 w-2 rounded-full bg-pop" />
          {site.role} · Open to work
        </motion.p>

        <motion.h1
          variants={item}
          className="display text-[13vw] leading-[0.92] sm:text-7xl md:text-8xl"
        >
          Portfolio
          <br />
          <span className="text-accent">Website</span>
        </motion.h1>

        <motion.p
          variants={item}
          className="mx-auto mt-6 max-w-xl text-lg text-foreground/75"
        >
          I&apos;m {site.name} — a Computer Science graduate who builds compilers,
          platforms, and apps from first principles. Welcome to my corner of the
          sky.
        </motion.p>

        <motion.div
          variants={item}
          className="mt-8 flex flex-wrap justify-center gap-3"
        >
          <Link
            href="/projects"
            className="rounded-full bg-foreground px-7 py-3.5 font-medium text-background shadow-sm transition-transform hover:-translate-y-0.5"
          >
            View my work →
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-border bg-white px-7 py-3.5 font-medium transition-colors hover:bg-foreground/5"
          >
            About me
          </Link>
        </motion.div>
      </motion.div>

      {/* the parade */}
      <div className="relative mt-8 sm:mt-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex items-end justify-center px-2"
        >
          {lineup.map((l) => (
            <motion.div
              key={l.name}
              variants={item}
              className={`${l.box} ${l.hide ? "hidden sm:block" : ""} -mx-2 shrink-0 sm:-mx-5`}
            >
              <Illustration name={l.name} alt="" className="h-full w-full" />
            </motion.div>
          ))}
        </motion.div>
        {/* ground line to seat the characters */}
        <div className="h-px w-full bg-border" />
      </div>
    </section>
  );
}

function Cloud({
  className = "",
  duration = 30,
  delay = 0,
}: {
  className?: string;
  duration?: number;
  delay?: number;
}) {
  return (
    <motion.svg
      viewBox="0 0 100 40"
      className={`pointer-events-none absolute ${className}`}
      initial={{ x: 0 }}
      animate={{ x: [0, 30, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: "easeInOut" }}
      aria-hidden="true"
      fill="currentColor"
    >
      <path d="M20,32 a12,12 0 0 1 2,-23 a16,16 0 0 1 30,-2 a12,12 0 0 1 16,6 a10,10 0 0 1 4,19 z" />
    </motion.svg>
  );
}
