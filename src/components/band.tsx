import { Shape } from "./figure";

export type BandTone = "paper" | "alt" | "white" | "ink" | "yellow" | "green";

const tones: Record<BandTone, { cls: string; a: string; b: string }> = {
  paper: { cls: "bg-background text-foreground", a: "#ffc845", b: "#ff7a59" },
  alt: { cls: "bg-alt text-foreground", a: "#ffc845", b: "#ff7a59" },
  white: { cls: "bg-surface text-foreground", a: "#ffc845", b: "#ffb8c6" },
  ink: { cls: "bg-ink text-white", a: "#ffc845", b: "#ffb8c6" },
  yellow: { cls: "bg-yellow text-ink", a: "#151515", b: "#ffffff" },
  green: { cls: "bg-green text-white", a: "#ffc845", b: "#ffb8c6" },
};

/** Text colour for secondary copy on each band. */
export const bandMuted: Record<BandTone, string> = {
  paper: "text-muted",
  alt: "text-muted",
  white: "text-muted",
  ink: "text-white/70",
  yellow: "text-ink/75",
  green: "text-white/75",
};

/**
 * A full-width, solid colour section. `decor` scatters a few static
 * sparkles near the edges so bold sections feel lively, not loud.
 */
export function Band({
  tone = "paper",
  decor = false,
  className = "",
  children,
  id,
}: {
  tone?: BandTone;
  decor?: boolean;
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  const t = tones[tone];
  return (
    <section id={id} className={`relative isolate overflow-hidden ${t.cls} ${className}`}>
      {decor && (
        <div aria-hidden="true" className="absolute inset-0 -z-10 hidden sm:block">
          <Shape kind="sparkle" color={t.a} className="absolute left-[6%] top-10 h-6 w-6" />
          <Shape kind="sparkle" color={t.b} className="absolute left-[11%] top-24 h-3.5 w-3.5" />
          <Shape kind="sparkle" color={t.b} className="absolute right-[8%] top-14 h-5 w-5" />
          <Shape kind="dots" color={t.a} className="absolute bottom-10 right-[5%] h-6 w-10 opacity-60" />
          <Shape kind="squiggle" color={t.b} className="absolute bottom-12 left-[4%] h-4 w-20" />
        </div>
      )}
      {children}
    </section>
  );
}
