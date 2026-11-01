/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Kitsu already serves several sizes (tiny/small/medium/large); we pick the
    // right one per slot instead of spending the hosting image-optimisation quota.
    unoptimized: true,
  },
};

module.exports = nextConfig;
