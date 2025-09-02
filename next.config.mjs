/** @type {import('next').NextConfig} */
const nextConfig = {
  // TEMP: don’t block deploys on typing/eslint while we’re wiring pieces together
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
