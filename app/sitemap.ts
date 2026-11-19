import type {MetadataRoute} from "next";
import {getTopRated, getTrending} from "@lib/kitsu";
import {SITE_URL} from "@lib/site";

export const revalidate = 86400;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [trending, topRated] = await Promise.all([
    getTrending(),
    getTopRated(),
  ]);
  const ids = Array.from(new Set([...trending, ...topRated].map((a) => a.id)));
  return [
    {url: `${SITE_URL}/`, changeFrequency: "daily", priority: 1},
    {url: `${SITE_URL}/browse`, changeFrequency: "daily", priority: 0.8},
    ...ids.map((id) => ({
      url: `${SITE_URL}/${id}`,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
