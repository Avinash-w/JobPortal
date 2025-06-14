/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['your-image-domain.com'], // e.g., 'res.cloudinary.com', 's3.amazonaws.com'
  },
};

module.exports = nextConfig;
