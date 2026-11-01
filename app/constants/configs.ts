const requireEnv = (name: string, value: string | undefined): string => {
  if (!value) {
    throw new Error(`Missing required environment variable ${name}`);
  }
  return value;
};

// NEXT_PUBLIC_* must be referenced literally so Next.js can inline it at build time.
export const BASE_API_KITSU_URL = requireEnv(
  "NEXT_PUBLIC_KITSU_BASE_API",
  process.env.NEXT_PUBLIC_KITSU_BASE_API
);
export const BASE_API_JIKAN_URL = process.env.NEXT_PUBLIC_JIKAN_BASE_API;

// How long server fetches of Kitsu data stay cached before Next.js refetches them (seconds).
export const REVALIDATE_SECONDS = {
  lists: 60 * 60,
  details: 60 * 60 * 24,
} as const;
