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

  // const staticTagline = "Sarita Posada Interiors is a design studio that creates high-end, brand-specific worlds for retail, hospitality, and residential projects."

  return (
    // <div className="md:columns-2 md:gap-0">
    <>
      {/* <div className="px-[16px] pt-[16px] md:px-6 md:pt-6 md:w-[50vw] md:min-w-[50vw]">
        <NameBanner />
      </div> */}
      {portfolio && <ProjectCarousel portfolio={portfolio} tagline={tagline} />}
      {/* <div className="w-full flex justify-center mb-5">
        <div className="max-w-[70vw] text-center uppercase">
          {tagline?.copy ?? staticTagline}
        </div>
      </div> */}
    {/* </div> */}
    </>
  );
}
