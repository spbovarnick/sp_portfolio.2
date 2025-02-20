import React from "react"

export default async function InfoLayout({
  children,
}: {
  children: React.ReactNode
}){

  return (
    <div className="text-[17px] text-center pt-[62px] flex flex-col md:pt-[4.39vh] items-center">
      {children}
    </div>
  )
}