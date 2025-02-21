import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? '/whatsapp-chat/' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/whatsapp-chat' : '',
};

export default nextConfig;
