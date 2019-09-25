const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BUILD_PATH = 'build/production';

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/js/clear-sw.js'),
  output: {
    path: path.resolve(__dirname, BUILD_PATH),
    filename: 'clear-sw.js'
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
      title: 'clear-sw',
      filename: path.resolve(__dirname, `${BUILD_PATH}/clear-sw.html`),
      template: 'html/clear-sw.html'
    })
  ]
};