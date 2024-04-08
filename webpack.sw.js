const webpack = require("webpack");
const config = require("./webpack.config");
const path = require("path");
const uuid = require("uuid");

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "src/js/sw.ts"),
  output: {
    path: config.output.path,
    filename: "sw.js",
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
    new webpack.DefinePlugin({
      GBRAVER_BURST_SW_BUILD_HASH: JSON.stringify(uuid.v4()),
    }),
  ],
  resolve: {
    extensions: [".js", ".ts"],
  },
};
