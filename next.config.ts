import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/sixdim',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
