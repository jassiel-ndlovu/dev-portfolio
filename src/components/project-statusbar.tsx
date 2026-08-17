"use client";

import { usePathname } from "next/navigation";
import { getProject, statusMeta } from "@/lib/projects";

export function ProjectStatusBar() {
  const pathname = usePathname();
  const slug = pathname.split("/")[2] ?? "";
  const project = getProject(slug);
  if (!project) return null;

  const status = statusMeta[project.status ?? "completed"];
  const paper = project.links?.find((l) => /pdf|paper|report/i.test(l.label));

  return (
    <div className="mono flex items-center justify-between gap-3 overflow-x-auto whitespace-nowrap bg-accent px-3 py-1 text-[11px] text-dark">
      {/* Left cluster */}
      <div className="flex items-center gap-3">
        <span className="flex items-center gap-1.5" title="Status">
          <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </span>
        <span className="hidden items-center gap-1.5 sm:flex" title="Branch">
          <i className="fa-solid fa-code-branch" aria-hidden="true" /> main
        </span>
        <span className="flex items-center gap-1.5" title="Primary language">
          <i className="fa-solid fa-code" aria-hidden="true" /> {project.language}
        </span>
      </div>

      {/* Right cluster — links & meta */}
      <div className="flex items-center gap-3">
        <span className="hidden items-center gap-1.5 sm:flex" title="Tech stack">
          <i className="fa-solid fa-layer-group" aria-hidden="true" />
          {project.tech.length} techs
        </span>

        {project.demoUrl && (
          <a
            href={project.demoUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:underline"
          >
            <i className="fa-solid fa-arrow-up-right-from-square" aria-hidden="true" />
            Live
          </a>
        )}

        {paper && (
          <a
            href={paper.url}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 hover:underline"
          >
            <i className="fa-solid fa-file-pdf" aria-hidden="true" /> Paper
          </a>
        )}

        {project.isPrivate ? (
          <span className="flex items-center gap-1.5" title="Private repository">
            <i className="fa-solid fa-lock" aria-hidden="true" /> Private
          </span>
        ) : (
          project.github && (
            <a
              href={`https://github.com/${project.github}`}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 hover:underline"
            >
              <i className="fa-brands fa-github" aria-hidden="true" /> Repo
            </a>
          )
        )}
      </div>
    </div>
  );
}
