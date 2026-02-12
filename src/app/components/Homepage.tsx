"use client";

import { PortfolioQueryResult } from "@/sanity/types"
// import { SinglePortfolioProject } from "../lib/types"
import { useEffect, useState } from "react";
import { shuffle } from "../lib/util";
import Row from "./Row"

interface ProjectProps {
  portfolio: PortfolioQueryResult
}

const Homepage: React.FC<ProjectProps> = ({ portfolio }) => {
  const [projects, setProjects] = useState(portfolio)

  const addToScroll = () => {
    const appendage = shuffle(portfolio)
    setProjects((prev) => [...prev, ...appendage])
  }

  return (
    <>
      {projects.map((proj, index) => (
        <Row
          key={`${proj._id}-${index}`}
          project={proj}
          isLast={index === projects.length - 1}
          addToScroll={addToScroll}
        />
      ))}
    </>
  )
}

export default Homepage;