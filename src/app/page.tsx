import { PortfolioQueryResult, TaglineQueryResult } from "@/sanity/types";
import { portfolioQuery, taglineQuery } from "./lib/queries";
import { sanityFetch } from "./lib/sanityFetch";
import ProjectCarousel from "./components/ProjectCarousel";
// import NameBanner from "../../public/nameBanner";


export default async function Home() {
  const portfolio: PortfolioQueryResult = await sanityFetch<PortfolioQueryResult>({
    query: portfolioQuery,
    tags: ["portfolio"]
  })

  const tagline: TaglineQueryResult = await sanityFetch<TaglineQueryResult>({
    query: taglineQuery,
    tags: ['tagline']
  })

  return (
    <>
      {portfolio && <ProjectCarousel portfolio={portfolio} tagline={tagline} />}
    </>
  );
}
