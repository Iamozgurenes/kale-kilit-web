import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "app-kale-kilit-db.pjyhpm.easypanel.host",
        pathname: "/api/files/**",
      },
      {
        protocol: "https",
        hostname: "db.kalekilitadana.com",
        pathname: "/api/files/**",
      },
    ],
  },
};

export default nextConfig;
