'use client'
import { ContactQueryResult } from "@/sanity/types";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface FooterProps {
  contactInfo: ContactQueryResult
}

const Footer = ({ contactInfo }: FooterProps) => {
  const pathname = usePathname();
  console.log(pathname)

  return (
    <div className={`border-t border-black pt-[17px] pb-[19px]  bottom-0 left-0 right-0 w-full ${pathname.includes('/admin') ? 'hidden' : ''}`}>
      <ul className="uppercase text-center mb-[26px] md:flex md:justify-around md:items-center md:h-[146px]">
        <li>
          <Link href={'/info'}>INFO</Link>
        </li>
        <li>
          <a href={contactInfo?.instagram ?? 'https://www.instagram.com/sarita_posada/'} target="_blank">INSTAGRAM</a>
        </li>
        <li>
          <a href={`mailto:${contactInfo?.emailAddy ?? `sarita@saritaposada.com`}`} target="_blank">EMAIL</a>
        </li>
        <li>
          <span>{contactInfo?.location}</span>
        </li>
      </ul>
      <div className="text-center text-[9px]">
        ©2024 Sarita posada interiors. All Rights Reserved.
      </div>
    </div>
  )
}

export default Footer;