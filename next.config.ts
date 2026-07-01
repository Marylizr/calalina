import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        pathname: "/doroh5hbv/image/upload/**",
      },
    ],
  },
};

export default nextConfig;
