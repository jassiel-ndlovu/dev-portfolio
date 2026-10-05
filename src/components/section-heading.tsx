import { Reveal } from "./reveal";

/**
 * Section header: a direct serif title with a short, plain subtitle.
 * Centered by default.
 */
export function SectionHeading({
  title,
  subtitle,
  align = "center",
  as = "h2",
  className = "",
}: {
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
      <Tag
        className={`display ${
          as === "h1"
            ? "text-5xl sm:text-6xl md:text-7xl"
            : "text-4xl sm:text-5xl md:text-[3.5rem]"
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
