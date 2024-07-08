require("dotenv").config();

const fs = require("fs");
const UglifyJS = require("uglify-js");
const CleanCSS = require("clean-css");
const path = require("path");
const webpack = require("webpack");
const uuid = require("uuid");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const { appDescription } = require("./app-description");

const BUILD_ROOT = "build/production";
const RESOURCE_HASH = uuid.v4();
const RESOURCE_ROOT = `resources/${RESOURCE_HASH}`;
const DESKTOP_RESOURCE_ROOT = `${RESOURCE_ROOT}/desktop`;
const MOBILE_RESOURCE_ROOT = `${RESOURCE_ROOT}/mobile`;

/**
 * CSSを読み込んでminifyする
 * @param {string} path CSSファイルのパス
 * @returns {string} minifyされたCSS
 */
const readCSS = (path) => {
  const css = fs.readFileSync(path, "utf-8");
  return new CleanCSS({}).minify(css).styles;
};

module.exports = {
  mode: "development",
  entry: {
    index: path.resolve(__dirname, "src/js/index.ts"),
    "first-view": path.resolve(__dirname, "src/first-view.js"),
  },
  output: {
    path: path.resolve(__dirname, BUILD_ROOT),
    filename: "[name].js",
  },
  devServer: {
    static: path.resolve(__dirname, BUILD_ROOT),
    port: 8080,
    host: "0.0.0.0",
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
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
  resolve: {
    extensions: [".js", ".ts", ".css"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, `${BUILD_ROOT}/index.html`),
      template: "src/index.html",
      templateParameters: {
        OWN_ROOT_URL: process.env.OWN_ROOT_URL,
        TWITTER_SITE: process.env.TWITTER_SITE,
        IS_SEARCH_ENGINE_NO_INDEX:
          process.env.IS_SEARCH_ENGINE_NO_INDEX === "true",
        APP_DESCRIPTION: appDescription,
        FIRST_VIEW_CSS: readCSS(path.resolve(__dirname, "src/first-view.css")),
      },
      inject: true,
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/resources"),
          to: path.resolve(__dirname, BUILD_ROOT, DESKTOP_RESOURCE_ROOT),
        },
        {
          from: path.resolve(__dirname, "src/resources"),
          to: path.resolve(__dirname, BUILD_ROOT, MOBILE_RESOURCE_ROOT),
        },
        {
          from: path.resolve(__dirname, "src/manifest.json"),
          to: path.resolve(__dirname, BUILD_ROOT),
        },
        {
          from:
            process.env.IS_APP_ICON_DEV_ENABLE === "true"
              ? path.resolve(__dirname, "src/app-icon-dev-512x512.png")
              : path.resolve(__dirname, "src/app-icon-512x512.png"),
          to: path.resolve(__dirname, `${BUILD_ROOT}/app-icon-512x512.png`),
        },
        {
          from: path.resolve(__dirname, "src/ogp-thumbnail.png"),
          to: path.resolve(__dirname, BUILD_ROOT),
        },
        {
          from: path.resolve(__dirname, "src/pegass85.webp"),
          to: path.resolve(__dirname, BUILD_ROOT),
        },
      ],
    }),
    new webpack.DefinePlugin({
      GBRAVER_BURST_DESKTOP_RESOURCE_ROOT: JSON.stringify(
        DESKTOP_RESOURCE_ROOT,
      ),
      GBRAVER_BURST_MOBILE_RESOURCE_ROOT: JSON.stringify(MOBILE_RESOURCE_ROOT),
      GBRAVER_BURST_OWN_ROOT_URL: JSON.stringify(process.env.OWN_ROOT_URL),
      GBRAVER_BURST_HOW_TO_PLAY: JSON.stringify(process.env.HOW_TO_PLAY_URL),
      GBRAVER_BURST_TERMS_OF_SERVICE_URL: JSON.stringify(
        process.env.TERMS_OF_SERVICE_URL,
      ),
      GBRAVER_BURST_PRIVACY_POLICY_URL: JSON.stringify(
        process.env.PRIVACY_POLICY_URL,
      ),
      GBRAVER_BURST_CONTACT_URL: JSON.stringify(process.env.CONTACT_URL),
      GBRAVER_BURST_IS_SERVICE_WORKER_USED: JSON.stringify(
        process.env.IS_SERVICE_WORKER_USED,
      ),
      GBRAVER_BURST_IS_API_SERVER_ENABLE: JSON.stringify(
        process.env.IS_API_SERVER_ENABLE,
      ),
      GBRAVER_BURST_WEBSOCKET_API_URL: JSON.stringify(
        process.env.WEBSOCKET_API_URL,
      ),
      GBRAVER_BURST_COGNITO_USER_POOL_ID: JSON.stringify(
        process.env.COGNITO_USER_POOL_ID,
      ),
      GBRAVER_BURST_COGNITO_CLIENT_ID: JSON.stringify(
        process.env.COGNITO_CLIENT_ID,
      ),
      GBRAVER_BURST_COGNITO_HOSTED_UI_DOMAIN: JSON.stringify(
        process.env.COGNITO_HOSTED_UI_DOMAIN,
      ),
      GBRAVER_BURST_CAN_PLAY_EPISODE_IN_DEVELOPMENT: JSON.stringify(
        process.env.CAN_PLAY_EPISODE_IN_DEVELOPMENT,
      ),
      GBRAVER_BURST_SHOULD_LOAD_DEVELOPING_RESOURCE: JSON.stringify(
        process.env.SHOULD_LOAD_DEVELOPING_RESOURCE,
      ),
      GBRAVER_BURST_CAN_PLAY_DEVELOPING_ARMDOZER: JSON.stringify(
        process.env.CAN_PLAY_DEVELOPING_ARMDOZER,
      ),
      GBRAVER_BURST_CAN_PLAY_DEVELOPING_PILOT: JSON.stringify(
        process.env.CAN_PLAY_DEVELOPING_PILOT,
      ),
    }),
  ],
};
