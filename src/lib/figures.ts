/**
 * Black-and-white figure illustrations (Open Peeps and Transhumans by
 * Pablo Stanley, both CC0). Each has a full file and a `lines/` copy with
 * the white fill removed, so <Figure> can paint any fill colour behind
 * the ink. Generated from the files in public/illustrations.
 */
export const figures = {
  "peeps/sitting-1": { ext: "svg", w: 346, h: 510 },
  "peeps/sitting-11": { ext: "svg", w: 335, h: 495 },
  "peeps/sitting-12": { ext: "svg", w: 336, h: 504 },
  "peeps/sitting-14": { ext: "svg", w: 462, h: 603 },
  "peeps/sitting-17": { ext: "svg", w: 365, h: 576 },
  "peeps/sitting-18": { ext: "svg", w: 346, h: 501 },
  "peeps/sitting-2": { ext: "svg", w: 346, h: 521 },
  "peeps/sitting-4": { ext: "svg", w: 340, h: 465 },
  "peeps/sitting-9": { ext: "svg", w: 324, h: 467 },
  "peeps/standing-1": { ext: "svg", w: 213, h: 715 },
  "peeps/standing-10": { ext: "svg", w: 255, h: 688 },
  "peeps/standing-13": { ext: "svg", w: 256, h: 679 },
  "peeps/standing-16": { ext: "svg", w: 309, h: 652 },
  "peeps/standing-18": { ext: "svg", w: 249, h: 680 },
  "peeps/standing-22": { ext: "svg", w: 321, h: 691 },
  "peeps/standing-23": { ext: "svg", w: 321, h: 699 },
  "peeps/standing-24": { ext: "svg", w: 321, h: 692 },
  "peeps/standing-25": { ext: "svg", w: 246, h: 713 },
  "peeps/standing-26": { ext: "svg", w: 246, h: 677 },
  "peeps/standing-4": { ext: "svg", w: 304, h: 681 },
  "peeps/standing-5": { ext: "svg", w: 304, h: 680 },
  "peeps/standing-7": { ext: "svg", w: 249, h: 686 },
  "transhumans/astro-introspective-sad": { ext: "png", w: 318, h: 400 },
  "transhumans/chaos-good-dance": { ext: "png", w: 354, h: 400 },
  "transhumans/chill-sitting": { ext: "png", w: 400, h: 349 },
  "transhumans/coffee-run": { ext: "png", w: 336, h: 400 },
  "transhumans/cool-good": { ext: "png", w: 170, h: 400 },
  "transhumans/cool-model-stand": { ext: "png", w: 124, h: 400 },
  "transhumans/dominance-walk-measured": { ext: "png", w: 251, h: 400 },
  "transhumans/entertainment-music-walk": { ext: "png", w: 258, h: 400 },
  "transhumans/growth-study": { ext: "png", w: 381, h: 400 },
  "transhumans/life-walk": { ext: "png", w: 234, h: 400 },
  "transhumans/looking-sitting-introspective": { ext: "png", w: 308, h: 400 },
  "transhumans/perserverance-dedication-focus": { ext: "png", w: 274, h: 400 },
  "transhumans/reflecting-sitted": { ext: "png", w: 400, h: 382 },
  "transhumans/sad-comfort-company": { ext: "png", w: 300, h: 400 },
  "transhumans/school-run-innocent": { ext: "png", w: 267, h: 400 },
  "transhumans/shopping-walk-good": { ext: "png", w: 235, h: 400 },
  "transhumans/solo-tango-goofy": { ext: "png", w: 280, h: 400 },
  "transhumans/stop-check-caution": { ext: "png", w: 243, h: 400 },
  "transhumans/team-cooperation": { ext: "png", w: 400, h: 315 },
  "transhumans/young-love-affection": { ext: "png", w: 280, h: 400 },
} as const;

export type FigureName = keyof typeof figures;
