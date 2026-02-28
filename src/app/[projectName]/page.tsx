import { ProjectQueryResult } from "@/sanity/types";
import { sanityFetch } from "../lib/sanityFetch";
import { projectQuery } from "../lib/queries";
import ProjectPage from "../components/ProjectPage";

export default async function Page({
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
    <>
      <ProjectPage
        project={project}
      />
    </>
  )
}