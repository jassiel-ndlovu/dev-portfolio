import type { ProjectStatus } from "./projects";

/** Maps a project's primary language to a fake filename + a file-icon color. */
export function fileMeta(language: string): { ext: string; color: string } {
  switch (language) {
    case "TypeScript":
      return { ext: "tsx", color: "#519aba" };
    case "Python":
      return { ext: "py", color: "#ffca28" };
    case "C#":
      return { ext: "cs", color: "#a074c4" };
    case "JavaScript":
      return { ext: "js", color: "#e8d44d" };
    default:
      return { ext: "md", color: "#8a8a8a" };
  }
}

export function fileName(slug: string, language: string): string {
  return `${slug}.${fileMeta(language).ext}`;
}

/** Status colours tuned for the dark workbench. */
export const vscStatus: Record<
  ProjectStatus,
  { label: string; dot: string; text: string; chip: string }
> = {
  completed: {
    label: "Completed",
    dot: "bg-[#34d399]",
    text: "text-[#34d399]",
    chip: "bg-[#059669]/15 text-[#34d399]",
  },
  "in-progress": {
    label: "In progress",
    dot: "bg-yellow",
    text: "text-yellow",
    chip: "bg-yellow/15 text-yellow",
  },
  archived: {
    label: "Archived",
    dot: "bg-vsc-sub",
    text: "text-vsc-sub",
    chip: "bg-white/5 text-vsc-sub",
  },
};

/** Focus the explorer search box (used by the title bar and activity bar). */
export function focusProjectSearch() {
  const el = document.getElementById("project-search") as HTMLInputElement | null;
  if (!el) return;
  el.scrollIntoView({ block: "nearest" });
  el.focus();
  el.select();
}
