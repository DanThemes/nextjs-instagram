/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: "" }],
  },
  experimental: {
    esmExternals: "loose",
    serverComponentsExternalPackages: ["mongoose"],
  },
};

module.exports = nextConfig;
