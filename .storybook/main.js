const custom = require('../webpack.config');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  stories: ['../stories/**/*.stories.js'],
  webpackFinal: (config) => {
    return {
      ...config,
      module: {
        ...config.module,
        rules: custom.module.rules
      },
      plugins: config.plugins.concat(
        new CopyWebpackPlugin([
          {
            from: path.resolve(__dirname, "../src/resources"),
            to: path.resolve(__dirname, '../build/storybook-static/resources')
          }
        ])
      )
    };
  },
};
