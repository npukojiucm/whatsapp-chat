/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === "production" ? "/your-repo-name/" : "",
  basePath: process.env.NODE_ENV === "production" ? "/your-repo-name" : "",
};

export default nextConfig;
