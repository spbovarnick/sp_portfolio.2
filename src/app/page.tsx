import { LandingPortfolioQueryResult } from "@/sanity/types";
import { shufflePhotos } from "./lib/util";
import { landingPortfolioQuery } from "./lib/queries";
import { sanityFetch } from "./lib/sanityFetch";
import Homepage from "./components/Homepage";

export const revalidate = 0;

const portfolio: LandingPortfolioQueryResult = await sanityFetch<LandingPortfolioQueryResult>({
  query: landingPortfolioQuery,
  tags: ["portfolio"]
})

export default async function Home() {

  const orderedPortfolio = shufflePhotos(portfolio)


  return (
    <Homepage portfolio={orderedPortfolio} />
  );
}
