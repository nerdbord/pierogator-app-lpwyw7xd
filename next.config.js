/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
      },
      {
        protocol: 'https',
        hostname: 'oaidalleapiprodscus.blob.core.windows.net',
      },
      {
        protocol: 'https',
        hostname: 'xurxupibc5lblwyy.public.blob.vercel-storage.com',
      },
    ],
  },
  optimizeFonts: false,
}

module.exports = nextConfig