import { SinglePortfolioProject } from "../lib/types";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import Link from "next/link";


interface RowProps {
  project: SinglePortfolioProject,
  isLast: boolean,
  addToScroll: () => void,
  index: number,
}

const Row: React.FC<RowProps> = ({
  project,
  isLast,
  addToScroll,
  index,
}) => {
  const rowRef = useRef(null);

  useEffect(() => {
    if (!rowRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        addToScroll();
        observer.unobserve(entry.target);
      }
    }, { threshold: .6 });

    observer.observe(rowRef.current);

    return () => observer.disconnect();
  },[isLast, addToScroll])

  return (
    <div
      className="row grid grid-cols-1 gap-0 md:grid-cols-2 relative h-screen relative"
      ref={rowRef}
      style={{ opacity: index === 0 ? 1 : 0}}
    >
      <div className={`left-img relative h-full ${!project.photos?.[1] ? 'md:col-span-2' : ''}`}>
        {project.photos && project.photos[0] &&
          <Image
              src={urlFor(project.photos[0])
                .width(1000)
                .dpr(2)
                .quality(75)
                .url()
              }
              placeholder="blur"
              fill
              sizes="(max-width: 768px) 100vw, (min-width: 769px) 150vw"
              alt={`Photo of ${project.projectName}`}
              blurDataURL={project.photos[0].asset?.metadata?.lqip}
              quality={100}
              className="object-cover "
            />
          }
      </div>
      <div className="right-img hidden md:block relative h-full">
        {project.photos && project.photos[1] &&
          <Image
            src={urlFor(project.photos[1])
              .width(1000)
              .dpr(2)
              .quality(75)
              .url()
            }
            placeholder="blur"
            fill
            sizes="(max-width: 768px) 100vw, (min-width: 769px) 150vw"
            alt={`Photo of ${project.projectName}`}
            blurDataURL={project.photos[1].asset?.metadata?.lqip}
            quality={100}
            className="object-cover "
          />
        }
      </div>
      <div className="info-text text-white uppercase absolute w-full bottom-7 left-0 text-center leading-6">
        <div>{project.projectName}{project.projectLocation && `, ${project.projectLocation}`}</div>
        {project.projectName &&
          <Link href={`/${encodeURIComponent(project.projectName)}`}>MORE INFO</Link>
        }
      </div>
    </div>
  )
}

export default Row;