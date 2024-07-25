const postcssImport = require("postcss-import");
const postcssPresetEnv = require("postcss-preset-env");
const autoprefixer = require("autoprefixer");

module.exports = {
  plugins: [postcssImport(), postcssPresetEnv(), autoprefixer],
};
