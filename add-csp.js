const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs");

/** @type {string} index.htmlのパス */
const INDEX_HTML_PATH = path.resolve(__dirname, "build/production/index.html");

console.log("start adding csp");

const originIndexHTML = fs.readFileSync(INDEX_HTML_PATH, "utf-8");
const $ = (cheerio.load = cheerio.load(originIndexHTML));
$("head").prepend(
  `<meta http-equiv="Content-Security-Policy" content="script-src 'self'">`,
);
const modifiedIndexHTML = $.html();
fs.writeFileSync(INDEX_HTML_PATH, modifiedIndexHTML, "utf-8");

console.log("end adding csp");
