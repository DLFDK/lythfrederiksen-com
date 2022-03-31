const htmlmin = require("./plugins/htmlmin.js");
const sass = require("./plugins/sass.js");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./src/css/_fonts/");
    eleventyConfig.addPassthroughCopy("./src/images/");
    eleventyConfig.addPassthroughCopy("./src/js/");
    if (process.argv.includes("--serve")) {
        eleventyConfig.addWatchTarget("./src/css/");
        eleventyConfig.addTransform("sass", (content, outputPath) => {
            return sass(content, outputPath, {
                src: "src",
                dest: "dist",
                inline: "none",
                sass: {
                    outputStyle: "expanded"
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
        eleventyConfig.ignores.add("./src/copy/");
        eleventyConfig.addTransform("sass", (content, outputPath) => {
            return sass(content, outputPath, {
                src: "src",
                dest: "dist",
                inline: "none",
                sass: {
                    outputStyle: "compressed"
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

    // if (process.argv.includes('--serve')) {
    //     const { createProxyMiddleware } = require('http-proxy-middleware');
    //     const proxy = createProxyMiddleware('/cloudinary', {
    //         target: 'http://localhost:8080/images/',
    //         changeOrigin: true,
    //         pathRewrite: function(path, req){
    //             return path.slice(path.lastIndexOf("/"));
    //         }
    //     });
    //     eleventyConfig.setBrowserSyncConfig({
    //         open: true,
    //         middleware: [proxy],
    //         server: {
    //             baseDir: "./dist",
    //             routes: {
    //                 "/images": "./images"
    //             }
    //         }
    //     });
    // }

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