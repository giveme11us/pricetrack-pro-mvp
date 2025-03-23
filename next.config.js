/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/pricetrack-pro-mvp',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
  assetPrefix: '/pricetrack-pro-mvp/',
}

module.exports = nextConfig 