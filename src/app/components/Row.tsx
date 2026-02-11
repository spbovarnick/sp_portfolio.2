import { SinglePortfolioProject } from "../lib/types";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { urlFor } from "@/sanity/lib/image";


interface RowProps {
  project: SinglePortfolioProject,
  isLast: boolean,
  newLimit: () => void,
}

const imageShuffler = <T,>(array: T[]) => {
  const len = array.length;
  const shuffledImgs = array.slice();
  for (let i = len - 1; i > 0; i -= 1){
    const rando = Math.floor(Math.random() * (i + 1));
    const current = shuffledImgs[i];
    shuffledImgs[i] = shuffledImgs[rando];
    shuffledImgs[rando] = current
  };
  return shuffledImgs;
}

const Row: React.FC<RowProps> = ({
  project,
  isLast,
  newLimit,
}) => {
  const rowRef = useRef(null);

  useEffect(() => {
    if (!rowRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (isLast && entry.isIntersecting) {
        newLimit();
        observer.unobserve(entry.target);
      }
    })

    observer.observe(rowRef.current)
  },[isLast])



  const shuffledImgs = imageShuffler(project.photos ?? [])

  return (
    <div
      className="grid grid-cols-1 grid-rows-1 gap-0 relative min-h-screen"
      ref={rowRef}
    >
      <div className="left-img relative">
        <Image
          src={urlFor(shuffledImgs[1])
            .width(1000)
            .dpr(2)
            .quality(75)
            .url()
          }
          placeholder="blur"
          fill
          sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw"
          alt={`Photo of ${project.projectName}`}
          blurDataURL={shuffledImgs[1].asset?.metadata?.lqip}
          quality={100}
          className="object-cover "
        />
      </div>
      <div className="right-img hidden md:block">
        <Image
          src={urlFor(shuffledImgs[1])
            .width(1000)
            .dpr(2)
            .quality(75)
            .url()
          }
          placeholder="blur"
          fill
          sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw"
          alt={`Photo of ${project.projectName}`}
          blurDataURL={shuffledImgs[1].asset?.metadata?.lqip}
          quality={100}
          className="object-cover "
        />
      </div>
      <div className="info-text">

      </div>
    </div>
  )
}

export default Row;