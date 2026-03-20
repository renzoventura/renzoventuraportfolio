import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    deviceSizes: [480, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    qualities: [65, 75, 85],
  },
  async redirects() {
    return [
      // www: send /photo/* to photo subdomain
      {
        source: "/photo/:path*",
        has: [{ type: "host", value: "www.renzoventura.com" }],
        destination: "https://photo.renzoventura.com/photo/:path*",
        permanent: false,
      },
      // photo subdomain: strip /photo prefix so URLs stay clean
      {
        source: "/photo",
        has: [{ type: "host", value: "photo.renzoventura.com" }],
        destination: "/",
        permanent: false,
      },
      {
        source: "/photo/:path*",
        has: [{ type: "host", value: "photo.renzoventura.com" }],
        destination: "/:path*",
        permanent: false,
      },
    ];
  },
  async rewrites() {
    return [
      // photo subdomain: serve /photo content at clean root-relative URLs
      {
        source: "/",
        has: [{ type: "host", value: "photo.renzoventura.com" }],
        destination: "/photo",
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "photo.renzoventura.com" }],
        destination: "/photo/:path*",
      },
    ];
  },
};

export default nextConfig;
