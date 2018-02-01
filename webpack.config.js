const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SERVE_PATH = path.resolve(__dirname, 'build/production');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  entry: {
    index: path.resolve(__dirname, 'src/index.js')
  },
  output: {
    path: SERVE_PATH,
    filename: '[name].js'
  },
  devServer: {
    contentBase: SERVE_PATH,
    port: 8080
  },
  //devtool: 'inline-source-map',
  module: {
    loaders: [
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
      filename: `${SERVE_PATH}/index.html`,
      template: 'template/index.html'
    }),
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, "resources"),
      to: SERVE_PATH
    }]),
    new WorkboxPlugin({
      globDirectory: 'build/production',
      globPatterns: ['**/*.{html,js,json,png}'],
      swDest: path.join('build/production', 'sw.js'),
      clientsClaim: true,
      skipWaiting: true,
    })
  ]
};