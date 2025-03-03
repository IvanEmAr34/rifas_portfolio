/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "build",
  env: {
    SERVER_URL: process.env.SERVER_URL,
    CAPTCHA_SITE_KEY: process.env.CAPTCHA_SITE_KEY,
  },
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
