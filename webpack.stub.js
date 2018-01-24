const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const R = require('ramda');

/** スタブソースコードのベースとなるパス */
const STUB_PATH = path.resolve(__dirname, 'stub');

/** スタブをビルドしたものを配置するルートパス */
const SERVE_PATH = path.resolve(__dirname, 'build/stub');

/**
 * スタブファイルのリスト
 *
 * キー: htmlで表示するときのパス
 * 値: スタブファイルのパス
 */
const STUB_ENTRY_FILES = {
  'canvas/player-hp-gauge': `${STUB_PATH}/canvas/player-hp-gauge`,
  'canvas/enemy-hp-gauge': `${STUB_PATH}/canvas/enemy-hp-gauge`,
  'canvas/player-battery-gauge': `${STUB_PATH}/canvas/player-battery-gauge`,
  'canvas/enemy-battery-gauge': `${STUB_PATH}/canvas/enemy-battery-gauge`,
  'game-object/gauge/player-hp-gauge': `${STUB_PATH}/game-object/gauge/player-hp-gauge`,
  'game-object/gauge/enemy-hp-gauge': `${STUB_PATH}/game-object/gauge/enemy-hp-gauge`,
  'game-object/gauge/tween-group': `${STUB_PATH}/game-object/gauge/tween-group`,
  'game-object/gauge/player-battery-gauge': `${STUB_PATH}/game-object/gauge/player-battery-gauge`,
  'game-object/gauge/enemy-battery-gauge': `${STUB_PATH}/game-object/gauge/enemy-battery-gauge`,
  'game-object/armdozer/player-shin-braver': `${STUB_PATH}/game-object/armdozer/player-shin-braver`,
};

/**
 * スタブを動かすHTMLを生成するWebpackPlugin
 * 生成するファイルが多岐にわたるため、HtmlWebpackPluginも配列になる
 */
const OUTPUT_HTML_LIST = R.pipe(
  R.mapObjIndexed((value, key) => new HtmlWebpackPlugin({
    chunks: [key],
    filename: `${SERVE_PATH}/${key}.html`,
    template: 'template/index.html'
  })),
  R.values
)(STUB_ENTRY_FILES);

/**
 * リソースファイルをコピーするWebpackPlugin
 */
const COPY_RESOURCES = new CopyWebpackPlugin([{
  from: path.resolve(__dirname, "resources"),
  to: `${SERVE_PATH}/resources`
}]);

module.exports = {
  entry: STUB_ENTRY_FILES,
  output: {
    path: SERVE_PATH,
    filename: '[name].js'
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: SERVE_PATH,
    port: 8080
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: []
    .concat(OUTPUT_HTML_LIST)
    .concat(COPY_RESOURCES)
};