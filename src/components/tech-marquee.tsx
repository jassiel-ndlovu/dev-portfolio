import type { Tech } from "@/lib/site";
import { LucideIcon } from "./lucide-icon";

function Chip({ t }: { t: Tech }) {
  return (
    <div className="flex shrink-0 items-center gap-2.5 rounded-full border border-border bg-surface px-4 py-2.5 shadow-sm">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-accent/10 text-accent-deep">
        {t.fa ? (
          <i className={`${t.fa} text-lg`} aria-hidden="true" />
        ) : (
          <LucideIcon name={t.lucide ?? "Code"} size={18} />
        )}
      </span>
      <span className="whitespace-nowrap text-sm font-medium">{t.name}</span>
    </div>
  );
}

export function TechMarquee({
  items,
  direction = "left",
}: {
  items: Tech[];
  direction?: "left" | "right";
}) {
  // Duplicate the list so the -50% translate loops seamlessly.
  const doubled = [...items, ...items];
  return (
    <div className="marquee-track marquee-mask overflow-hidden py-1">
      <div className={`marquee ${direction === "left" ? "marquee-left" : "marquee-right"}`}>
        {doubled.map((t, i) => (
          <Chip key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}
