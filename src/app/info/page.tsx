import { sanityFetch } from "../lib/sanityFetch"
import { InfoPageQueryResult, TaglineQueryResult } from "@/sanity/types"
import { infoPageQuery, taglineQuery } from "../lib/queries"
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
      <div className="flex flex-col uppercase min-h-screen md:grid md:grid-cols-2">
        <div className="w-full md:h-screen h-[60vh]">
          {infoContent?.portrait &&
              <Image
                className="object-cover w-full h-full"
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
                quality={80}
                alt={'Portrait of Sarita Posada'}
                blurDataURL={infoContent?.portrait.asset?.metadata?.lqip}
              />
            }
        </div>
        <div className="w-full flex-1 md:h-screen flex flex-col justify-center items-center">
          {tagline?.copy &&
            <div id="tagline" className="px-[34px] md:px-0 md:w-[40vw]">
              <PortableText value={tagline.copy} />
            </div>
          }
          <div className="mt-4">
              INQUIRIES: <a href="mailto:info@saritaposada.com" target="_blank" className="underline">office@saritaposada.com</a>
          </div>
          <div className="">
              PRESS: <a href="mailto:OLIVIA@OLIVIALUGARINI.COM" target="_blank" className="underline">OLIVIA@OLIVIALUGARINI.COM</a>
          </div>
          <div className="mt-4">
              &#169; saritaposada
          </div>
        </div>
      </div>
    </>
  )
}