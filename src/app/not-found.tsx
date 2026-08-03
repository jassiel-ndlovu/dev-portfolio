import Link from "next/link";
import { Illustration } from "@/components/illustration";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-2xl flex-1 flex-col items-center justify-center px-5 py-20 text-center">
      <div className="h-64 w-64">
        <Illustration name="401-Error-Unauthorized.svg" alt="Page not found" />
      </div>
      <h1 className="display mt-6 text-4xl sm:text-5xl">Lost in the sunset</h1>
      <p className="mt-3 max-w-md text-muted">
        That page doesn&apos;t exist — or wandered off. Let&apos;s get you back
        to familiar ground.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-accent px-6 py-3 font-medium text-dark transition-transform hover:-translate-y-0.5"
      >
        ← Back home
      </Link>
    </div>
  );
}
