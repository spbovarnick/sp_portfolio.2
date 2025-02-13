import { PortfolioQueryResult } from "@/sanity/types";
import NameBanner from "../../public/nameBanner";
import { portfolioQuery } from "./lib/queries";
import { sanityFetch } from "./lib/sanityFetch";
import ProjectCarousel from "./components/ProjectCarousel";


export default async function Home() {
  const portfolio: PortfolioQueryResult = await sanityFetch<PortfolioQueryResult>({
    query: portfolioQuery,
    tags: ["portfolio"]
  })

  return (
    <div className="columns-1">
      <NameBanner />
      <ProjectCarousel portfolio={portfolio} />
    </div>
  );
}
