/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  async redirects() {
    return [
      { source: '/apply', destination: '/careers#apply', permanent: false },
    ];
  },
};
export default nextConfig;
