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

  return (
    <>
    <div className="text-center md:pt-0 md:flex md:flex-col md:items-center">
      <div className="px-[16px] pt-[16px] md:px-6 md:pt-6 md:w-[50vw] md:min-w-[50vw]">
        <NameBanner />
      </div>
      <div className="px-[34px] mt-[6.32vh] md:px-0 md:w-[70.52%] md:pt-12">
        <p className="uppercase">{tagline?.copy ?? ''}</p><br/>
        <p>{infoContent?.bioBlurb ?? ''}</p>
      </div>
      { infoContent?.portrait &&
      <div className="relative w-full h-[44.75vh] md:hidden">
        <Image
          className="w-full mt-[19px] h-full mb-4"
          src={urlFor(infoContent?.portrait)
            .width(1242)
            .dpr(2)
            .quality(90)
            // .height(800)
            .url()
          }
          loading="lazy"
          placeholder="blur"
          fill
          sizes="(max-width: 768px) 100vw, (max-width 1920px) 50vw"
          objectFit="cover"
          blurDataURL={infoContent?.portrait.asset?.metadata?.lqip}
          alt={'Portrait of Sarita Posada'}
        />
      </div>
      }
      <div className="uppercase px-[60px] mb-[42px] md:px-0 md:w-[70.52%] md:mt-[5vh] md:h-fit md:mb-[5vh]">
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
      <div className="mb-[21px] md:m-0  uppercase">
        PRESS CONTACT: <br />
        { infoContent?.pressContact &&
          <a href={`mailto:${infoContent?.pressContact}`} target="_blank">{infoContent?.pressContact}</a>}
      </div>
      {infoContent?.portrait?.credit &&
        <div className="uppercase hidden md:block md:absolute md:bottom-0">
          { infoContent?.portrait?.creditUrl ?
            <a href={infoContent?.portrait?.creditUrl} target="_blank">PORTRAIT BY: {infoContent?.portrait?.credit}</a> :
            <div>PORTRAIT BY: {infoContent?.portrait?.credit}</div>
          }
        </div>
      }
    </div>
    {infoContent?.portrait &&
      <div className="relative hidden md:h-screen w-full md:order-last md:block md:col-start-2 md:w-[50vw]">
        <Image
          className="w-full h-full mb-4 md:mb-0"
          src={urlFor(infoContent?.portrait)
            .width(900)
            .height(900)
            .url()
          }
          loading="lazy"
          placeholder="blur"
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