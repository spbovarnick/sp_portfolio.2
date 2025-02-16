// import { groq } from "next-sanity";
import { defineQuery } from "next-sanity";

export const portfolioQuery = defineQuery(
  `*[_type == "portfolio"]|order(orderRank){
    _id,
    orderRank,
    projectName,
    photoCredit,
    projectLocation,
    photos[]{
      asset ->
    },
    projectType,
  }`
);

export const taglineQuery = defineQuery(
  `*[_type == 'tagline']{
    copy,
  }`
)