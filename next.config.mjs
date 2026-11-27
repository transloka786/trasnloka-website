/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingIncludes: { "/updates*": ["./content/updates/*.md"] },
  poweredByHeader: false,
  async redirects() {
    return [{ source: "/apply", destination: "/careers", permanent: false }];
  },
};
export default nextConfig;
