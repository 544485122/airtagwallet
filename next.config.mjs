/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api-murex-pi-56.vercel.app/api/:path*',
      },
    ];
  }
};

