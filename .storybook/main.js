module.exports = {
  stories: ['../stories/**/*.stories.ts'],
  webpackFinal: config => {
    return {
      ...config,
      module: {
        ...config.module,
        rules: [{
          test: /\.ts$/,
          exclude: /node_modules/,
          use: 'ts-loader'
        }, {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader']
        }]
      }
    };
  },
  framework: {
    name: '@storybook/html-webpack5',
    options: {}
  },
  addons: ['@storybook/addon-mdx-gfm'],
  docs: {
    autodocs: true
  }
};