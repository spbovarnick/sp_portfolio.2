import React from "react"

export default async function InfoLayout({
  children,
}: {
  children: React.ReactNode
}){

  return (
    // <div className="text-[17px] text-center flex flex-col items-center">
    <>
      {children}
    </>
    // </div>
  )
}