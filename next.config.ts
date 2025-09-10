import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/intern",
        destination: "/intern/login",
        permanent: true,
      },
      {
        source: "/supervisor",
        destination: "/supervisor/login",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
