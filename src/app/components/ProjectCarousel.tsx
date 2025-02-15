"use client"

import { PortfolioQueryResult } from "@/sanity/types"
import { useEffect, useState,} from "react";
import MobileSwiper from "./MobileSwiper";
import useCarousel from "./useCarouselHook";
import { AllImageArray } from "../lib/types";

interface ProjectCarouselProps {
  portfolio: PortfolioQueryResult;
}

interface PhotoCred {
  photogName?: string;
  photogUrl?: string;
  _key: string;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ portfolio }) => {
  const {
    projectImgIndex,
    // state,
    projectIndex,
    projectImageCount,
    next,
    prev,
  } = useCarousel(portfolio);
  const [allImgs, setAllImgs] = useState<Array<AllImageArray>>([]);

  useEffect(() => {
    if (portfolio.length > 0) {
      const photoSet = portfolio.reduce<AllImageArray[]>((acc, proj) => {
        if (proj.photos) {
          return [...acc, ...(proj.photos)]
        }
        return acc
      }, [])
      setAllImgs(photoSet)
    }
  }, [portfolio]);

  const prependZero = (input: number) => {
    if (input < 10 ) {
      return '0' + input
    }
    return input
  };

  const photoCredits = (creditList: PhotoCred[]) => {
    return (
      <div>
        PHOTOS BY {
          creditList.map((cred, i) => {
            return (
              cred.photogUrl ? (<span key={cred._key}>{i > 0 && <span> & </span>}<a className="folioPicCred" href={cred.photogUrl}>{cred.photogName}</a></span>) : (<span key={cred._key}>{i > 0 && <span> & </span>}<span className="folioPicCred" key={cred._key}>{cred.photogName}</span></span>)
            )
          })
        }
      </div>
    )
  }

  return (
    <div className="mt-[62px]">
      <div className="uppercase text-center">
        <div className="mb-[17px]">
          {portfolio && `${prependZero(projectImgIndex + 1)}/${projectImageCount && prependZero(projectImageCount)}`}
        </div>
        <div>
          {portfolio[projectIndex]?.projectLocation}
        </div>
        {
        portfolio[projectIndex]?.photoCredit && photoCredits(portfolio[projectIndex]?.photoCredit)
        }
      </div>
      <div className="">
        {allImgs &&
          <MobileSwiper
            project={portfolio[projectIndex]?.projectName}
            allImages={allImgs}
            next={next}
            prev={prev}
          />
        }
      </div>
    </div>
  )
}

export default ProjectCarousel