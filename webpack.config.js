require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const Puid = require('puid');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const hash = new Puid().generate();
const BUILD_PATH = 'build/production';
const BUILD_RESOURCE_PATH = `resources/${hash}`;
const BUILD_INDEX_JS_PATH = `index.js`;

module.exports = {
  mode: 'development',
  entry: {
    [BUILD_INDEX_JS_PATH]: path.resolve(__dirname, 'src/js/index.js')
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
        BUILD_RESOURCE_PATH: BUILD_RESOURCE_PATH,
        BUILD_INDEX_JS_PATH: BUILD_INDEX_JS_PATH,
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
          to: path.resolve(__dirname, BUILD_PATH, BUILD_RESOURCE_PATH)
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
      GBRAVER_BURST_RESOURCE_HASH: JSON.stringify(BUILD_RESOURCE_PATH),
      GBRAVER_BURST_OWN_ROOT_URL: JSON.stringify(process.env.OWN_ROOT_URL),
      GBRAVER_BURST_HOW_TO_PLAY: JSON.stringify(process.env.HOW_TO_PLAY_URL),
      GBRAVER_BURST_IS_PERFORMANCE_STATS_VISIBLE: JSON.stringify(process.env.IS_PERFORMANCE_STATS_VISIBLE),
      GBRAVER_BURST_IS_SERVICE_WORKER_USED: JSON.stringify(process.env.IS_SERVICE_WORKER_USED),
      GBRAVER_BURST_API_SERVER_URL: JSON.stringify(process.env.API_SERVER_URL),
      GBRAVER_BURST_AUTH0_DOMAIN: JSON.stringify(process.env.AUTH0_DOMAIN),
      GBRAVER_BURST_AUTH0_CLIENT_ID: JSON.stringify(process.env.AUTH0_CLIENT_ID),
      GBRAVER_BURST_AUTH0_AUDIENCE: JSON.stringify(process.env.AUTH0_AUDIENCE),
    })
  ]
};