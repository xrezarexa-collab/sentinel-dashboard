import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: '/openclaw',
        destination: 'http://95.111.247.105:18789',
      },
      {
        source: '/openclaw/:path*',
        destination: 'http://95.111.247.105:18789/:path*',
      },
    ];
  },
};

export default nextConfig;
