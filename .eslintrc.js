module.exports = {
    "parser": "@babel/eslint-parser",
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
        GBRAVER_BURST_DESKTOP_RESOURCE_ROOT: true,
        GBRAVER_BURST_MOBILE_RESOURCE_ROOT: true,
        GBRAVER_BURST_OWN_ROOT_URL: true,
        GBRAVER_BURST_HOW_TO_PLAY: true,
        GBRAVER_BURST_TERMS_OF_SERVICE_URL: true,
        GBRAVER_BURST_PRIVACY_POLICY_URL: true,
        GBRAVER_BURST_CONTACT_URL: true,
        GBRAVER_BURST_IS_PERFORMANCE_STATS_VISIBLE: true,
        GBRAVER_BURST_IS_SERVICE_WORKER_USED: true,
        GBRAVER_BURST_IS_API_SERVER_ENABLE: true,
        GBRAVER_BURST_API_SERVER_URL: true,
        GBRAVER_BURST_AUTH0_DOMAIN: true,
        GBRAVER_BURST_AUTH0_CLIENT_ID: true,
        GBRAVER_BURST_AUTH0_AUDIENCE: true,

        // webpack.sw.js Webpack Define Pluginで定義したグローバル変数
        GBRAVER_BURST_SW_BUILD_HASH: true,
    }
};