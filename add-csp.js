const cheerio = require('cheerio');
const path = require("path");
const fs = require("fs");

console.log("start adding csp");

const INDEX_HTML_PATH = path.resolve(__dirname, "build/production/index.html");
const originIndexHTML = fs.readFileSync(INDEX_HTML_PATH, "utf-8");
const $ = cheerio.load = cheerio.load(originIndexHTML);
$("head").prepend(
  `<meta http-equiv="content-security-policy" content="script-src 'self'">`
);
console.log($.html());

console.log("end adding csp");