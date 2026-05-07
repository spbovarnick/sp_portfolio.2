// import { groq } from "next-sanity";
import { defineQuery } from "next-sanity";

export const portfolioQuery = defineQuery(
  `*[_type == "portfolio"] | order(orderRank){
    _id,
    projectName,
    "slug": slug.current,
    photoCredit,
    projectLocation,
    photos[]{
      asset ->,
      hotspot,
      crop
    },
    projectType,
  }`
);

export const landingPortfolioQuery = defineQuery(
  `*[_type == "portfolio" && featured == true]{
    _id,
    projectName,
    "slug": slug.current,
    photoCredit,
    projectLocation,
    photos[featured == true]{
      asset ->,
      hotspot,
      crop
    },
    projectType,
    featured,
  }`
);

export const taglineQuery = defineQuery(
  `*[_type == 'tagline'][0]{
    copy,
  }`
);

export const contactQuery = defineQuery(
  `*[_type == 'contact'][0]{
    emailAddy,
    instagram,
    location,
  }`
)

export const infoPageQuery = defineQuery(
  `*[_type == 'infoPage'][0]{
    portrait{
      credit,
      creditUrl,
      asset ->,
      hotspot,
      crop
    },
    pressContact
  }`
)

export const bgColorQuery = defineQuery(
  `*[_type == 'bgColor'][0]`
)

export const allProjectSlugsQuery = defineQuery(
  `*[_type == "portfolio" && defined(slug.current)]{ "slug": slug.current }`
)

export const projectQuery = defineQuery(
  `*[_type == 'portfolio' && slug.current == $slug][0]{
      _id,
      projectName,
      "slug": slug.current,
      photoCredit,
      projectLocation,
      photos[]{
        asset ->,
        hotspot,
        crop
      },
      projectType,
  }`
)