import React from "react"
import Nav from "../components/Nav";

export default async function InfoLayout({
  children,
}: {
  children: React.ReactNode
}){

  return (
    <>
    <Nav
      page={"info"}
    />
      {children}
    </>
  );
}