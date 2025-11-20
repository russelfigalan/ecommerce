import type { NextConfig } from "next";

const nextConfig: NextConfig = {

};

export default nextConfig;

module.exports = {
    devIndicators: false,
    images: {
        remotePatterns: [
        {
            protocol: 'https',
            hostname: 'files.stripe.com',
        },
        // {
        //     protocol: 'http',
        //     hostname: '**',
        // },
        ],
    },
    // experimental: {
    //     proxy: true,
    // },
}
