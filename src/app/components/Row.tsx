import { SinglePortfolioProject } from "../lib/types";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { urlFor } from "@/sanity/lib/image";


interface RowProps {
  project: SinglePortfolioProject,
  isLast: boolean,
  addToScroll: () => void,
}

const Row: React.FC<RowProps> = ({
  project,
  isLast,
  addToScroll,
}) => {
  const rowRef = useRef(null);

  useEffect(() => {
    if (!rowRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        addToScroll();
        observer.unobserve(entry.target);
      }
    })

    observer.observe(rowRef.current)
  },[isLast])

  return (
    <div
      className="grid grid-cols-1 grid-rows-1 gap-0 relative min-h-screen"
      ref={rowRef}
    >
      <div className="left-img relative">
       {project.photos &&
          <Image
              src={urlFor(project.photos[0])
                .width(1000)
                .dpr(2)
                .quality(75)
                .url()
              }
              placeholder="blur"
              fill
              sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw"
              alt={`Photo of ${project.projectName}`}
              blurDataURL={project.photos[0].asset?.metadata?.lqip}
              quality={100}
              className="object-cover "
            />
          }
      </div>
      <div className="right-img hidden md:block">
        {project.photos &&
          <Image
            src={urlFor(project.photos[0])
              .width(1000)
              .dpr(2)
              .quality(75)
              .url()
            }
            placeholder="blur"
            fill
            sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw"
            alt={`Photo of ${project.projectName}`}
            blurDataURL={project.photos[0].asset?.metadata?.lqip}
            quality={100}
            className="object-cover "
          />
        }
      </div>
      <div className="info-text">

      </div>
    </div>
  )
}

export default Row;