import type { Metadata } from "next";
import "./globals.css";
import localFont from 'next/font/local';
import { SanityLive } from "@/sanity/lib/client";

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

  return (
    <html lang="en">
     <body
        className={`${helveticaNeue.className} antialiased`}
      >
        <main>
            {children}
            <SanityLive />
        </main>
      </body>
    </html>
  );
}
