import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: '/openclaw/:path*',
        destination: 'http://95.111.247.105:8080/:path*',
      },
    ];
  },
};

export default nextConfig;
