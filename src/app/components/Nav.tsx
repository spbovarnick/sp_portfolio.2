import Logo from "@/../public/SP_Logo.png"
import Image from "next/image";
import Link from "next/link";

const Nav = ({}) => {

  return (
    <nav className="absolute z-10 w-full flex flex-col">
      <Image
        src={Logo}
        placeholder="blur"
        sizes="(max-width: 768px) 150vw, (min-width: 769px) 100vw"
        quality={100}
        alt="Sarita Posada Logo"
        className="pt-[5.4vh] px-[12vw] w-full"
      />
      <div className="text-white text-center mt-5">
        <Link className="mr-[5vw]" href={"/info"}>STUDIO</Link>
        <Link className="ml-[5vw]" href={"/"}>WORK</Link>
      </div>
    </nav>
  )
}

export default Nav;