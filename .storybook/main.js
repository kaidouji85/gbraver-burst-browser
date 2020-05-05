const custom = require('../webpack.config');

module.exports = {
  stories: ['../stories/**/*.stories.js'],
  webpackFinal: (config) => {
    return {
      ...config,
      module: {
        ...config.module,
        rules: custom.module.rules
      },
    };
  }
};