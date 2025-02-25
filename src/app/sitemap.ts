import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://saritaposada.com",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
      images: ['./opengraph-image.js'],
    },
    {
      url: "https://saritaposada.com/info",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: .8,
      images: ['./opengraph-image.js'],
    }
  ]
}