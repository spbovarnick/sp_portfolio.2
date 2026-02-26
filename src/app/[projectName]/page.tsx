import { ProjectQueryResult } from "@/sanity/types";
import { sanityFetch } from "../lib/sanityFetch";
import { projectQuery } from "../lib/queries";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ projectName: string}>
}) {
  const { projectName } = await params;
  const project: ProjectQueryResult  = projectName && await sanityFetch<ProjectQueryResult>({
    query: projectQuery,
    qParams: { projectName: decodeURIComponent(projectName) },
    tags: ["portfolio"]
  })

  console.log(project?.projectName)


  return (
    <div>{project?.projectName}</div>
  )
}