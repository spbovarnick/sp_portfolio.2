import { PortfolioQueryResult } from "@/sanity/types";
import { portfolioQuery } from "./lib/queries";
import { sanityFetch } from "./lib/sanityFetch";
import ProjectCarousel from "./components/ProjectCarousel";
// import NameBanner from "../../public/nameBanner";

export const revalidate = 0;

export default async function Home() {
  const portfolio: PortfolioQueryResult = await sanityFetch<PortfolioQueryResult>({
    query: portfolioQuery,
    tags: ["portfolio"]
  })

  const shuffle = (array: PortfolioQueryResult) => {
    const len = array.length;
    const shuffle = array.slice();
    for (let i = len - 1; i > 0; i -= 1){
      const rando = Math.floor(Math.random() * (i + 1));
      const current = shuffle[i];
      shuffle[i] = shuffle[rando];
      shuffle[rando] = current
    };
    return shuffle;
  }

  const shuffledPortfolio = shuffle(portfolio)


  return (
    <>
      {portfolio && <ProjectCarousel portfolio={shuffledPortfolio} />}
    </>
  );
}
