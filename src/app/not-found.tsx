import Link from "next/link";
import { Figure, Shape } from "@/components/figure";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-5 py-16 text-center">
      <div className="relative flex h-64 w-64 items-end justify-center">
        <Shape kind="blob" color="#ffc845" className="absolute inset-0 h-full w-full" />
        <Figure name="transhumans/astro-introspective-sad" fill="#ffffff" className="relative h-60" />
      </div>
      <h1 className="display mt-8 text-4xl sm:text-5xl">Page not found</h1>
      <p className="mt-3 max-w-md text-lg text-muted">
        This page doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-7 rounded-full bg-ink px-6 py-3 font-semibold text-white transition-colors hover:bg-black"
      >
        Back to home
      </Link>
    </div>
  );
}
