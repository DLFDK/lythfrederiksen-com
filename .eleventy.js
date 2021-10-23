const htmlmin = require("html-minifier");
const sass = require("sass");
const fs = require("fs");

module.exports = function (eleventyConfig) {
    eleventyConfig.addWatchTarget("./src/css/");

    eleventyConfig.addTransform("htmlmin", (content, outputPath) => {
        if (outputPath && outputPath.endsWith("html")) {
            let minified = htmlmin.minify(content, {
                removeComments: true
            });
            return minified;
        } else {
            return content;
        }
    });

    eleventyConfig.addTransform("css", (content, outputPath) => {
        if (outputPath && outputPath.endsWith("html")) {
            const styleLinks = content.matchAll(/<link.*rel="stylesheet".*>/g);
            if(styleLinks){
                let output = content;
                for (const [string] of styleLinks) {
                    const [, path, file, extension] = string.match(/href="[\.\/]*(.*\/)(.*)\.(s?[ac]ss)"/);
                    try {
                        const result = sass.renderSync({
                            file: `src/${path}${file}.${extension}`
                        });
                        if (string.includes("inline")) {
                            output = output.replace(string, `<style>${result.css}</style>`)
                        } else {
                            fs.mkdirSync(`dist/${path}`, { recursive: true })
                            fs.writeFileSync(`dist/${path}${file}.css`, result.css);
                            output = output.replace(string, `<link rel="stylesheet" href="/${path}${file}.css">`)
                        }
                    } catch (error) {
                        console.log(error);
                    }
                }
                return output;
            } else {
                return content //File does not have a stylesheet link
            }
        }
        return content; //File is not .html
    });

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