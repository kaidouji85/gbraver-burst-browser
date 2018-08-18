const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
  'canvas/battery-slider': `${STUB_PATH}/canvas/battery-slider`,
  'canvas/gauge': `${STUB_PATH}/canvas/gauge`,
  'game-object/armdozer/player-shin-braver': `${STUB_PATH}/game-object/armdozer/player-shin-braver`,
  'game-object/armdozer/enemy-shin-braver': `${STUB_PATH}/game-object/armdozer/enemy-shin-braver`,
  'game-object/armdozer/player-neo-landozer': `${STUB_PATH}/game-object/armdozer/player-neo-landozer`,
  'game-object/armdozer/enemy-neo-landozer': `${STUB_PATH}/game-object/armdozer/enemy-neo-landozer`,
  'game-object/gauge/player-hp-gauge': `${STUB_PATH}/game-object/gauge/player-hp-gauge`,
  'game-object/gauge/enemy-hp-gauge': `${STUB_PATH}/game-object/gauge/enemy-hp-gauge`,
  'game-object/gauge/tween-group': `${STUB_PATH}/game-object/gauge/tween-group`,
  'game-object/gauge/player-battery-gauge': `${STUB_PATH}/game-object/gauge/player-battery-gauge`,
  'game-object/gauge/enemy-battery-gauge': `${STUB_PATH}/game-object/gauge/enemy-battery-gauge`,
  'game-object/gauge/player-burst-gauge': `${STUB_PATH}/game-object/gauge/player-burst-gauge`,
  'game-object/gauge/enemy-burst-gauge': `${STUB_PATH}/game-object/gauge/enemy-burst-gauge`,
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
        template: 'template/index.html'
      })),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, "resources"),
      to: `${SERVE_PATH}/resources`
    }])
  ]
};