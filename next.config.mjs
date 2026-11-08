/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  basePath: process.env.GITHUB_PAGES === 'true' ? '/Hello-world' : '',
  images: { unoptimized: true },
};
export default nextConfig;
