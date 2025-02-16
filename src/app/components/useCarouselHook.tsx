import { PortfolioQueryResult } from "@/sanity/types";
import { useState, useEffect } from "react";

const useCarousel = (projects: PortfolioQueryResult) => {
  const [projectIndex, setProjectIndex] = useState<number>(0);
  const [projectImgIndex, setProjectImgIndex] = useState<number>(0);
  const [totalImgIndex, setTotalImgIndex] = useState<number>(0)

  const currentProject = projects[projectIndex];
  const totalImgCount = projects.reduce((acc, proj) => {
    return acc + (proj?.photos?.length ?? 0)
  }, 0)
  const projectImageCount = currentProject?.photos?.length ?? 0;

  const next = () => {
    setTotalImgIndex(prev => prev + 1);
    setProjectImgIndex(prev => prev + 1);
  };

  const prev = () => {
    setTotalImgIndex(prev => prev - 1);
    setProjectImgIndex(prev => prev - 1);
  };

  useEffect(() => {
    if (!projects.length) return;

    if (projectImgIndex === projectImageCount) {
      if (projectIndex === projects.length -1 ) {
        setProjectIndex(0)
        setTotalImgIndex(0)
      } else {
        setProjectIndex(prev => prev + 1)
      }
      setProjectImgIndex(0)
    } else if (projectImgIndex === -1) {
      if (projectIndex === 0) {
        setProjectIndex(projects.length - 1)
        setTotalImgIndex(totalImgCount - 1)
      } else {
        setProjectIndex(prev => prev - 1)
      }
      setProjectImgIndex(projectImageCount - 1)
    }
  }, [projectImgIndex, projectIndex,])

  return {
    totalImgCount,
    totalImgIndex,
    projectIndex,
    projectImgIndex,
    projectImageCount,
    next,
    prev,
  };
};

export default useCarousel;