const config = require('./webpack.config');
const path = require('path');
const WorkBoxPlugin = require('workbox-webpack-plugin');

module.exports = {
  ...config,
  mode: 'production',
  plugins: [
    ...config.plugins,
    new WorkBoxPlugin.GenerateSW({
      swDest: path.join(config.output.path, 'sw.js'),
      clientsClaim: true,
      skipWaiting: true,
    })
  ]
};