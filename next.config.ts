import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return {
      beforeFiles: [
        {
          source: "/:path*",
          has: [{ type: "host", value: "photo.renzoventura.com" }],
          destination: "/photo/:path*",
        },
      ],
    };
  },
};

export default nextConfig;
