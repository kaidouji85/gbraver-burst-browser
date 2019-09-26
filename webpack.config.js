const path = require('path');
const webpack = require('webpack');
const Puid = require('puid');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const BUILD_PATH = 'build/production';

const resourceHash = new Puid().generate();
const cssHash = new Puid().generate();
const jsHash = new Puid().generate();

module.exports = {
  mode: 'development',
  entry: path.resolve(__dirname, 'src/js/index.js'),
  output: {
    path: path.resolve(__dirname, BUILD_PATH),
    filename: `${jsHash}-index.js`
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
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'gbraver-burst',
      filename: path.resolve(__dirname, `${BUILD_PATH}/index.html`),
      template: 'src/index.html',
      templateParameters: {
        css: cssHash,
        resource: resourceHash
      }
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "src/resources"),
        to: path.resolve(__dirname, BUILD_PATH, resourceHash)
      },
      {
        from: path.resolve(__dirname, "build/postcss"),
        to: path.resolve(__dirname, BUILD_PATH, cssHash)
      }
      ]),
    new webpack.DefinePlugin({
      GBRAVER_BURST_RESOURCE_HASH: JSON.stringify(resourceHash),
    }),
  ]
};