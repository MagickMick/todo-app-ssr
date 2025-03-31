/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Zorgt voor extra controles tijdens development
  swcMinify: true, // Gebruikt SWC voor minificatie (sneller dan Terser)
  
  env: {
    // Hier kunnen meer environment variables worden toegevoegd indien nodig
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
  
  // Webpack configuratie kan worden uitgebreid met extra loaders/plugins
  webpack: (config) => {
    return config;
  },
};

module.exports = nextConfig;
