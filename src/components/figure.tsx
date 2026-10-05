/* eslint-disable @next/next/no-img-element */
import { figures, type FigureName } from "@/lib/figures";

/**
 * A black-ink figure with a colour fill painted behind the lines.
 * The full file is used as a mask for the fill; the `lines/` copy sits on
 * top. Size it with a height class; width follows the figure's ratio.
 */
export function Figure({
  name,
  fill = "#ffffff",
  alt = "",
  flip = false,
  className = "",
}: {
  name: FigureName;
  fill?: string;
  alt?: string;
  flip?: boolean;
  className?: string;
}) {
  const f = figures[name];
  const full = `/illustrations/${name}.${f.ext}`;
  const lines = full.replace(/^(\/illustrations\/[^/]+)\//, "$1/lines/");
  const mask = {
    WebkitMaskImage: `url("${full}")`,
    maskImage: `url("${full}")`,
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center bottom",
    maskPosition: "center bottom",
  } as const;

  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{
        aspectRatio: `${f.w} / ${f.h}`,
        transform: flip ? "scaleX(-1)" : undefined,
      }}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0"
        style={{ backgroundColor: fill, ...mask }}
      />
      <img
        src={lines}
        alt={alt}
        draggable={false}
        className="relative h-full w-full object-contain object-bottom"
      />
    </div>
  );
}

/** Simple bold shapes to set figures and sections on. Static. */
export function Shape({
  kind,
  color,
  className = "",
}: {
  kind: "circle" | "arch" | "blob" | "sparkle" | "squiggle" | "dots";
  color: string;
  className?: string;
}) {
  const cls = `pointer-events-none ${className}`;
  switch (kind) {
    case "circle":
      return (
        <span
          aria-hidden="true"
          className={`block rounded-full ${cls}`}
          style={{ backgroundColor: color }}
        />
      );
    case "arch":
      return (
        <span
          aria-hidden="true"
          className={`block rounded-t-full ${cls}`}
          style={{ backgroundColor: color }}
        />
      );
    case "blob":
      return (
        <svg aria-hidden="true" viewBox="0 0 200 200" className={cls}>
          <path
            fill={color}
            d="M45.7,-58.9C58.3,-47.2,67.1,-31.9,71.6,-14.8C76.1,2.3,76.3,21.2,68.1,35.6C59.9,50,43.3,59.9,25.7,66.4C8.1,72.9,-10.5,76,-27.4,70.6C-44.3,65.2,-59.5,51.3,-67.9,34.2C-76.3,17.1,-77.9,-3.2,-71.4,-20.3C-64.9,-37.4,-50.3,-51.3,-34.5,-62.4C-18.7,-73.5,-1.7,-81.8,14.4,-79.4C30.5,-77,33.1,-70.6,45.7,-58.9Z"
            transform="translate(100 100)"
          />
        </svg>
      );
    case "sparkle":
      return (
        <svg aria-hidden="true" viewBox="0 0 24 24" className={cls}>
          <path
            fill={color}
            d="M12 0c.6 6.1 2.9 9.4 12 12-9.1 2.6-11.4 5.9-12 12-.6-6.1-2.9-9.4-12-12 9.1-2.6 11.4-5.9 12-12z"
          />
        </svg>
      );
    case "squiggle":
      return (
        <svg aria-hidden="true" viewBox="0 0 120 24" className={cls}>
          <path
            d="M2 12c9-10 18-10 27 0s18 10 27 0 18-10 27 0 18 10 27 0 9-5 8-5"
            fill="none"
            stroke={color}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </svg>
      );
    case "dots":
      return (
        <svg aria-hidden="true" viewBox="0 0 60 36" className={cls}>
          {[0, 1, 2].map((r) =>
            [0, 1, 2, 3, 4].map((c) => (
              <circle key={`${r}-${c}`} cx={6 + c * 12} cy={6 + r * 12} r="2.6" fill={color} />
            ))
          )}
        </svg>
      );
  }
}
