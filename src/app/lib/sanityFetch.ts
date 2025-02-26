import "server-only";

import { type QueryParams } from "@sanity/client";

import { client } from "../../sanity/lib/client";

export async function sanityFetch<QueryResponse>({
  query,
  qParams,
  // tags,
}: {
  query: string;
  qParams?: QueryParams;
  tags: string[];
}): Promise<QueryResponse> {
  try {
    return client.fetch<QueryResponse>(query, qParams || {}, {
      cache: process.env.NODE_ENV === "development" ? "no-cache" : "force-cache",
      next: { tags: ["contact", "infoPage", "portfolio", "tagline", "bgColor"] },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

