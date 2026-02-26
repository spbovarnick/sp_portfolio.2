import { ProjectQueryResult } from "@/sanity/types";
import { sanityFetch } from "../lib/sanityFetch";
import { projectQuery } from "../lib/queries";
import ProjectPageNav from "../components/ProjectPageNav";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectName: string}>
}) {
  const { projectName } = await params;

  const project: ProjectQueryResult  = projectName ? await sanityFetch<ProjectQueryResult>({
    query: projectQuery,
    qParams: { projectName: decodeURIComponent(projectName) },
    tags: ["portfolio"]
  }) : null;


  return (
    <div>
      <ProjectPageNav
        projectName={project?.projectName ?? ""}
        location={project?.projectLocation ?? ""}
        projectType={project?.projectType ?? null}
        photoCredit={project?.photoCredit ?? null}
      />
    </div>
  )
}