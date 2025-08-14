/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com', 'res.cloudinary.com'],
    },
    transpilePackages: ['@mlc-ai/web-llm'],
};

export default nextConfig;
