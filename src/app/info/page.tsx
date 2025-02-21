import { sanityFetch } from "../lib/sanityFetch"
import { InfoPageQueryResult, TaglineQueryResult } from "@/sanity/types"
import { infoPageQuery, taglineQuery } from "../lib/queries"
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import NameBanner from "../../../public/nameBanner";


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
    <>
    <div className="text-center md:pt-0 flex flex-col items-center flex-wrap">
      <div className="px-[16px] pt-[16px] md:px-6 md:pt-6 md:w-[50vw] md:min-w-[50vw]">
        <NameBanner />
      </div>
      <div className="px-[34px] md:px-0 md:w-[70.52%]">
        <p className="uppercase">{tagline?.copy ?? ''}</p><br/>
        <p>{infoContent?.bioBlurb ?? ''}</p>
      </div>
      { infoContent?.portrait &&
      <div className="relative md:h-screen w-full md:order-last md:hidden">
        <Image
          className="w-full mt-[19px] h-full mb-4 md:mb-0"
          src={urlFor(infoContent?.portrait)
            .width(800)
            .height(800)
            .url()
          }
          loading="lazy"
          placeholder="blur"
          // width={800}
          // height={800}
          fill
          sizes="(max-width: 768px) 100vw, (max-width 1920px) 50vw"
          objectFit="cover"
          blurDataURL={infoContent?.portrait.asset?.metadata?.lqip}
          alt={'Portrait of Sarita Posada'}
        />
      </div>
      }
      <div className="px-[60px] mb-[42px] md:px-0 md:w-[70.52%] md:mt-[5vh] md:min-h-[40vh] uppercase">
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
      <div className="mb-[21px] md:mt-[5vh]  uppercase">
        PRESS CONTACT: <br />
        { infoContent?.pressContact &&
          <a href={`mailto:${infoContent?.pressContact}`} target="_blank">{infoContent?.pressContact}</a>}
      </div>
    </div>
    {infoContent?.portrait &&
      <div className="relative md:h-screen w-full md:order-last md:block">
        <Image
          className="w-full mt-[19px] h-full mb-4 md:mb-0"
          src={urlFor(infoContent?.portrait)
            .width(800)
            .height(800)
            .url()
          }
          loading="lazy"
          placeholder="blur"
          // width={800}
          // height={800}
          fill
          sizes="(max-width: 768px) 100vw, (max-width 1920px) 50vw"
          objectFit="cover"
          blurDataURL={infoContent?.portrait.asset?.metadata?.lqip}
          alt={'Portrait of Sarita Posada'}
        />
      </div>
    }
    </>
  )
}