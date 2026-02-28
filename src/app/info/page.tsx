import { sanityFetch } from "../lib/sanityFetch"
import { InfoPageQueryResult, TaglineQueryResult } from "@/sanity/types"
import { infoPageQuery, taglineQuery } from "../lib/queries"
import InfoPageNav from "../components/InfoPageNav";
import Link from "next/link";


export default async function InfoPage({}){
  const infoContent: InfoPageQueryResult = await sanityFetch<InfoPageQueryResult>({
    query: infoPageQuery,
    tags: ['infoPage']
  });

  const tagline: TaglineQueryResult = await sanityFetch<TaglineQueryResult>({
      query: taglineQuery,
      tags: ['tagline']
  });

  const clients = infoContent?.selectClients

  return (
    <>
    <div className="text-center md:pt-0 md:flex md:flex-col md:items-center">
      <InfoPageNav />
      <div className="info flex flex-col items-center w-full mt-40 md:mt-60">
        <div className="px-[34px] md:px-0 md:w-[40vw]">
          <p className="">{tagline?.copy ?? ''}</p>
        </div>
        { clients &&
          <div className="mt-11 md:m-0 md:mt-14">
            Selected clients include {clients.map((client, idx) => (
              <span key={idx}>{client}{idx === clients.length - 1 ? '.' : ','}</span>
            ))}
          </div>
        }
        <div className="mt-11 md:m-0 md:mt-14">
            For all inquiries: <a href="mailto:info@saritaposada.com" target="_blank">info@saritaposada.com</a>
        </div>
        <div className="mt-11 md:m-0 md:mt-14">
            &#169; saritaposada
        </div>
      </div>
    </div>
    </>
  )
}