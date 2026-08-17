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
