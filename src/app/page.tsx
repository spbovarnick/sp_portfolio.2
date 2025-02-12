import { PortfolioQueryResult } from "@/sanity/types";
import Image from "next/image";
import NameBanner from "../../public/nameBanner";
import { portfolioQuery } from "./lib/queries";
import { sanityFetch } from "./lib/sanityFetch";
import { urlFor } from "@/sanity/lib/image";


export default async function Home() {
  const portfolio: PortfolioQueryResult = await sanityFetch<PortfolioQueryResult>({
    query: portfolioQuery,
    tags: ["portfolio"]
  })

  console.log(portfolio[0].photos)

  return (
    <div className="">
      <NameBanner />
      <p className="">hello</p>
      { portfolio[0].photos?.map((pic) => {

        return (

          <Image
            key={pic.asset?.assetId}
            src={urlFor(pic).width(800)
              .height(300)
              .quality(80)
              .auto("format")
              .url()}
            width={500}
            height={500}
            alt="Interior photo"
          />
        )
      })}
    </div>
  );
}
