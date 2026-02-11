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
  const [page, setPage] = useState(1)
  const [projects, setProjects] = useState(portfolio)

  const addToScroll = () => {

  }

  useEffect(() => {

  },[page])


  return (
    <>
      {portfolio.map((proj, index) => (
        <Row
          key={proj._id}
          project={proj}
          isLast={index === portfolio.length - 1}
          newLimit={() => setPage(page + 1)}
        />
      ))}
    </>
  )
}

export default Homepage;