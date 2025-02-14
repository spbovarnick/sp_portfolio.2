"use client"

import { PortfolioQueryResult } from "@/sanity/types"
import { useEffect, useState, MouseEvent, } from "react";
import MobileSwiper from "./MobileSwiper";
// import { urlFor } from "@/sanity/lib/image";
// import Image from "next/image";

interface ProjectCarouselProps {
  portfolio: PortfolioQueryResult;
}

interface PhotoCred {
  photogName?: string;
  photogUrl?: string;
  _key: string;
}

const ProjectCarousel: React.FC<ProjectCarouselProps> = ({ portfolio }) => {
  const [projects, setProjects] = useState<PortfolioQueryResult>([])
  const [projectIndex, setProjectIndex] = useState<number>(0)
  const [projectImgIndex, setProjectImgIndex] = useState<number>(0)

  useEffect(() => {
    if (portfolio.length > 0) {
      setProjects(portfolio)
    }
  }, [portfolio])

  useEffect(() => {
    if (projectImgIndex === projects[projectIndex]?.photos?.length) {
      if (projectIndex === projects?.length - 1) {
        setProjectIndex(0)
      } else {
        setProjectIndex(projectIndex+1)
      }
      setProjectImgIndex(0)
    }
    if (projectImgIndex === -1) {
      if (projectIndex === 0) {
        setProjectIndex(projects?.length - 1)
      } else {
        setProjectIndex(projectIndex-1)
      }
      if (!projects[projectIndex]?.photos) {
        return
      }
      setProjectImgIndex(projects[projectIndex]?.photos?.length - 1)
    }
  }, [projectImgIndex, projectIndex, projects])

  const prependZero = (input: number) => {
    if (input < 10 ) {
      return '0' + input
    }
    return input
  }

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

  const increment = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setProjectImgIndex(projectImgIndex+1)
  }

  const decrement = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setProjectImgIndex(projectImgIndex-1)
  }

  return (
    <div className="mt-[62px]">
      <div className="uppercase text-center">
        <div className="mb-[17px]">
          {projects && `${prependZero(projectImgIndex + 1)}/${projects[projectIndex]?.photos?.length && prependZero(projects[projectIndex]?.photos?.length)}`}
        </div>
        <div>
          {projects[projectIndex]?.projectLocation}
        </div>
        { projects[projectIndex]?.photoCredit && photoCredits(projects[projectIndex]?.photoCredit)
        }
        <button className="p-3 bg-red-50" onClick={increment}>incrementor</button> <br/>
        <button className="p-3 bg-red-50" onClick={decrement}>decrementor</button>
      </div>
      <div className="">
        {projects[projectIndex]?.photos  && <MobileSwiper project={projects[projectIndex]?.projectName} photos={projects[projectIndex]?.photos}/>}
      </div>
    </div>
  )
}

export default ProjectCarousel