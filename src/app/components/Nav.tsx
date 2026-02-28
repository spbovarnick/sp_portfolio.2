
import Link from "next/link";
import NameBanner from "../../../public/nameBanner";

const Nav = ({}) => {

  return (
    <nav className="absolute z-10 w-full flex flex-col">
      <div className="pt-[5.4vh] px-[12vw] w-full">
        <NameBanner
          color={"white"}
        />
      </div>
      <div className="text-white text-center mt-5">
        <Link className="mr-[5vw]" href={"/info"}>STUDIO</Link>
        <Link className="ml-[5vw]" href={"/"}>WORK</Link>
      </div>
    </nav>
  )
}

export default Nav;