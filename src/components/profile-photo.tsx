/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { site, socials } from "@/lib/site";

const MENU_W = 224;
const MENU_H = 200;

/**
 * My photo, with a custom right-click menu: back home, view the image,
 * LinkedIn and GitHub. "View image" opens it full size in a lightbox.
 */
export function ProfilePhoto({ className = "" }: { className?: string }) {
  const [menu, setMenu] = useState<{ x: number; y: number } | null>(null);
  const [viewing, setViewing] = useState(false);
  const [broken, setBroken] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const linkedin = socials.find((s) => s.label === "LinkedIn")?.href;
  const github = socials.find((s) => s.label === "GitHub")?.href;

  // Close the menu on outside click, Escape, scroll or resize; arrow keys
  // move between items.
  useEffect(() => {
    if (!menu) return;
    const el = menuRef.current;
    const items = () =>
      Array.from(el?.querySelectorAll<HTMLElement>("[role='menuitem']") ?? []);
    items()[0]?.focus();

    const close = () => setMenu(null);
    const onDown = (e: PointerEvent) => {
      if (!el?.contains(e.target as Node)) close();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") return close();
      if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
      e.preventDefault();
      const list = items();
      const i = list.indexOf(document.activeElement as HTMLElement);
      const next = e.key === "ArrowDown" ? i + 1 : i - 1;
      list[(next + list.length) % list.length]?.focus();
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    window.addEventListener("scroll", close, true);
    window.addEventListener("resize", close);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("scroll", close, true);
      window.removeEventListener("resize", close);
    };
  }, [menu]);

  // Escape closes the lightbox.
  useEffect(() => {
    if (!viewing) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setViewing(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [viewing]);

  if (broken) return null;

  const item =
    "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm text-white outline-none transition-colors hover:bg-yellow hover:text-ink focus-visible:bg-yellow focus-visible:text-ink";
  const icon = "w-4 text-center text-[13px]";

  return (
    <>
      <img
        src={site.photo}
        alt={site.name}
        title="Right-click for options"
        className={className}
        onError={() => setBroken(true)}
        onContextMenu={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setMenu({
            x: Math.min(e.clientX, window.innerWidth - MENU_W - 8),
            y: Math.min(e.clientY, window.innerHeight - MENU_H - 8),
          });
        }}
      />

      {menu &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            aria-label="Photo options"
            className="fixed z-[80] rounded-xl border-2 border-ink bg-ink p-1.5 shadow-[4px_4px_0_var(--yellow)]"
            style={{ left: menu.x, top: menu.y, width: MENU_W }}
          >
            <Link href="/" role="menuitem" className={item} onClick={() => setMenu(null)}>
              <i className={`fa-solid fa-house ${icon}`} aria-hidden="true" />
              Return to home
            </Link>
            <button
              type="button"
              role="menuitem"
              className={item}
              onClick={() => {
                setMenu(null);
                setViewing(true);
              }}
            >
              <i className={`fa-regular fa-image ${icon}`} aria-hidden="true" />
              View image
            </button>
            <div className="my-1 h-px bg-white/10" />
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                role="menuitem"
                className={item}
                onClick={() => setMenu(null)}
              >
                <i className={`fa-brands fa-linkedin-in ${icon}`} aria-hidden="true" />
                Go to LinkedIn
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                role="menuitem"
                className={item}
                onClick={() => setMenu(null)}
              >
                <i className={`fa-brands fa-github ${icon}`} aria-hidden="true" />
                Open GitHub
              </a>
            )}
          </div>,
          document.body
        )}

      {viewing &&
        createPortal(
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Photo of ${site.name}`}
            className="fixed inset-0 z-[90] grid place-items-center bg-ink/90 p-6"
            onClick={() => setViewing(false)}
          >
            <figure className="relative" onClick={(e) => e.stopPropagation()}>
              <img
                src={site.photo}
                alt={site.name}
                className="h-auto max-h-[80vh] w-[min(85vw,440px)] rounded-2xl border-4 border-yellow object-contain"
              />
              <figcaption className="display mt-3 text-center text-lg text-white">
                {site.name}
              </figcaption>
              <button
                type="button"
                autoFocus
                onClick={() => setViewing(false)}
                aria-label="Close"
                className="absolute -right-3 -top-3 grid h-9 w-9 place-items-center rounded-full bg-yellow text-ink shadow-md hover:bg-yellow-deep"
              >
                <i className="fa-solid fa-xmark" aria-hidden="true" />
              </button>
            </figure>
          </div>,
          document.body
        )}
    </>
  );
}
