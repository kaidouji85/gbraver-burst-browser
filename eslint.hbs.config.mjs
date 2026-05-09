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
      "html/indent": "off",
      "html/require-closing-tags": [
        "error",
        {
          selfClosing: "always",
        },
      ],
      // Prettierでのフォーマットに寄せるため、スペース関連ルールはオフ
      "html/no-extra-spacing-attrs": "off",
      "html/no-extra-spacing-tags": "off",
    },
  },
]);
