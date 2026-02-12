"use client";

import { PortfolioQueryResult } from "@/sanity/types"
// import { SinglePortfolioProject } from "../lib/types"
import { useEffect, useState } from "react";
import { shuffle } from "../lib/util";
import Row from "./Row"
import Nav from "./Nav";

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
    <div className="relative snap-y snap-mandatory w-screen h-screen overflow-y-scroll">
      <Nav />
      {projects.map((proj, index) => (
        <Row
          key={`${proj._id}-${index}`}
          project={proj}
          isLast={index === projects.length - 1}
          addToScroll={addToScroll}
        />
      ))}
    </div>
  )
}

export default Homepage;