module.exports = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'pic.pirata.vip',
          pathname: '/airtagpictures/*',  // 可以根据实际情况调整路径
        },
      ],
    },
  }
module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pic.pirata.vip',
        pathname: '**',
      },
    ],
  },
};
