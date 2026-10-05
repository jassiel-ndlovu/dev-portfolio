import Link from "next/link";
import { Illustration } from "@/components/illustration";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-5 py-24 text-center">
      <Illustration name="404-Error.svg" alt="" className="h-64 w-64" />
      <h1 className="display mt-8 text-4xl sm:text-5xl">Page not found</h1>
      <p className="mt-3 max-w-md text-lg text-muted">
        This page doesn&apos;t exist or has moved.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-accent-hover"
      >
        Back to home
      </Link>
    </div>
  );
}
