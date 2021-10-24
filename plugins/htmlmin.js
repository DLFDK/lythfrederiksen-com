const htmlmin = require("html-minifier");

module.exports = function (content, outputPath, options) {
    if (outputPath && outputPath.endsWith("html")) {
        return htmlmin.minify(content, options);
    } else {
        return content;
    }
}