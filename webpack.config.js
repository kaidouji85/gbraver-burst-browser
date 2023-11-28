require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const uuid = require('uuid');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {appDescription} = require('./app-description');

const BUILD_ROOT = 'build/production';
const RESOURCE_HASH = uuid.v4();
const RESOURCE_ROOT = `resources/${RESOURCE_HASH}`;
const DESKTOP_RESOURCE_ROOT = `${RESOURCE_ROOT}/desktop`;
const MOBILE_RESOURCE_ROOT = `${RESOURCE_ROOT}/mobile`;
const OUTPUT_JS_NAME = `index.js`;

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/js/index.ts'),
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
      },
      {
        test: /\.hbs$/i,
        use: 'handlebars-loader',
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.css']
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, `${BUILD_ROOT}/index.html`),
      template: 'src/index.html',
      templateParameters: {
        INDEX_JS_PATH: OUTPUT_JS_NAME,
        OWN_ROOT_URL: process.env.OWN_ROOT_URL,
        TWITTER_SITE: process.env.TWITTER_SITE,
        IS_SEARCH_ENGINE_NO_INDEX: process.env.IS_SEARCH_ENGINE_NO_INDEX === 'true',
        GOOGLE_MEASUREMENT_ID:  process.env.GOOGLE_MEASUREMENT_ID,
        APP_DESCRIPTION: appDescription,
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
          from: path.resolve(__dirname, "src/manifest.json"),
          to: path.resolve(__dirname, BUILD_ROOT)
        },
        {
          from: process.env.IS_APP_ICON_DEV_ENABLE === 'true'
            ? path.resolve(__dirname, "src/app-icon-dev-512x512.png")
            : path.resolve(__dirname, "src/app-icon-512x512.png"),
          to: path.resolve(__dirname, `${BUILD_ROOT}/app-icon-512x512.png`)
        },
        {
          from: path.resolve(__dirname, "src/ogp-thumbnail.png"),
          to: path.resolve(__dirname, BUILD_ROOT)
        },
        {
          from: path.resolve(__dirname, "src/pegass85.webp"),
          to: path.resolve(__dirname, BUILD_ROOT)
        },
      ]
    }),
    new webpack.DefinePlugin({
      GBRAVER_BURST_DESKTOP_RESOURCE_ROOT: JSON.stringify(DESKTOP_RESOURCE_ROOT),
      GBRAVER_BURST_MOBILE_RESOURCE_ROOT: JSON.stringify(MOBILE_RESOURCE_ROOT),
      GBRAVER_BURST_OWN_ROOT_URL: JSON.stringify(process.env.OWN_ROOT_URL),
      GBRAVER_BURST_HOW_TO_PLAY: JSON.stringify(process.env.HOW_TO_PLAY_URL),
      GBRAVER_BURST_TERMS_OF_SERVICE_URL: JSON.stringify(process.env.TERMS_OF_SERVICE_URL),
      GBRAVER_BURST_PRIVACY_POLICY_URL: JSON.stringify(process.env.PRIVACY_POLICY_URL),
      GBRAVER_BURST_CONTACT_URL: JSON.stringify(process.env.CONTACT_URL),
      GBRAVER_BURST_IS_SERVICE_WORKER_USED: JSON.stringify(process.env.IS_SERVICE_WORKER_USED),
      GBRAVER_BURST_IS_API_SERVER_ENABLE: JSON.stringify(process.env.IS_API_SERVER_ENABLE),
      GBRAVER_BURST_REST_API_URL: JSON.stringify(process.env.REST_API_URL),
      GBRAVER_BURST_WEBSOCKET_API_URL: JSON.stringify(process.env.WEBSOCKET_API_URL),
      GBRAVER_BURST_AUTH0_DOMAIN: JSON.stringify(process.env.AUTH0_DOMAIN),
      GBRAVER_BURST_AUTH0_CLIENT_ID: JSON.stringify(process.env.AUTH0_CLIENT_ID),
      GBRAVER_BURST_AUTH0_AUDIENCE: JSON.stringify(process.env.AUTH0_AUDIENCE),
      GBRAVER_BURST_CAN_PLAY_EPISODE_IN_DEVELOPMENT: JSON.stringify(process.env.CAN_PLAY_EPISODE_IN_DEVELOPMENT),
      GBRAVER_BURST_SHOULD_LOAD_DEVELOPING_RESOURCE: JSON.stringify(process.env.SHOULD_LOAD_DEVELOPING_RESOURCE),
      GBRAVER_BURST_CAN_PLAY_DEVELOPING_ARMDOZER: JSON.stringify(process.env.CAN_PLAY_DEVELOPING_ARMDOZER),
      GBRAVER_BURST_CAN_PLAY_DEVELOPING_PILOT: JSON.stringify(process.env.CAN_PLAY_DEVELOPING_PILOT),
    })
  ]
};