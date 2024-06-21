/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_KEY: process.env.API_KEY,
    WEBHOOK_URL: process.env.WEBHOOK_URL,
  },
}

export default nextConfig
