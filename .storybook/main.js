module.exports = {
  stories: ['../stories/**/*.stories.js'],
  core: {
    builder: "webpack5",
  },
  webpackFinal: (config) => {
    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          {
            test: /\.js/,
            exclude: /node_modules/,
            use: 'babel-loader'
          },
          {
            test: /\.css$/i,
            use: [
              'style-loader',
              'css-loader',
              'postcss-loader',
            ],
          }
        ]
      },
    };
  }
};