import React from "react"


export default function InfoLayout({
  children,
}: {
  children: React.ReactNode
}){

  return (
    <div>
      {children}
    </div>
  )
}