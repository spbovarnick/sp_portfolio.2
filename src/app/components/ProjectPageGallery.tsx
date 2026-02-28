import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { ImageGroup } from "./ProjectPage";

interface GalleryProps {
  groups: ImageGroup[];
  projectName: string | null;
  firstRowHeight: string;
}

export default function ProjectPageGallery({groups, projectName, firstRowHeight}: GalleryProps) {


  return (
    <div className="relative h-full w-full">
      {groups.map((group, groupIdx) => {

        const rowHeight = groupIdx === 0 ? firstRowHeight : "100vh";

        return group.type === "full" ? (
          <div
            key={groupIdx}
            className="relative w-full row"
            style={{ height: rowHeight, opacity: groupIdx === 0 ? 1 : 0 }}
          >
            <div className="relative w-full h-full">
              <Image
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
              />
            </div>
          </div>
        ) : (
          <div
            key={groupIdx}
            className={`row w-full flex flex-col sm:flex-row ${group.images.length === 2 ? "flex-flex-col sm:flex-row" : "block"}`}
              style={{ height: rowHeight, opacity: groupIdx === 0 ? 1 : 0 }}
          >
            {group.images.map((img, idx) => (
              <div
                key={idx}
                className="relative w-full h-full overflow-hidden sm:flex-1"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={urlFor(img)
                      .width(1000)
                      .dpr(2)
                      .quality(75)
                      .url()
                    }
                    placeholder="blur"
                    fill
                    sizes="(max-width: 768px) 100vw, (min-width: 769px) 150vw"
                    alt={`Photo of ${projectName ?? "project"}`}
                    blurDataURL={img.asset?.metadata?.lqip}
                    quality={100}
                    className="object-cover"
                    priority={groupIdx === 0}
                  />
                </div>
              </div>
            ))}
          </div>
        )
      }
      )}
    </div>
  )
}