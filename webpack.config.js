require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const uuid = require('uuid');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const BUILD_ROOT = 'build/production';
const RESOURCE_HASH = uuid.v4();
const RESOURCE_ROOT = `resources/${RESOURCE_HASH}`;
const DESKTOP_RESOURCE_ROOT = `${RESOURCE_ROOT}/desktop`;
const MOBILE_RESOURCE_ROOT = `${RESOURCE_ROOT}/mobile`;
const OUTPUT_JS_NAME = `index.js`;

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/js/index.js'),
  output: {
    path: path.resolve(__dirname, BUILD_ROOT),
    filename: OUTPUT_JS_NAME
  },
  devServer: {
    static: path.resolve(__dirname, BUILD_ROOT),
    port: 8080,
    host:'0.0.0.0'
  },
  module: {
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
  resolve: {
    extensions: ['.js', '.css']
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, `${BUILD_ROOT}/index.html`),
      template: 'src/index.html',
      templateParameters: {
        INDEX_JS_PATH: OUTPUT_JS_NAME,
        OWN_ROOT_URL: process.env.OWN_ROOT_URL,
        TWITTER_SITE: process.env.TWITTER_SITE,
        IS_SEARCH_ENGINE_NO_INDEX: process.env.IS_SEARCH_ENGINE_NO_INDEX === 'true'
      },
      inject: false
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/resources"),
          to: path.resolve(__dirname, BUILD_ROOT, DESKTOP_RESOURCE_ROOT)
        },
        {
          from: path.resolve(__dirname, "src/resources"),
          to: path.resolve(__dirname, BUILD_ROOT, MOBILE_RESOURCE_ROOT)
        },
        {
          from: path.resolve(__dirname, "src/favicon.ico"),
          to: path.resolve(__dirname, BUILD_ROOT)
        },
        {
          from: path.resolve(__dirname, "src/favicon-16x16.png"),
          to: path.resolve(__dirname, BUILD_ROOT)
        },
        {
          from: path.resolve(__dirname, "src/favicon-32x32.png"),
          to: path.resolve(__dirname, BUILD_ROOT)
        },
        {
          from: path.resolve(__dirname, "src/manifest.json"),
          to: path.resolve(__dirname, BUILD_ROOT)
        },
        {
          from: path.resolve(__dirname, "src/app-icon.png"),
          to: path.resolve(__dirname, BUILD_ROOT)
        },
        {
          from: path.resolve(__dirname, "src/ogp-thumbnail.png"),
          to: path.resolve(__dirname, BUILD_ROOT)
        },
      ]
    }),
    new webpack.DefinePlugin({
      GBRAVER_BURST_DESKTOP_RESOURCE_ROOT: JSON.stringify(DESKTOP_RESOURCE_ROOT),
      GBRAVER_BURST_MOBILE_RESOURCE_ROOT: JSON.stringify(MOBILE_RESOURCE_ROOT),
      GBRAVER_BURST_OWN_ROOT_URL: JSON.stringify(process.env.OWN_ROOT_URL),
      GBRAVER_BURST_HOW_TO_PLAY: JSON.stringify(process.env.HOW_TO_PLAY_URL),
      GBRAVER_BURST_IS_PERFORMANCE_STATS_VISIBLE: JSON.stringify(process.env.IS_PERFORMANCE_STATS_VISIBLE),
      GBRAVER_BURST_IS_SERVICE_WORKER_USED: JSON.stringify(process.env.IS_SERVICE_WORKER_USED),
      GBRAVER_BURST_IS_API_SERVER_ENABLE: JSON.stringify(process.env.IS_API_SERVER_ENABLE),
      GBRAVER_BURST_API_SERVER_URL: JSON.stringify(process.env.API_SERVER_URL),
      GBRAVER_BURST_AUTH0_DOMAIN: JSON.stringify(process.env.AUTH0_DOMAIN),
      GBRAVER_BURST_AUTH0_CLIENT_ID: JSON.stringify(process.env.AUTH0_CLIENT_ID),
      GBRAVER_BURST_AUTH0_AUDIENCE: JSON.stringify(process.env.AUTH0_AUDIENCE),
    })
  ]
};