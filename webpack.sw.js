const path = require('path');
const BUILD_PATH = 'build/production';

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'service-worker/sw.js'),
  output: {
    path: path.resolve(__dirname, BUILD_PATH),
    filename: 'sw.js'
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
};