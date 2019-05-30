const path = require('path');
const webpack = require('webpack');
const Puid = require('puid');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BUILD_PATH = 'build/production';

const resourceHash = new Puid().generate();

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, BUILD_PATH),
    filename: 'index.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, BUILD_PATH),
    port: 8080
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'study-three-js',
      filename: path.resolve(__dirname, `${BUILD_PATH}/index.html`),
      template: 'template/index.html'
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, "resources"),
      to: path.resolve(__dirname, BUILD_PATH, resourceHash)
    }, {
      from: path.resolve(__dirname, "manifest.json"),
      to: path.resolve(__dirname, BUILD_PATH)
    }, {
      from: path.resolve(__dirname, "app-icon.png"),
      to: path.resolve(__dirname, BUILD_PATH)
    }]),
    new webpack.DefinePlugin({
      GBRAVER_BURST_RESOURCE_HASH: JSON.stringify(resourceHash),
    }),
  ]
};