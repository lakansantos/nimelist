/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "cdn.myanimelist.net",
      "media.kitsu.app",
      "kitsu-production-media.s3.us-west-002.backblazeb2.com",
    ],
  },
};

module.exports = nextConfig;
