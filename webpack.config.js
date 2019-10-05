const path = require('path');
const webpack = require('webpack');
const Puid = require('puid');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const BUILD_PATH = 'build/production';
const resourceHash = new Puid().generate();
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
        test: /\.(?:js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
        ],
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'gbraver-burst',
      filename: path.resolve(__dirname, `${BUILD_PATH}/index.html`),
      template: 'src/index.html',
      templateParameters: {
        resource: resourceHash
      }
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "src/resources"),
        to: path.resolve(__dirname, BUILD_PATH, resourceHash)
      }
      ]),
    new webpack.DefinePlugin({
      GBRAVER_BURST_RESOURCE_HASH: JSON.stringify(resourceHash),
    }),
    new MiniCssExtractPlugin({
      filename: `${resourceHash}/bundle.css`
    })
  ]
};