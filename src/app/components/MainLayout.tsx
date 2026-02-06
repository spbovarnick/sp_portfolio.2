import { PortfolioQueryResult } from "@/sanity/types"
import { SinglePortfolioProject } from "../lib/types"
import Row from "./Row"

interface ProjectProps {
  portfolio: PortfolioQueryResult
}

const MainLayout: React.FC<ProjectProps> = ({ portfolio }) => {

  console.log(portfolio)

  return (
    <div className="grid grid-cols-1 grid-rows-1 gap-0 relative">
      {portfolio.map(proj => (
        <Row
          key={proj._id}
          project={proj}
        />
      ))}
    </div>
  )
}

export default MainLayout