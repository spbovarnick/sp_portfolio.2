import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local';
import Footer from "./components/Footer";
import { BgColorQueryResult, ContactQueryResult } from "@/sanity/types";
import { sanityFetch } from "./lib/sanityFetch";
import { bgColorQuery, contactQuery } from "./lib/queries";
// import NameBanner from "../../public/nameBanner";

const helveticaNeue = localFont({
  src: [
    {
      path: './fonts/HelveticaNeue/HelveticaNeue-01.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/HelveticaNeue/HelveticaNeue-Bold-02.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/HelveticaNeue/HelveticaNeue-Italic-03.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/HelveticaNeue/HelveticaNeue-Medium-11.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/HelveticaNeue/HelveticaNeue-MediumItalic-12.ttf',
      weight: '500',
      style: 'italic',
    },
  ],
})

export const metadata: Metadata = {
  title: "Sarita Posada Interiors",
  description: "Sarita Posada Interiors is a New-York based design studio that works across hospitality, retail, and residential interiors.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const contactInfo: ContactQueryResult = await sanityFetch<ContactQueryResult>({
    query: contactQuery,
    tags: ['contact'],
  })

  const bgColor: BgColorQueryResult = await sanityFetch<BgColorQueryResult>({
    query: bgColorQuery,
    tags: ['query']
  })

  const hex = bgColor?.hexCode?.hex

  return (
    <html lang="en">
      <body
        className={`${helveticaNeue.className} antialiased ${hex ? hex : "bg-[#fcf3de]"}`}
      >
        <div className="min-h-[calc(100vh-130px)] md:grid md:grid-col-2 md:gap-0 md:min-h-screen md:max-h-screen md:max-w-screen md:overflow-x-hidden">
          {children}
        </div>
        {/* FOOTER */}
        <Footer contactInfo={contactInfo} />
      </body>
    </html>
  );
}
