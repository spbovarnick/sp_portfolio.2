"use client"

import { PortfolioQueryResult, TaglineQueryResult } from "@/sanity/types"
import { useEffect, useState,} from "react";
import MobileSwiper from "./MobileSwiper";
import useCarousel from "./useCarouselHook";
import { AllImageArray } from "../lib/types";
import NameBanner from "../../../public/nameBanner";


interface ProjectCarouselProps {
  portfolio: PortfolioQueryResult;
  tagline: TaglineQueryResult;
}

interface PhotoCred {
  photogName?: string;
  photogUrl?: string;
  _key: string;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ portfolio, tagline }) => {
  const {
    projectImgIndex,
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

  const staticTagline = "Sarita Posada Interiors is a design studio that creates high-end, brand-specific worlds for retail, hospitality, and residential projects.";

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
    <>
    <div className="md:my-0 md:flex md:flex-col md:font md:text-[16px] md:relative md:w-[50vw]">
      <div className="px-[16px] pt-[16px] md:px-6 md:pt-6 md:overflow-x-hidden">
        <NameBanner />
      </div>
      <div className="uppercase text-center md:flex md:flex-row md:justify-between md:px-4 md:pt-[25.61vh] md:h-fit">
        <div className="mt-[6.32vh] mb-[17px] md:m-0">
          {portfolio && `${prependZero(projectImgIndex + 1)}/${projectImageCount && prependZero(projectImageCount)}`}
        </div>
        <div className="mb-4 md:m-0">
          <div>
            {portfolio[projectIndex]?.projectName}, {portfolio[projectIndex]?.projectLocation}
          </div>
          {portfolio[projectIndex]?.photoCredit && photoCredits(portfolio[projectIndex]?.photoCredit)}
        </div>
        <div className="uppercase text-center hidden md:block">
          {portfolio[projectIndex]?.projectType ?? ''}
        </div>
      </div>
      <div className="w-full hidden justify-center mb-5 mt-[6.32vh] md:m-0 md:flex md:absolute md:bottom-0 md:pb-[28px]">
        <div className="max-w-[70vw] md:max-w-[70.625%] text-center uppercase">
          {tagline?.copy ?? staticTagline}
        </div>
      </div>
      <div id='swiper-frame' className="swiper-div mb-4 md:mb-0 w-full md:hidden">
        {allImgs &&
          <MobileSwiper
            project={portfolio[projectIndex]?.projectName}
            allImages={allImgs}
            next={next}
            prev={prev}
          />
        }
      </div>
      <div className="uppercase text-center md:hidden">
        {portfolio[projectIndex]?.projectType ?? ''}
      </div>
      <div className="w-full flex justify-center mb-5 mt-[6.32vh] md:m-0 md:hidden">
        <div className="max-w-[70vw] md:max-w-[70.625%] text-center uppercase">
          {tagline?.copy ?? staticTagline}
        </div>
      </div>
    </div>
      <div id='swiper-frame' className="hidden swiper-div mb-4 w-full md:mb-0 md:block md:col-start-2 md:w-[50vw]">
        {allImgs &&
          <MobileSwiper
            project={portfolio[projectIndex]?.projectName}
            allImages={allImgs}
            next={next}
            prev={prev}
          />
        }
      </div>
    </>
  )
}

export default ProjectCarousel