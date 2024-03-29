const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const htmlmin = require("./plugins/htmlmin.js");
const sass = require("./plugins/sass.js");
const { minify } = require("terser");
const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
    //Passthroughs
    eleventyConfig.addPassthroughCopy("./src/css/_fonts/*.woff2");
    eleventyConfig.addPassthroughCopy("./src/js/");
    eleventyConfig.addPassthroughCopy("./src/css/_fonts/*.ttf");
    eleventyConfig.addPassthroughCopy("./src/favicons/*.png");

    //Ignore drafts
    if (!process.argv.includes("--serve")) {
        eleventyConfig.ignores.add("**/_*.md");
    }

    //Plugins
    eleventyConfig.addPlugin(syntaxHighlight, {
        codeAttributes: {
            tabindex: 0
        }
    });

    //Filters
    //https://11ty.rocks/eleventyjs/dates/
    eleventyConfig.addFilter("postDate", (dateObj) => {
        return DateTime.fromJSDate(dateObj).setLocale("en-US").toLocaleString(DateTime.DATE_MED);
    });
    eleventyConfig.addFilter("urlFormatter", categories => {
        if (categories[2] === "All") {
            return categories[0];
        } else {
            return categories[0] + "/" + categories[2];
        }
    });
    eleventyConfig.addFilter("titleFormatter", categories => {
        if (categories[2] === "All") {
            return categories[0];
        } else {
            return categories[0] + " / " + categories[2];
        }
    });

    //Collections
    const collectionRoots = ["posts", "projects"];
    const categories = ["All", "Build", "Write", "Code"];
    for (const root of collectionRoots) {
        for (const category of categories) {
            eleventyConfig.addCollection(`${root}${category}Featured`, function (collectionApi) {
                const singleFeatured = collectionApi.getFilteredByGlob(`./src/${root}/*/*.md`).filter(item => {
                    if (category === "All") {
                        return item.data.tags.includes("featured");
                    } else {
                        return category === item.data.category && item.data.tags.includes("featured");
                    }
                }).pop();
                if (singleFeatured) {
                    singleFeatured.data.featured = true;
                }
                return [singleFeatured];
            });
            eleventyConfig.addCollection(`${root}${category}NotFeatured`, function (collectionApi) {
                return collectionApi.getFilteredByGlob(`./src/${root}/*/*.md`).filter(item => {
                    if (category === "All") {
                        return !item.data.featured;
                    } else {
                        return category === item.data.category && !item.data.featured;
                    }
                });
            });
        }
    }

    //Dependent on "serve"
    if (process.argv.includes("--serve")) {
        eleventyConfig.addWatchTarget("./src/**/*");
        eleventyConfig.addTransform("sass", (content, outputPath) => {
            return sass(content, outputPath, {
                src: "src",
                dest: "dist",
                inline: "none",
                sass: {
                    style: "expanded",
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
        // eleventyConfig.addTemplateFormats("js");
        // eleventyConfig.addExtension("js", {
        //     outputFileExtension: "js",
        //     compile: async function (inputContent) {
        //         const result = await minify(inputContent);
        //         return async (data) => {
        //             return result.code;
        //         };
        //     }
        // });
    } else {
        eleventyConfig.addTransform("sass", (content, outputPath) => {
            return sass(content, outputPath, {
                src: "src",
                dest: "dist",
                inline: "all",
                sass: {
                    style: "compressed",
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
        eleventyConfig.addTemplateFormats("js");
        eleventyConfig.addExtension("js", {
            outputFileExtension: "js",
            compile: async function (inputContent) {
                const result = await minify(inputContent);
                return async (data) => {
                    return result.code;
                };
            }
        });
    }

    //Proxy
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