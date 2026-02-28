import { createClient } from 'next-sanity'
import { defineLive } from 'next-sanity/live'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === "development" ? true : false,

})
const token = process.env.SANITY_API_READ_TOKEN;
if (!token) {
  throw new Error("missing SANITY_API_READ_TOKEN")
}

export const {SanityLive} = defineLive({
  client,
  serverToken: token,
  browserToken: token,
});