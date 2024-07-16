/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lovely-flamingo-139.convex.cloud",
      },
      {
        protocol: "https",
        hostname: "accurate-ptarmigan-67.convex.cloud",
      },
      {
        protocol: "https",
        hostname: "img.clerk.com",
        cre,
      },
    ],
  },
};

export default nextConfig;
