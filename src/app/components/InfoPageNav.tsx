import Link from "next/link"
import NameBanner from "../../../public/nameBanner"


export default function InfoPageNav() {

  return (
    <nav
      className="z-10 w-full flex flex-col md:grid grid-cols-2 gap-0 pt-[5.4vh] px-[12vw] md:px-10 md:pt-[52px] uppercase text-black"
    >
      <div className="content-start justify-items-start">
        <div className="w-full md:w-2/3">
          <NameBanner
            color="black"
          />
        </div>
      </div>
      <div className="text-center mt-5 md:m-0 md:relative md:top-[16%] h-fit md:flex md:justify-end md:pr-16">
        <Link className="mr-[5vw]" href={"/info"}>STUDIO</Link>
        <Link className="ml-[5vw]" href={"/"}>WORK</Link>
      </div>
    </nav>
  )
}