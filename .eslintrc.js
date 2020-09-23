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
        // webpack.config.js Webpack Define Pluginで定義したグローバル変数
        GBRAVER_BURST_RESOURCE_HASH: true,
        GBRAVER_BURST_HOW_TO_PLAY: true,

        // webpack.sw.js Webpack Define Pluginで定義したグローバル変数
        GBRAVER_BURST_SW_BUILD_HASH: true,
    }
};