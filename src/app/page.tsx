import { PortfolioQueryResult, TaglineQueryResult } from "@/sanity/types";
import { portfolioQuery, taglineQuery } from "./lib/queries";
import { sanityFetch } from "./lib/sanityFetch";
import ProjectCarousel from "./components/ProjectCarousel";


export default async function Home() {
  const portfolio: PortfolioQueryResult = await sanityFetch<PortfolioQueryResult>({
    query: portfolioQuery,
    tags: ["portfolio"]
  })

  const tagline: TaglineQueryResult = await sanityFetch<TaglineQueryResult>({
    query: taglineQuery,
    tags: ['tagline']
  })

  const staticTagline = "Sarita Posada Interiors is a design studio that creates high-end, brand-specific worlds for retail, hospitality, and residential projects."

  return (
    <div className="columns-1">
      {portfolio && <ProjectCarousel portfolio={portfolio} />}
      <div className="w-full flex justify-center mb-5">
        <div className="max-w-[70vw] text-center uppercase">
          {tagline?.copy ?? staticTagline}
        </div>
      </div>
    </div>
  );
}
