const withCSS = require('@zeit/next-css');

module.exports = withCSS({
  webpack(config, { dev }) {
    if (dev) {
      config.module.rules.push({
        test: /\.js$/,
        loader: 'eslint-loader',
        exclude: ['/node_modules/', '/.next/', '/out/'],
        enforce: 'pre',
        options: {
          emitWarning: true,
        },
      });
    }
    return config;
  },
});
