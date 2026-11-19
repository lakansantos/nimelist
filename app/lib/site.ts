/** Public origin of the site, e.g. https://nimelist.lakansantos.com. */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL as string;

if (!SITE_URL) {
  throw new Error(
    "NEXT_PUBLIC_SITE_URL is not set. Set it in Vercel or .env for local builds."
  );
}
