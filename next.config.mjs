/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Product images would come from a CDN (Cloudflare R2) in production.
  images: {
    remotePatterns: [{ protocol: "https", hostname: "**" }],
  },
};

export default nextConfig;
