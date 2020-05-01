module.exports = {
  stories: ['../stories/**/*.stories.js'],
  webpackFinal: (config) => {
    return {
      ...config,
      module: {
        rules: [
          {
            test: /\.(?:js|jsx)$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          },
          {
            test: /\.css/,
            use: [
              'style-loader',
              'css-loader',
              'postcss-loader',
            ],
          }
        ]
      }
    };
  },
};
