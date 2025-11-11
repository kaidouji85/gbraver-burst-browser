// For more info, see https://github.com/storybookjs/eslint-plugin-storybook#configuration-flat-config-format
import storybook from "eslint-plugin-storybook";

const globals = require("globals");
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const jest = require("eslint-plugin-jest");
const simpleImportSort = require("eslint-plugin-simple-import-sort");

module.exports = [
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
    },
    rules: {
      "simple-import-sort/imports": "error",
      "simple-import-sort/exports": "error",
    },
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    rules: {
      "no-undef": "error",
    },
  },
  {
    files: ["eslint.config.js"],
    languageOptions: {
      sourceType: "commonjs",
    },
  },
  {
    files: ["test/**"],
    ...jest.configs["flat/recommended"],
    rules: {
      ...jest.configs["flat/recommended"].rules,
    },
  },
];
