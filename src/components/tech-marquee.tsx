import type { Tech } from "@/lib/site";
import { LucideIcon } from "./lucide-icon";

function Chip({ t }: { t: Tech }) {
  return (
    <div className="flex shrink-0 items-center gap-2.5 rounded-full bg-alt py-2 pl-2 pr-5">
      <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-accent">
        {t.fa ? (
          <i className={`${t.fa} text-base`} aria-hidden="true" />
        ) : (
          <LucideIcon name={t.lucide ?? "Code"} size={16} />
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
