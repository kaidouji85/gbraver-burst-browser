const webpack = require('webpack');
const config = require('./webpack.config');
const path = require('path');
const Puid = require('puid');

module.exports = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src/js/sw.js'),
  output: {
    path: config.output.path,
    filename: 'sw.js'
  },
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
    new webpack.DefinePlugin({
      REVISION_INDEX_HTML: JSON.stringify(new Puid().generate()),
      RUNTIME_CACHE_HASH: JSON.stringify(new Puid().generate()),
    }),
  ]
};