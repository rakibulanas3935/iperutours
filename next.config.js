const createNextIntlPlugin = require('next-intl/plugin');
 
const withNextIntl = createNextIntlPlugin();
 
/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
    domains: ["images.unsplash.com"], // ✅ add this line
  },
};
 
module.exports = withNextIntl(nextConfig);