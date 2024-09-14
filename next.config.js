const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
module.exports = withContentlayer({
  output: 'export',
  reactStrictMode: true,
  swcMinify: false,
  experimental: {
    scrollRestoration: true,
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } },
    ],
  },
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
  },
});
