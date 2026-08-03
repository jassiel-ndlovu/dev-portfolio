import { redirect } from "next/navigation";
import { projects } from "@/lib/projects";

// The projects experience always shows a project in the main panel,
// so /projects lands on the first one.
export default function ProjectsIndex() {
  redirect(`/projects/${projects[0].slug}`);
}
