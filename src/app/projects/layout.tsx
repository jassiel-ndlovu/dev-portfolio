import { ProjectSidebar } from "@/components/project-sidebar";
import { ProjectStatusBar } from "@/components/project-statusbar";
import {
  TitleBar,
  ActivityBar,
  EditorPane,
} from "@/components/workbench-chrome";

/**
 * The projects section is the one dark page: a VS Code-style window with a
 * title bar, activity bar, explorer, editor and status bar.
 */
export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 bg-[#111111] text-vsc-text md:px-5 md:py-5">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col bg-vsc-bg md:overflow-hidden md:h-[calc(100dvh-5.5rem)] md:rounded-xl md:border md:border-vsc-border md:shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
        <TitleBar />

        <div className="flex min-h-0 flex-1 flex-col md:flex-row">
          <ActivityBar />

          <aside className="min-w-0 shrink-0 border-b border-vsc-border bg-vsc-panel md:w-[280px] md:border-b-0 md:border-r lg:w-[300px]">
            <ProjectSidebar />
          </aside>

          <EditorPane>{children}</EditorPane>
        </div>

        {/* Status bar: pinned to the bottom of the window */}
        <div className="sticky bottom-0 z-30 md:static">
          <ProjectStatusBar />
        </div>
      </div>
    </div>
  );
}
