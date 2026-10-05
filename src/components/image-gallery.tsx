/* eslint-disable @next/next/no-img-element */
"use client";

import { useState } from "react";
import type { ProjectImage } from "@/lib/projects";

export function ImageGallery({ images }: { images: ProjectImage[] }) {
  const [active, setActive] = useState<ProjectImage | null>(null);

  if (images.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-vsc-border p-8 text-center text-sm text-vsc-sub">
        No screenshots yet. Add images to this project&apos;s{" "}
        <code>images</code> array (place files in <code>/public</code>).
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {images.map((img) => (
          <button
            key={img.src}
            onClick={() => setActive(img)}
            className="group aspect-video overflow-hidden rounded-md border border-vsc-border bg-vsc-panel"
          >
            <img
              src={img.src}
              alt={img.alt}
              className="h-full w-full object-cover transition-transform group-hover:scale-105"
            />
          </button>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-[60] grid place-items-center bg-black/70 p-6"
          onClick={() => setActive(null)}
        >
          <img
            src={active.src}
            alt={active.alt}
            className="max-h-[85vh] max-w-full rounded-xl"
          />
        </div>
      )}
    </>
  );
}
