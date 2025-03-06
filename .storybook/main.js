module.exports = {
  stories: ["../stories/**/*.stories.ts"],
  staticDirs: ["../src/resources"],
  webpackFinal: (config) => {
    return {
      ...config,
      module: {
        ...config.module,
        rules: [
          {
            test: /\.ts$/,
            exclude: /node_modules/,
            use: "ts-loader",
          },
          {
            test: /\.css$/i,
            use: ["style-loader", "css-loader", "postcss-loader"],
          },
          {
            test: /\.hbs$/i,
            use: "handlebars-loader",
          },
        ],
      },
    };
  },
  framework: {
    name: "@storybook/html-webpack5",
    options: {},
  },
};
