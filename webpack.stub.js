const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

/** スタブソースコードのベースとなるパス */
const STUB_PATH = path.resolve(__dirname, 'src/stub');

/** スタブをビルドしたものを配置するルートパス */
const SERVE_PATH = path.resolve(__dirname, 'build/stub');

/**
 * スタブファイルのリスト
 *
 * キー: htmlで表示するときのパス
 * 値: スタブファイルのパス
 */
const STUB_ENTRY_FILES = {
  'canvas/battery-slider': `${STUB_PATH}/canvas/battery-slider`,
  'canvas/gauge': `${STUB_PATH}/canvas/gauge`
};

module.exports = {
  mode: 'development',
  entry: STUB_ENTRY_FILES,
  output: {
    path: SERVE_PATH,
    filename: '[name].js'
  },
  devtool: 'source-map',
  devServer: {
    contentBase: SERVE_PATH,
    port: 8080
  },
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
    ...Object.keys(STUB_ENTRY_FILES).map(key =>
      new HtmlWebpackPlugin({
        chunks: [key],
        filename: `${SERVE_PATH}/${key}.html`,
        template: 'html/index.html'
      })),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, "resources"),
      to: `${SERVE_PATH}/resources`
    }])
  ]
};