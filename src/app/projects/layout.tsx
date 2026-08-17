import { ProjectSidebar } from "@/components/project-sidebar";
import { ProjectStatusBar } from "@/components/project-statusbar";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex-1 bg-vsc-bg text-vsc-text">
      <div className="mx-auto w-full max-w-7xl px-4 pb-16 pt-6 sm:px-6 sm:pt-8">
        <div className="grid gap-6 md:grid-cols-[300px_1fr]">
          {/* Left panel — original design, sticky on desktop */}
          <aside className="min-w-0 md:sticky md:top-20 md:h-[calc(100vh-7rem)]">
            <ProjectSidebar />
          </aside>

          {/* Right (main) editor pane */}
          <div className="min-w-0 overflow-hidden rounded-xl border border-vsc-border bg-vsc-bg">
            {children}
          </div>
        </div>
      </div>

      {/* Bottom status bar — stays visible while browsing a project */}
      <div className="sticky bottom-0 z-30">
        <ProjectStatusBar />
      </div>
    </div>
  );
}
