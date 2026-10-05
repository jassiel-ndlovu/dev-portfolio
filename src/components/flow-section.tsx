import { useId } from "react";

export type FlowTone = "blue" | "sky" | "green";

const tones: Record<
  FlowTone,
  { bg: string; a: string; b: string; wash: string }
> = {
  blue: { bg: "#f5f9ff", a: "#0071e3", b: "#0284c7", wash: "#dbeafe" },
  sky: { bg: "#f2f9fd", a: "#0284c7", b: "#059669", wash: "#e0f2fe" },
  green: { bg: "#f3fbf8", a: "#059669", b: "#0284c7", wash: "#d1fae5" },
};

/**
 * Static, decorative backdrop: a pale wash with flowing contour lines and a
 * soft wave along the bottom. Purely SVG, no animation.
 */
export function FlowArt({
  tone = "blue",
  flip = false,
  className = "",
}: {
  tone?: FlowTone;
  flip?: boolean;
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const t = tones[tone];
  const lines = Array.from({ length: 9 }, (_, i) => i);

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
      style={flip ? { transform: "scaleX(-1)" } : undefined}
    >
      <defs>
        <linearGradient id={`${id}-line`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor={t.a} stopOpacity="0" />
          <stop offset="0.35" stopColor={t.a} stopOpacity="0.55" />
          <stop offset="0.75" stopColor={t.b} stopOpacity="0.45" />
          <stop offset="1" stopColor={t.b} stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`${id}-glow`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor={t.wash} stopOpacity="0.9" />
          <stop offset="1" stopColor={t.wash} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${id}-wave`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor={t.wash} stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0.4" />
        </linearGradient>
      </defs>

      <rect width="1440" height="900" fill={t.bg} />
      <circle cx="1180" cy="160" r="420" fill={`url(#${id}-glow)`} />
      <circle cx="160" cy="760" r="360" fill={`url(#${id}-glow)`} />

      {/* contour ribbon */}
      <g fill="none" stroke={`url(#${id}-line)`} strokeWidth="1.25">
        {lines.map((i) => (
          <path
            key={i}
            d={`M-80 ${520 + i * 16} C 280 ${380 + i * 10}, 560 ${
              720 - i * 6
            }, 920 ${560 + i * 12} S 1360 ${330 + i * 14}, 1540 ${
              420 + i * 12
            }`}
            opacity={1 - i * 0.08}
          />
        ))}
      </g>

      {/* soft bottom wave */}
      <path
        d="M0 900 L0 760 C 300 700, 560 860, 900 790 C 1140 740, 1300 700, 1440 730 L1440 900 Z"
        fill={`url(#${id}-wave)`}
      />
    </svg>
  );
}

/** A full-width section sitting on a FlowArt backdrop. */
export function FlowSection({
  tone = "blue",
  flip = false,
  className = "",
  children,
}: {
  tone?: FlowTone;
  flip?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section className={`relative isolate overflow-hidden ${className}`}>
      <FlowArt tone={tone} flip={flip} className="-z-10" />
      {children}
    </section>
  );
}
