/** @type {import('next').NextConfig} */
const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
const backendHostname = new URL(apiUrl).hostname;

const nextConfig = {
    images: {
        remotePatterns: [...new Set(["localhost", backendHostname])].map(hostname => ({ hostname }))
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: `${apiUrl}/:path*`,
            },
        ];
    },
};

export default nextConfig;
