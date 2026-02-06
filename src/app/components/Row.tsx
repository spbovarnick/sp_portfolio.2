import { SinglePortfolioProject } from "../lib/types";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";
import { ImageObject } from "../lib/types";


interface RowProps {
  project: SinglePortfolioProject
}

const Row: React.FC<RowProps> = ({ project }) => {


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

    const shuffledImgs = imageShuffler(project.photos ?? [])
    console.log(shuffledImgs)

  return (
    <>
      <div className="left-img relative">
        <Image
          src={urlFor(shuffledImgs[1])
            .width(1000)
            .dpr(2)
            .quality(75)
            .url()
          }
          placeholder="blur"
          // loading="lazy"
          // objectFit="cover"
          // layout="fill"
          fill={true}
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
            .quality(100)
            .url()
          }
          placeholder="blur"
          // loading="lazy"
          objectFit="cover"
          sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw"
          alt={`Photo of ${project}`}
          blurDataURL={shuffledImgs[1].asset?.metadata?.lqip}
          layout="fill"
          // synthetic click event handler that maintains native Swiper UI
          // onClick={e => handleSwiperNav(e)}
          quality={100}
        />
      </div>
      <div className="info-text">

      </div>
    </>
  )
}

export default Row;