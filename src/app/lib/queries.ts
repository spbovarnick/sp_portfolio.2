import { groq } from "next-sanity";

export const portfolioQuery = groq`*[_type == "portfolio"]|order(orderRank){
  _id,
  orderRank,
  projectName,
  photoCredit,
  projectLocation,
  photos[]{
    asset ->
  }
}`