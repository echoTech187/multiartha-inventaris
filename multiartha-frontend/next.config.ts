import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        unoptimized: true,
        remotePatterns: [new URL("http://localhost:3000"), new URL("http://localhost:3001")],
    }
};

export default nextConfig;
