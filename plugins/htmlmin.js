const htmlmin = require("html-minifier");

module.exports = function (content, outputPath) {
    if (outputPath && outputPath.endsWith("html")) {
        let minified = htmlmin.minify(content, {
            removeComments: true
        });
        return minified;
    } else {
        return content;
    }
}