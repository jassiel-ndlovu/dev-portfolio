import Link from "next/link";

/** Sticky editor header: one open tab plus a breadcrumb trail. */
export function EditorHeader({
  tab,
  icon,
  iconColor,
  crumbs,
}: {
  tab: string;
  icon: string;
  iconColor?: string;
  crumbs: { label: string; href?: string }[];
}) {
  return (
    <div className="sticky top-14 z-20 md:top-0">
      <div className="flex h-9 items-stretch border-b border-vsc-border bg-vsc-panel">
        <div className="mono relative flex items-center gap-2 border-r border-vsc-border bg-vsc-bg px-3 text-[12.5px] text-white">
          <span className="absolute inset-x-0 top-0 h-0.5 bg-yellow" />
          <i
            className={`${icon} text-[11px]`}
            style={iconColor ? { color: iconColor } : undefined}
            aria-hidden="true"
          />
          <span className="max-w-[55vw] truncate">{tab}</span>
          <i className="fa-solid fa-xmark ml-2 text-[10px] text-vsc-sub" aria-hidden="true" />
        </div>
        <div className="ml-auto hidden items-center gap-3 px-3 text-[11px] text-vsc-sub sm:flex" aria-hidden="true">
          <i className="fa-solid fa-table-columns" />
          <i className="fa-solid fa-ellipsis" />
        </div>
      </div>
      <nav
        aria-label="Breadcrumb"
        className="mono flex h-6 items-center gap-1.5 overflow-hidden whitespace-nowrap border-b border-vsc-border/60 bg-vsc-bg px-4 text-[11.5px] text-vsc-sub"
      >
        {crumbs.map((c, i) => (
          <span key={i} className="flex items-center gap-1.5">
            {i > 0 && (
              <i className="fa-solid fa-chevron-right text-[8px] opacity-60" aria-hidden="true" />
            )}
            {c.href ? (
              <Link href={c.href} className="hover:text-vsc-text">
                {c.label}
              </Link>
            ) : (
              <span className={i === crumbs.length - 1 ? "text-vsc-text" : ""}>
                {c.label}
              </span>
            )}
          </span>
        ))}
      </nav>
    </div>
  );
}

/** A code block with a line-number gutter. Each entry is one line. */
export function CodeLines({ lines }: { lines: React.ReactNode[] }) {
  return (
    <div className="mono overflow-hidden rounded-md border border-vsc-border bg-[#181818] text-[12.5px] leading-[1.7]">
      <ol className="py-3">
        {lines.map((line, i) => (
          <li key={i} className="grid grid-cols-[3rem_1fr] hover:bg-white/[0.03]">
            <span className="select-none pr-4 text-right text-vsc-dim/70">
              {i + 1}
            </span>
            <span className="min-w-0 whitespace-pre-wrap break-words pr-4">
              {line}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

/** Markdown-preview style section heading with a dim "##". */
export function MdHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-4 mt-12 flex items-baseline gap-2 border-b border-vsc-border pb-2 text-xl font-semibold text-white">
      <span className="mono text-sm font-normal text-vsc-dim" aria-hidden="true">
        ##
      </span>
      {children}
    </h2>
  );
}

/* Syntax tokens */
export const K = ({ children }: { children: React.ReactNode }) => (
  <span className="text-vsc-keyword">{children}</span>
);
export const V = ({ children }: { children: React.ReactNode }) => (
  <span className="text-vsc-var">{children}</span>
);
export const S = ({ children }: { children: React.ReactNode }) => (
  <span className="text-vsc-string">&quot;{children}&quot;</span>
);
export const C = ({ children }: { children: React.ReactNode }) => (
  <span className="text-vsc-comment">{children}</span>
);
export const P = ({ children }: { children: React.ReactNode }) => (
  <span className="text-vsc-sub">{children}</span>
);
