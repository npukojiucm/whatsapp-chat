/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === "production" ? "/whatsapp-chat/" : "",
  basePath: process.env.NODE_ENV === "production" ? "/whatsapp-chat" : "",
  trailingSlash: true,
};

export default nextConfig;
