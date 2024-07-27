const fs = require("fs").promises;
const CleanCSS = require("clean-css");
const postcss = require("postcss");
const postcssPresetEnv = require("postcss-preset-env");

/**
 * クリティカルCSSを生成する
 * @param {string} cssFilePath CSSファイルのパス
 * @returns {Promise<string>} クリティカルCSS
 */
module.exports.createCriticalCSS = async function (cssFilePath) {
  const css = await fs.readFile(cssFilePath, "utf-8");
  const afterPostCSS = await postcss([postcssPresetEnv()]).process(css, {
    from: cssFilePath,
  });
  return new CleanCSS({}).minify(afterPostCSS.css).styles;
};
