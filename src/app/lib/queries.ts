// import { groq } from "next-sanity";
import { defineQuery } from "next-sanity";

export const portfolioQuery = defineQuery(
  `*[_type == "portfolio"]{
    _id,
    projectName,
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
    bioBlurb,
    previousProjects[],
    pressContact,
  }`
)

export const bgColorQuery = defineQuery(
  `*[_type == 'bgColor'][0]`
)

export const projectQuery = defineQuery(
  `*[_type == 'portfolio' && projectName == $projectName][0]{
      _id,
      projectName,
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