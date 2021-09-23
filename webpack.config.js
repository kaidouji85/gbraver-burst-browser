require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const uuid = require('uuid');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const BUILD_PATH = 'build/production';
const RESOURCE_HASH = uuid.v4();
const RESOURCE_ROOT_PATH = `resources/${RESOURCE_HASH}`;
const INDEX_JS_PATH = `index.js`;

module.exports = {
  mode: 'development',
  entry: {
    [INDEX_JS_PATH]: path.resolve(__dirname, 'src/js/index.js')
  },
  output: {
    path: path.resolve(__dirname, BUILD_PATH),
    filename: '[name]'
  },
  devServer: {
    static: path.resolve(__dirname, BUILD_PATH),
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
      filename: path.resolve(__dirname, `${BUILD_PATH}/index.html`),
      template: 'src/index.html',
      templateParameters: {
        BUILD_INDEX_JS_PATH: INDEX_JS_PATH,
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
          to: path.resolve(__dirname, BUILD_PATH, RESOURCE_ROOT_PATH)
        },
        {
          from: path.resolve(__dirname, "src/favicon.ico"),
          to: path.resolve(__dirname, BUILD_PATH)
        },
        {
          from: path.resolve(__dirname, "src/favicon-16x16.png"),
          to: path.resolve(__dirname, BUILD_PATH)
        },
        {
          from: path.resolve(__dirname, "src/favicon-32x32.png"),
          to: path.resolve(__dirname, BUILD_PATH)
        },
        {
          from: path.resolve(__dirname, "src/manifest.json"),
          to: path.resolve(__dirname, BUILD_PATH)
        },
        {
          from: path.resolve(__dirname, "src/app-icon.png"),
          to: path.resolve(__dirname, BUILD_PATH)
        },
        {
          from: path.resolve(__dirname, "src/ogp-thumbnail.png"),
          to: path.resolve(__dirname, BUILD_PATH)
        },
      ]
    }),
    new webpack.DefinePlugin({
      GBRAVER_BURST_RESOURCE_ROOT: JSON.stringify(RESOURCE_ROOT_PATH),
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