const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const R = require('ramda');
const BaseConfig = require('./webpack.config');

const STUB_PATH = path.resolve(__dirname, 'stub');
const SERVE_PATH = path.resolve(__dirname, 'build/stub');

/**
 * スタブファイルのリスト
 */
const STUB_ENTRY_FILES = {
  'school-field': `${STUB_PATH}/school-field.js`
};

/**
 * スタブを動かすHTMLのリスト
 */
const OUTPUT_HTMLS = R.pipe(
  R.mapObjIndexed((value, key) => new HtmlWebpackPlugin({
    chunks: [key],
    filename: `${SERVE_PATH}/${key}.html`
  })),
  R.values
)(STUB_ENTRY_FILES);

module.exports = R.merge(BaseConfig, {
  entry: STUB_ENTRY_FILES,
  output: {
    path: SERVE_PATH,
    filename: '[name].js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    port: 8080
  },
  plugins: OUTPUT_HTMLS.concat(
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, "resources"),
      to: SERVE_PATH
  }]))
});