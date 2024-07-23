/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
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
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.alias["@prisma/client"] = false;
        }
        return config;
    },
};

export default nextConfig;
