const path = require('path');
const SERVE_PATH = path.resolve(__dirname, 'serve');

module.exports = {
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: SERVE_PATH,
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: SERVE_PATH,
    port: 8080
  },
  devtool: 'inline-source-map'
};