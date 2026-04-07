import { portfolioQuery } from "../lib/queries"
import { PortfolioQueryResult } from "@/sanity/types"
import { sanityFetch } from "../lib/sanityFetch"
import PortfolioGrid from "../components/PortfolioGrid";

const portfolio: PortfolioQueryResult = await sanityFetch<PortfolioQueryResult>({
  query: portfolioQuery,
  tags: ["portfolio"],
});

export default async function Project() {

  return (
    <>
      <PortfolioGrid portfolio={portfolio} />
    </>
  )
}