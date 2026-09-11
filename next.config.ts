import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["192.168.1.13"],
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.financercarrental.com" }],
        destination: "https://financercarrental.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
