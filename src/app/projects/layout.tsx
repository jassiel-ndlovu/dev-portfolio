import { ProjectSidebar } from "@/components/project-sidebar";

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 md:px-5">
      <div className="grid gap-6 md:grid-cols-[300px_1fr]">
        {/* Left panel — sticky on desktop, contains list + prev/next */}
        <aside className="md:sticky md:top-20 md:h-[calc(100vh-6rem)]">
          <ProjectSidebar />
        </aside>

        {/* Main panel */}
        <div className="min-w-0">{children}</div>
      </div>
    </div>
  );
}
