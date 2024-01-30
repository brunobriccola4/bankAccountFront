/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/account",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
