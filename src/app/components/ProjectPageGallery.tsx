import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { ImageGroup } from "./ProjectPage";

interface GalleryProps {
  groups: ImageGroup[];
  projectName: string | null;
  firstRowHeight: string;
  isMobile: boolean
}

export default function ProjectPageGallery({groups, projectName, firstRowHeight, isMobile}: GalleryProps) {


  return (
    <div
      className="relative h-full w-full"
    >
      {groups.map((group, groupIdx) => {

        const rowHeight = groupIdx === 0 ? firstRowHeight : "100vh";
        const isFirst = groupIdx === 0;

        // full row, one img per row
        if (group.type === "full") {
          return (
            <div
              key={groupIdx}
              className="relative w-full row"
              style={{
                height: rowHeight,
                opacity: isFirst ? 1 : 0,
                marginTop: isFirst ? `calc(100vh - ${firstRowHeight})` : 0,
               }}
            >
              <div className="relative w-full h-full">
                {group.images[0] && <Image
                  src={urlFor(group.images[0])
                    .width(1000)
                    .dpr(2)
                    .quality(75)
                    .url()
                  }
                  placeholder="blur"
                  fill
                  sizes="(max-width: 768px) 100vw, (min-width: 769px) 150vw"
                  alt={`Photo of ${projectName ?? "project"}`}
                  blurDataURL={group.images[0].asset?.metadata?.lqip}
                  quality={100}
                  className="object-cover"
                  priority={groupIdx === 0}
                />}
              </div>
            </div>
          )
        }

        // 2 imgs per group
        if (isMobile) {
          return (
              group.images.map((img, idx) => (
                <div
                  key={`${groupIdx}-${idx}`}
                  className={`row w-full flex flex-col sm:flex-row md:hidden`}
                  style={{ height: rowHeight, opacity: groupIdx === 0 ? 1 : 0 }}

                >
                  <div
                    className="relative w-full h-full overflow-hidden sm:flex-1"
                  >
                    <div className="relative w-full h-full">
                      {img && <Image
                        src={urlFor(img)
                          .width(1000)
                          .dpr(2)
                          .quality(75)
                          .url()
                        }
                        placeholder="blur"
                        fill
                        sizes="125vw"
                        alt={`Photo of ${projectName ?? "project"}`}
                        blurDataURL={img.asset?.metadata?.lqip}
                        quality={100}
                        className="object-cover"
                        priority={groupIdx === 0}
                      />}
                    </div>
                  </div>
                </div>
              ))

          )
        } else {

          return (
            <div
              className="row w-full flex-row md:flex"
              style={{ height: rowHeight, opacity: groupIdx === 0 ? 1 : 0 }}
              data-snap="desktop"
              key={groupIdx}
            >
              {group.images.map((img, idx) => (
                <div
                  key={idx}
                  className="relative w-full h-full overflow-hidden sm:flex-1"
                >
                  <div className="relative w-full h-full">
                    {img && <Image
                      src={urlFor(img)
                        .width(1000)
                        .dpr(2)
                        .quality(75)
                        .url()
                      }
                      placeholder="blur"
                      fill
                      sizes="100vw"
                      alt={`Photo of ${projectName ?? "project"}`}
                      blurDataURL={img.asset?.metadata?.lqip}
                      quality={100}
                      className="object-cover"
                      priority={groupIdx === 0}
                    />}
                  </div>
                </div>
              ))}
            </div>
          )
        }
        // return (

        //   <Fragment key={groupIdx}>
        //     {/* Desktop row: two images per row */}
        //     <div
        //       className={`hidden row w-full flex flex-col sm:flex-row ${group.images.length === 2 ? "flex flex-col" : "block"} md:block`}
        //       style={{ height: rowHeight, opacity: groupIdx === 0 ? 1 : 0 }}
        //       data-snap="desktop"
        //     >
        //       {group.images.map((img, idx) => (
        //         <div
        //           key={idx}
        //           className="relative w-full h-full overflow-hidden sm:flex-1"
        //         >
        //           <div className="relative w-full h-full">
        //             {img && <Image
        //               src={urlFor(img)
        //                 .width(1000)
        //                 .dpr(2)
        //                 .quality(75)
        //                 .url()
        //               }
        //               placeholder="blur"
        //               fill
        //               sizes="100vw"
        //               alt={`Photo of ${projectName ?? "project"}`}
        //               blurDataURL={img.asset?.metadata?.lqip}
        //               quality={100}
        //               className="object-cover"
        //               priority={groupIdx === 0}
        //             />}
        //           </div>
        //         </div>
        //       ))}
        //     </div>

        //     {/* Mobile: one full vh image per row */}
        //     {group.images.map((img, idx) => (
        //       <div
        //         key={`${groupIdx}-${idx}`}
        //         className={`row w-full flex flex-col sm:flex-row md:hidden mobileRow`}
        //         style={{ height: rowHeight, opacity: groupIdx === 0 ? 1 : 0 }}
        //         data-snap="mobile"
        //       >
        //         <div
        //           className="relative w-full h-full overflow-hidden sm:flex-1"
        //         >
        //           <div className="relative w-full h-full">
        //             {img && <Image
        //               src={urlFor(img)
        //                 .width(1000)
        //                 .dpr(2)
        //                 .quality(75)
        //                 .url()
        //               }
        //               placeholder="blur"
        //               fill
        //               sizes="125vw"
        //               alt={`Photo of ${projectName ?? "project"}`}
        //               blurDataURL={img.asset?.metadata?.lqip}
        //               quality={100}
        //               className="object-cover"
        //               priority={groupIdx === 0}
        //             />}
        //           </div>
        //         </div>
        //       </div>
        //     ))}
        //   </Fragment>
        // );
      })}
    </div>
  );
}