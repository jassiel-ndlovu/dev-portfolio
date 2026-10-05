/* eslint-disable @next/next/no-img-element */
"use client";

/**
 * Renders a Storyset illustration from /public/illustrations/<name>.
 * The SVGs are recoloured to the site palette (blue, green, neutral ink).
 * A placeholder shows if the asset is missing.
 */
export function Illustration({
  name,
  alt,
  className = "",
}: {
  name: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={className}>
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
    </div>
  );
}
