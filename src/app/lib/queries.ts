import { groq } from "next-sanity";

export const portfolioQuery = groq`*[_type == "portfolio"]{
  projectName,
  photoCredit,
  projectLocation,
  photos[]{
    asset ->
  }
}`