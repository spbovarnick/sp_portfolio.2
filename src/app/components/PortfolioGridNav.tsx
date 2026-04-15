
import Link from "next/link";
import NameBanner from "../../../public/nameBanner";
import { forwardRef } from "react";

const PortfolioGridNav = forwardRef<HTMLElement>(function PortfolioGridNav(_, ref) {
  return (
    <nav ref={ref} className="fixed transition-transform duration-300 ease-in-out z-10 w-full flex flex-col md:grid grid-cols-2 gap-0 pt-[5.4vh] px-[12vw] md:px-10 md:pt-[52px]" style={{ backgroundColor: "var(--bg-color)" }}>
      <div className="w-full md:w-2/3">
        <NameBanner
          color={"black"}
        />
      </div>
      <div className="text-center mt-5 md:m-0 md:relative md:top-8 h-fit md:flex md:justify-end md:pr-16">
        <Link className="" href={"/info"}>INFO</Link>
        <Link className="ml-12" href={"/portfolio"}>PROJECTS</Link>
      </div>
    </nav>
  )
})

export default PortfolioGridNav;