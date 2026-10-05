import type { FigureName } from "@/lib/figures";
import { Band, type BandTone, bandMuted } from "./band";
import { Figure, Shape } from "./figure";
import { Reveal } from "./reveal";

/**
 * Opening block for inner pages: title and a short intro on the left,
 * a figure on a bold shape on the right.
 */
export function PageIntro({
  title,
  children,
  figure,
  fill = "#ffffff",
  shape = "#ffc845",
  tone = "paper",
  lead,
}: {
  title: string;
  children: React.ReactNode;
  figure: FigureName;
  fill?: string;
  shape?: string;
  tone?: BandTone;
  lead?: React.ReactNode;
}) {
  return (
    <Band tone={tone}>
      <div className="mx-auto grid w-full max-w-5xl items-center gap-8 px-5 py-14 sm:py-16 md:grid-cols-[1.25fr_1fr]">
        <Reveal>
          {lead}
          <h1 className="display text-5xl sm:text-6xl md:text-7xl">{title}</h1>
          <p className={`mt-5 max-w-xl text-lg sm:text-xl ${bandMuted[tone]}`}>
            {children}
          </p>
        </Reveal>
        <Reveal delay={0.08}>
          <div className="relative mx-auto flex h-64 w-64 items-end justify-center sm:h-72 sm:w-72">
            <Shape kind="blob" color={shape} className="absolute inset-0 h-full w-full" />
            <Shape kind="sparkle" color={tone === "yellow" ? "#151515" : "#ffc845"} className="absolute -left-2 top-4 h-7 w-7" />
            <Shape kind="sparkle" color="#ff7a59" className="absolute right-2 top-0 h-4 w-4" />
            <Figure name={figure} fill={fill} className="relative h-[92%]" />
          </div>
        </Reveal>
      </div>
    </Band>
  );
}
