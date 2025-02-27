
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverComponentsExternalPackages: ['tailwindcss', 'autoprefixer'],
  },
  images: {
    domains: ['images.unsplash.com'],
  },
  // Use Vite's PostCSS config when building
  transpilePackages: ['tailwindcss-animate'],
}

module.exports = nextConfig
