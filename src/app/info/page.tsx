import { sanityFetch } from "../lib/sanityFetch"
import { InfoPageQueryResult, TaglineQueryResult } from "@/sanity/types"
import { infoPageQuery, taglineQuery } from "../lib/queries"
import InfoPageNav from "../components/InfoPageNav";
import { PortableText } from "@portabletext/react";
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

  return (
    <>
    <div className="text-center md:pt-0 flex flex-col items-center uppercase">
      <InfoPageNav />
      <div className="info flex flex-col items-center content-center w-[80vw] md:w-[40vw] mt-10 md:mt-20">
        {infoContent?.portrait &&
            <Image
              className="object-cover mb-8"
              src={urlFor(infoContent?.portrait)
                .width(1000)
                .height(666)
                .dpr(3)
                .quality(80)
                .url()
              }
              width={1000}
              height={666}
              placeholder="blur"
              sizes="(max-width: 768px) 100vw, 50vw"
              quality={100}
              alt={'Portrait of Sarita Posada'}
              blurDataURL={infoContent?.portrait.asset?.metadata?.lqip}
            />
          }
        {tagline?.copy &&
          <div className="px-[34px] md:px-0 md:w-[40vw]">
            <PortableText value={tagline.copy} />
          </div>
        }
        <div className="mt-4">
            For all inquiries: <a href="mailto:info@saritaposada.com" target="_blank" className="underline">office@saritaposada.com</a>
        </div>
        <div className="mt-4">
            &#169; saritaposada
        </div>
      </div>
    </div>
    </>
  )
}