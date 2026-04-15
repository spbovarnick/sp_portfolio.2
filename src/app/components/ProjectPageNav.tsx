import Link from "next/link";
import { forwardRef } from "react";
import NameBanner from "../../../public/nameBanner";

interface ProjectPageNavProps {
  projectName: string,
  location: string,
  projectType: string | null,
  photoCredit: Array<{
    photogName?: string;
    photogUrl?: string;
    _key: string;
  }> | null;
}

interface PhotoCred {
  photogName?: string;
  photogUrl?: string;
  _key: string;
}

const ProjectPageNav = forwardRef<HTMLElement, ProjectPageNavProps>(
  ({ projectName, location, projectType, photoCredit }, ref) => {

    const photoCreditsElement = (creditList: PhotoCred[]) => {
      return (
        <div
          className=""
        >
          PHOTO{creditList.length > 1 ? "S" : ""} BY {
            creditList.map((cred, i) => {
              return (
                cred.photogUrl ? (
                  <span key={cred._key}>{i > 0 && <span> & </span>}<a className="folioPicCred" href={cred.photogUrl} target="_blank">{cred.photogName}</a></span>) : (<span key={cred._key}>{i > 0 && <span> & </span>}<span className="folioPicCred" key={cred._key}>{cred.photogName}</span></span>
                )
              )
            })
          }
        </div>
      )
    }


    return (
      <nav
        ref={ref}
        className="z-10 w-full flex flex-col md:grid grid-cols-2 gap-0 pt-[5.4vh] px-[12vw] md:px-10 md:pt-[52px] uppercase text-black fixed transition-transform duration-300 ease-in-out text-center md:text-left"
        style={{ backgroundColor: "var(--bg-color)"}}
      >
        <div className="w-full md:w-2/3">
          <NameBanner
            color="black"
          />
          <div className="mt-11 mb-7 hidden md:block">
            <div className="">{projectName}, {location}</div>
            <div className="">{projectType}</div>
            {photoCredit &&
              photoCreditsElement(photoCredit)
            }
          </div>
        </div>
        <div className="text-center mt-5 md:m-0 md:relative md:top-8 h-fit md:flex md:justify-end md:pr-16">
          <Link className="" href={"/info"}>INFO</Link>
          <Link className="ml-12" href={"/portfolio"}>PROJECTS</Link>
        </div>
        <div className="my-5 md:hidden">
          <div className="">{projectName}, {location}</div>
          <div className="">{projectType}</div>
          {photoCredit &&
            photoCreditsElement(photoCredit)
          }
        </div>
      </nav>
    )
  }
)

ProjectPageNav.displayName = "ProjectPageNav"

export default ProjectPageNav;