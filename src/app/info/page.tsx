import { sanityFetch } from "../lib/sanityFetch"
import { InfoPageQueryResult, TaglineQueryResult } from "@/sanity/types"
import { infoPageQuery, taglineQuery } from "../lib/queries"
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";


export default async function InfoPage({}){
  const infoContent: InfoPageQueryResult = await sanityFetch<InfoPageQueryResult>({
    query: infoPageQuery,
    tags: ['infoPage']
  });
  const tagline: TaglineQueryResult = await sanityFetch<TaglineQueryResult>({
      query: taglineQuery,
      tags: ['tagline']
  });


  console.log(infoContent?.pressContact)
  return (
    <div className="text-center pt-[62px]">
      <div className="px-[34px]">
        <p className="uppercase">{tagline?.copy ?? ''}</p><br/>
        <p>{infoContent?.bioBlurb ?? ''}</p>
      </div>
      { infoContent?.portrait &&
        <Image
          className="w-full mt-[19px] mb-4"
          src={urlFor(infoContent?.portrait)
            .width(800)
            .height(800)
            .url()
          }
          width={800}
          height={800}
          alt={'Portrait of Sarita Posada'}
        />
      }
      <div className="px-[60px] mb-[42px] uppercase">
        <p className="italic">PREVIOUS PROJECTS INCLUDE:</p><br/>
        <ul>
          {infoContent?.previousProjects &&
            infoContent?.previousProjects.map((proj) =>
              <li key={proj._key}>
                {proj?.projectName}, {proj?.projectCity} {proj?.studio && (` /  ${proj.studio}`)}
              </li>
            )
          }
        </ul>
      </div>
      <div className="mb-[21px] uppercase">
        PRESS CONTACT: <br />
        { infoContent?.pressContact &&
          <a href={`mailto:${infoContent?.pressContact}`} target="_blank">{infoContent?.pressContact}</a>}
      </div>
    </div>
  )
}