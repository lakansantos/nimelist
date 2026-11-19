import type {MetadataRoute} from "next";
import {SITE_URL} from "@lib/site";

const IS_PRODUCTION = process.env.VERCEL_ENV === "production";

export default function robots(): MetadataRoute.Robots {
  if (!IS_PRODUCTION) return {rules: {userAgent: "*", disallow: "/"}};
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // /reel/... and /simple/... only set the mode cookie and redirect to the
      // clean URL; /saved and /search have nothing worth indexing.
      disallow: ["/reel/", "/simple/", "/reel", "/simple", "/saved", "/search"],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
