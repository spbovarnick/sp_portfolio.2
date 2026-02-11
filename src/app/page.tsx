import { PortfolioQueryResult } from "@/sanity/types";
import { shuffle } from "./lib/util";
import { portfolioQuery } from "./lib/queries";
import { sanityFetch } from "./lib/sanityFetch";
import Homepage from "./components/Homepage";

export const revalidate = 0;

const portfolio: PortfolioQueryResult = await sanityFetch<PortfolioQueryResult>({
  query: portfolioQuery,
  tags: ["portfolio"]
})

export default async function Home() {

  const shuffledPortfolio = shuffle(portfolio)


  return (
    <Homepage portfolio={shuffledPortfolio} />
  );
}
