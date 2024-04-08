const globals = require("globals");
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const jest = require("eslint-plugin-jest");
const simpleImportSort = require("eslint-plugin-simple-import-sort");
// const html = require("@html-eslint/eslint-plugin");
// const htmlParser = require("@html-eslint/parser");

module.exports = [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  //html,
  // TODO srcとそれ以外でglobalsを出し分けする
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      }
    }
  },
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "no-undef": "error",
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  {
    files: ["test/**"],
    ...jest.configs["flat/recommended"],
    rules: {
      ...jest.configs["flat/recommended"].rules,
    },
  },
  // {
  //   files: ["**/*.hbs"],
  //   plugins: {
  //     "@html-eslint": html,
  //   },
  //   languageOptions: {
  //     parser: htmlParser,
  //   },
  //   rules: {
  //     "@html-eslint/require-doctype": "off",
  //     "@html-eslint/indent": ["error", 2],
  //     "@html-eslint/require-closing-tags": [
  //       "error",
  //       {
  //         selfClosing: "always",
  //       },
  //     ],
  //     "@html-eslint/no-extra-spacing-attrs": [
  //       "error",
  //       {
  //         enforceBeforeSelfClose: true,
  //       },
  //     ],
  //   },
  // },
];
