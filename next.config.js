/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["cdn.jsdelivr.net", "https://www.helloimg.com"],
  },
};

module.exports = nextConfig;
