/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.fakercloud.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      { protocol: "https", hostname: "loremflickr.com" },
    ],
  },
};

module.exports = nextConfig;
