import { ProjectQueryResult } from "@/sanity/types";
import { sanityFetch } from "../lib/sanityFetch";
import { allProjectSlugsQuery, projectQuery } from "../lib/queries";
import ProjectPage from "../components/ProjectPage";
import { client } from "@/sanity/lib/client";

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(allProjectSlugsQuery);
  return slugs.map(({ slug }) => ({ slug }));
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params;

  const project: ProjectQueryResult = slug ? await sanityFetch<ProjectQueryResult>({
    query: projectQuery,
    qParams: { slug: decodeURIComponent(slug) },
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