import { Reveal } from "./reveal";

/**
 * Apple-style section header: small accent eyebrow, large tight headline,
 * roomy muted subtitle. Centered by default.
 */
export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "center",
  as = "h2",
  className = "",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  align?: "center" | "left";
  as?: "h1" | "h2";
  className?: string;
}) {
  const Tag = as;
  return (
    <Reveal
      className={`${
        align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"
      } ${className}`}
    >
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent-deep">
          {eyebrow}
        </p>
      )}
      <Tag
        className={`display tracking-tight ${
          as === "h1"
            ? "text-5xl sm:text-6xl md:text-7xl"
            : "text-4xl sm:text-5xl"
        }`}
      >
        {title}
      </Tag>
      {subtitle && (
        <p className="mt-4 text-lg text-muted sm:text-xl">{subtitle}</p>
      )}
    </Reveal>
  );
}
