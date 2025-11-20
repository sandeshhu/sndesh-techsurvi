/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  serverRuntimeConfig: {
    apiTimeout: 10000,
  },
};

export default nextConfig;
