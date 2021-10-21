---
title: A dark place...
layout: base.njk
templateEngineOverride: njk,md
---
```javascript
const htmlmin = require("html-minifier");

module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./src/css/");
    eleventyConfig.addWatchTarget("./src/css/");

    eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
            if ( outputPath && outputPath.endsWith("html")){
                let minified = htmlmin.minify(content, {
                    removeComments: true
                });
                return minified;
            } else {
                return content;
            }
        });

    return {
        dir: {
            input: "src",
            output: "dist"
        }
    }
}
```