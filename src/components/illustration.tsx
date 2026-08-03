/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";

/**
 * Renders a Storyset illustration from /public/illustrations/<name>.
 * Download "cuate" style SVGs from https://storyset.com/cuate, recolor to the
 * site palette if you like, drop them in public/illustrations, and reference
 * the filename via a project's `illustration` field.
 *
 * A friendly placeholder shows until the real asset exists.
 */
export function Illustration({
  name,
  alt,
  className = "",
  float = true,
}: {
  name: string;
  alt: string;
  className?: string;
  float?: boolean;
}) {
  return (
    <motion.div
      className={className}
      animate={float ? { y: [0, -10, 0] } : undefined}
      transition={
        float
          ? { duration: 5, repeat: Infinity, ease: "easeInOut" as const }
          : undefined
      }
    >
      <img
        src={`/illustrations/${name}`}
        alt={alt}
        className="h-full w-full object-contain"
        onError={(e) => {
          // Fall back to the generic placeholder if the asset is missing.
          const el = e.currentTarget;
          if (!el.dataset.fallback) {
            el.dataset.fallback = "1";
            el.src = "/illustrations/placeholder.svg";
          }
        }}
      />
    </motion.div>
  );
}
