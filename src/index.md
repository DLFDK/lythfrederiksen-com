---
title: A dark place...
layout: base.njk
templateEngineOverride: njk,md
---
<!-- Comment -->
```javascript
const htmlmin = require("./plugins/htmlmin.js");
const sass = require("./plugins/sass.js");

module.exports = function (eleventyConfig) {
    if( process.argv.includes("--serve")){
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
        eleventyConfig.addTransform("sass", (content, outputPath) => {
            return sass(content, outputPath, {
                src: "src",
                dest: "dist",
                inline: "all",
                sass: {
                    outputStyle: "compressed"
                }
            },
            );
        });
        eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
            return htmlmin(content, outputPath, {
                collapseWhitespace: true,
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
        dir: {
            input: "src",
            output: "dist"
        }
    }
}
```