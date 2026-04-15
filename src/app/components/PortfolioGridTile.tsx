import { ProjectQueryResult } from "@/sanity/types"
import { urlFor } from "@/sanity/lib/image"
import Link from "next/link"
import Image from "next/image"

interface TileProps {
  project: ProjectQueryResult,
}

const PortfolioGridTile: React.FC<TileProps> = ({ project }) => {

  return (
    project?.projectName &&
    <Link href={`/${encodeURIComponent(project.projectName)}`}>
      <div className="text-center">
      {project.photos && project.photos[0] &&
        <div className="relative aspect-square w-full overflow-hidden mb-4">
          <Image
              src={urlFor(project.photos[0])
                .width(1000)
                .dpr(2)
                .quality(75)
                .url()
              }
              placeholder="blur"
              fill
              sizes="(max-width: 768px) 100vw, (min-width: 769px) 50vw"
              alt={`Photo of ${project.projectName}`}
              blurDataURL={project.photos[0].asset?.metadata?.lqip}
              quality={100}
              className="object-cover "
            />
          </div>
        }
        <div className="">{project.projectName}, {project.projectLocation}</div>
      </div>
    </Link>
  )
}

export default PortfolioGridTile