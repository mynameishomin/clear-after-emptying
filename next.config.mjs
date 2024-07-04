/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: [
            "images.unsplash.com",
            "mynameishomin.com",
            "s3.us-west-2.amazonaws.com",
            "prod-files-secure.s3.us-west-2.amazonaws.com",
            "localhost",
        ],
        unoptimized: true,
    },
};

export default nextConfig;
