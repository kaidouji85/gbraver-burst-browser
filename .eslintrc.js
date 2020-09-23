module.exports = {
    "extends": [
        "eslint:recommended",
        "plugin:flowtype/recommended"
    ],
    "env": {
        browser: true,
        node: true,
        es6: true,
    },
    "plugins": [
        "flowtype"
    ],
    "rules": {
        "no-undef":　"error"
    },
    "globals": {
        // flow-typed/gbraver-burst.js配下で定義したグローバル変数
        GBRAVER_BURST_RESOURCE_HASH: true,
        GBRAVER_BURST_HOW_TO_PLAY: true,

        // flow-typed/sw.js配下で定義したグローバル変数
        BUILD_HASH: true,
    }
};