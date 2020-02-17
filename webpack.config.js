require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const Puid = require('puid');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const hash = new Puid().generate();
const BUILD_PATH = 'build/production';
const BUILD_RESOURCE_PATH = `${hash}`;
const BUILD_INDEX_JS_PATH = `${hash}-index.js`;
const BUILD_CSS_PATH = `${BUILD_RESOURCE_PATH}/bundle.css`;

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
    contentBase: path.resolve(__dirname, BUILD_PATH),
    port: 8080,
    host:'0.0.0.0'
  },
  devtool: 'source-map',
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
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, `${BUILD_PATH}/index.html`),
      template: 'src/index.html',
      templateParameters: {
        BUILD_RESOURCE_PATH: BUILD_RESOURCE_PATH,
        BUILD_INDEX_JS_PATH: BUILD_INDEX_JS_PATH,
        BUILD_CSS_PATH: BUILD_CSS_PATH,
      },
      inject: false
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "src/resources"),
        to: path.resolve(__dirname, BUILD_PATH, BUILD_RESOURCE_PATH)
      }
    ]),
    new webpack.DefinePlugin({
      GBRAVER_BURST_RESOURCE_HASH: JSON.stringify(BUILD_RESOURCE_PATH),
      GBRAVER_BURST_HOW_TO_PLAY: JSON.stringify(process.env.HOW_TO_PLAY_URL),
    }),
    new MiniCssExtractPlugin({
      filename: BUILD_CSS_PATH
    })
  ]
};