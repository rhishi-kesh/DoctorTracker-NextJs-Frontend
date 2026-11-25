/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },

  async rewrites() {
    return [
      {
        source: "/backend/:path*",
        destination: `${process.env.API_URL}/:path*`,
      },
    ];
  },
};

export default nextConfig;
