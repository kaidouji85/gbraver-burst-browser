import html from "@html-eslint/eslint-plugin";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.hbs"],
    plugins: {
      html,
    },
    extends: ["html/recommended"],
    language: "html/html",
    rules: {
      "html/attrs-newline": "off",
      "html/require-doctype": "off",
      "html/indent": ["error", 2],
      "html/require-closing-tags": [
        "error",
        {
          selfClosing: "always",
        },
      ],
      "html/no-extra-spacing-attrs": [
        "error",
        {
          enforceBeforeSelfClose: true,
        },
      ],
    },
  },
]);
