import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { ImageGroup } from "./ProjectPage";

interface GalleryProps {
  groups: ImageGroup[];
  projectName: string | null;
  isMobile: boolean
}

export default function ProjectPageGallery({groups, projectName, isMobile}: GalleryProps) {


  return (
    <div
      className="relative h-full w-full"
    >
      {groups.map((group, groupIdx) => {

        const isFirst = groupIdx === 0;

        // full row, one img per row
        if (group.type === "full") {
          return (
            <div
              key={groupIdx}
              className="relative w-full row h-screen"
              style={{
                opacity: isFirst ? 1 : 0,
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
                  sizes="100vw"
                  alt={`Photo of ${projectName ?? "project"}`}
                  blurDataURL={group.images[0].asset?.metadata?.lqip}
                  quality={75}
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
                  className={`row w-full flex flex-col sm:flex-row md:hidden h-screen`}
                  style={{ opacity: groupIdx === 0 ? 1 : 0 }}

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
                        sizes="100vw"
                        alt={`Photo of ${projectName ?? "project"}`}
                        blurDataURL={img.asset?.metadata?.lqip}
                        quality={75}
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
              className="row w-full flex-row md:flex h-screen"
              style={{ opacity: groupIdx === 0 ? 1 : 0 }}
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
                      sizes="(max-width: 768px) 100vw, 50vw"
                      alt={`Photo of ${projectName ?? "project"}`}
                      blurDataURL={img.asset?.metadata?.lqip}
                      quality={75}
                      className="object-cover"
                      priority={groupIdx === 0}
                    />}
                  </div>
                </div>
              ))}
            </div>
          )
        }
      })}
    </div>
  );
}