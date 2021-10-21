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

    

    if (process.argv.includes('--serve')) {
        const { createProxyMiddleware } = require('http-proxy-middleware');
        const proxy = createProxyMiddleware('/cloudinary', {
            target: 'http://localhost:8080/images/',
            changeOrigin: true,
            pathRewrite: function(path, req){
                return path.slice(path.lastIndexOf("/"));
            }
        });
        eleventyConfig.setBrowserSyncConfig({
            // open: true,
            middleware: [proxy],
            server: {
                baseDir: "./dist",
                routes: {
                    "/images": "./images"
                }
            }
        });
    }

    return {
        dir: {
            input: "src",
            output: "dist"
        }
    }
}