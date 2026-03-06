import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    qualities: [65, 75, 85],
  },
  async rewrites() {
    return [
      {
        source: "/",
        has: [{ type: "host", value: "photo.renzoventura.com" }],
        destination: "/photo",
      },
    ];
  },
};

export default nextConfig;
