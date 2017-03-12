var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var R = require('ramda');
var BaseConfig = require('./webpack.config');

var STUB_ENTRY_FILES = {
  'school': path.resolve(__dirname, 'stub/school-field')
};

var OUTPUT_HTMLS = R.pipe(
  R.mapObjIndexed((value, key) => new HtmlWebpackPlugin({
    chunks: [key],
    filename: path.resolve(__dirname, `serve/stub/${key}.html`)
  })),
  R.values
)(STUB_ENTRY_FILES);

module.exports = R.merge(BaseConfig, {
  entry: STUB_ENTRY_FILES,
  output: {
    path: path.resolve(__dirname, 'serve/stub'),
    filename: '[name].js'
  },
  plugins: OUTPUT_HTMLS
});