const html = require("@html-eslint/eslint-plugin");
const parser = require("@html-eslint/parser");

module.exports = [
  html.configs["flat/recommended"],
  {
    files: ["**/*.hbs"],
    plugins: {
      "@html-eslint": html,
    },
    languageOptions: {
      parser,
    },
    rules: {
      "@html-eslint/attrs-newline": "off",
      "@html-eslint/require-doctype": "off",
      "@html-eslint/indent": ["error", 2],
      "@html-eslint/require-closing-tags": [
        "error",
        {
          selfClosing: "always",
        },
      ],
      "@html-eslint/no-extra-spacing-attrs": [
        "error",
        {
          enforceBeforeSelfClose: true,
        },
      ],
    },
  },
];
