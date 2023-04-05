module.exports = {
  stories: ['../stories/**/*.stories.ts'],
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
            test: /\.ts$/,
            exclude: /node_modules/,
            use: 'ts-loader'
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