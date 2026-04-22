
import Link from "next/link";
import NameBanner from "../../../public/nameBanner";
import { forwardRef } from "react";

interface NavProps {
  page: string
}

const Nav = forwardRef<HTMLElement, NavProps>(({ page }, ref) => {
  const whiteBannerPages = ["info", "home", "project"];
  const whiteLinksPages = ["home", "project"];

  const bannerColor = whiteBannerPages.includes(page) ? "white" : "black";
  const linksColor = whiteLinksPages.includes(page) ? "text-white" : "text-black";

  return (
    <nav ref={ref} className={`fixed z-10 w-full flex flex-col md:grid grid-cols-2 gap-0 pt-[5.4vh] px-6 md:px-10 md:pt-[52px] transition-transform duration-300 ease-in-out`}>
      <div className="w-full md:w-2/3">
        <NameBanner color={bannerColor} />
      </div>
      <div className={`${page === "info" ? "text-white md:text-black" : linksColor} text-center mt-5 md:m-0 md:relative md:top-8 h-fit md:flex md:justify-end md:pr-16`}>
        <Link className="" href={"/info"}>INFO</Link>
        <Link className="ml-12" href={"/portfolio"}>PROJECTS</Link>
      </div>
    </nav>
  );
});

Nav.displayName = "Nav";

export default Nav;