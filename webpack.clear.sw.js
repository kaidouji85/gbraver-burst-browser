const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const BUILD_PATH = "build/production";

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "src/js/clear.ts"),
  output: {
    path: path.resolve(__dirname, BUILD_PATH),
    filename: "clear.js",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, `${BUILD_PATH}/clear.html`),
      template: "src/clear.html",
    }),
  ],
  resolve: {
    extensions: [".js", ".ts"],
  },
};
