module.exports = {
    "env": {
        "browser": true,
        "es6": true
    },
    "parser": "babel-eslint",
    "plugins": [
      "flowtype"
    ],
    "extends": "eslint:recommended",
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "rules": {
    }
};
