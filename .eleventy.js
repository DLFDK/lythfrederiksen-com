const htmlmin = require("./plugins/htmlmin.js");
const sass = require("./plugins/sass.js");
const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
    //https://11ty.rocks/eleventyjs/dates/
    eleventyConfig.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).setLocale("en-US").toLocaleString(DateTime.DATE_MED);
    });

    eleventyConfig.addPassthroughCopy("./src/css/_fonts/*.woff2");
    eleventyConfig.addPassthroughCopy("./src/js/");
    eleventyConfig.addPassthroughCopy("./src/css/_fonts/*.ttf");
    if (process.argv.includes("--serve")) {
        eleventyConfig.addWatchTarget("./src/css/");
        eleventyConfig.addTransform("sass", (content, outputPath) => {
            return sass(content, outputPath, {
                src: "src",
                dest: "dist",
                inline: "none",
                sass: {
                    outputStyle: "expanded",
                    loadPaths: ["./src/css/"]
                }
            },
            );
        });
        eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
            return htmlmin(content, outputPath, {
                removeComments: true
            });
        });
    } else {
        eleventyConfig.addTransform("sass", (content, outputPath) => {
            return sass(content, outputPath, {
                src: "src",
                dest: "dist",
                inline: "all",
                sass: {
                    outputStyle: "compressed",
                    loadPaths: ["./src/css/"]
                }
            },
            );
        });
        eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
            return htmlmin(content, outputPath, {
                // collapseWhitespace: true,
                removeComments: true
            });
        });
    }

    if (process.argv.includes('--serve')) {
        const { createProxyMiddleware } = require('http-proxy-middleware');
        const proxy = createProxyMiddleware('/images', {
            target: 'https://ik.imagekit.io/',
            changeOrigin: true,
            pathRewrite: function (path, req) {
                return path.replace("images/https://ik.imagekit.io/", "");
            }
        });
        eleventyConfig.setBrowserSyncConfig({
            middleware: [proxy],
        });
    }

    return {
        markdownTemplateEngine: 'njk',
        dataTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dir: {
            input: "src",
            output: "dist"
        }
    }
}