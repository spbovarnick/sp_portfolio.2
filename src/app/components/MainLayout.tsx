import { PortfolioQueryResult } from "@/sanity/types"
import { SinglePortfolioProject } from "../lib/types"
import Row from "./Row"

interface ProjectProps {
  portfolio: PortfolioQueryResult
}

const MainLayout: React.FC<ProjectProps> = ({ portfolio }) => {

  return (
    <>
      {portfolio.map(proj => (
        <Row
          key={proj._id}
          project={proj}
        />
      ))}
    </>
  )
}

export default MainLayout