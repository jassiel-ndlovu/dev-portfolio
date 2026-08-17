/* eslint-disable @next/next/no-img-element */
"use client";

/**
 * Small avatar image with a graceful fallback (hides itself if the file is
 * missing). Client component because it uses an onError handler.
 */
export function Avatar({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        e.currentTarget.style.display = "none";
      }}
    />
  );
}
