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

    const collectionRoots = ["posts", "projects"];
    const categories = ["All", "Build", "Write", "Code"];
    for(const root of collectionRoots){
        for(const category of categories) {
            eleventyConfig.addCollection(`${root}${category}Featured`, function (collectionApi) {
                const singleFeatured = collectionApi.getFilteredByGlob(`./src/${root}/*.md`).filter(item => {
                    if (category === "All"){
                        return item.data.tags.includes("featured");
                    } else {
                        return category === item.data.category && item.data.tags.includes("featured");
                    }
                }).pop();
                if(singleFeatured){
                    singleFeatured.data.featured = true;
                }
                return [singleFeatured];
            });
            eleventyConfig.addCollection(`${root}${category}NotFeatured`, function (collectionApi) {
                return collectionApi.getFilteredByGlob(`./src/${root}/*.md`).filter(item => {
                    if (category === "All"){
                        return !item.data.featured;
                    } else {
                        return category === item.data.category && !item.data.featured;
                    }
                });
            });
        }
    }

    // eleventyConfig.addCollection("whatever", function (collectionApi) {
    //      console.log(collectionApi.getAll()[6].data);
    //      return collectionApi.getFilteredByGlob("./src/posts/*.md")
    // });

    // eleventyConfig.addCollection("asd", function (collectionApi) {

    //     const collection = collectionApi.getFilteredByGlob("./src/posts/*.md");
    //     const newCollection = collection.getFilteredByTag("write");
    //     console.log(collectionApi);
    //     return collectionApi.getFilteredByGlob("./src/posts/*.md");
    // });

    // eleventyConfig.addCollection("posts", function (collectionApi) {
    //     return collectionApi.getFilteredByGlob("./src/posts/*.md");
    // });
    // eleventyConfig.addCollection("featuredPost", function (collectionApi) {
    //     const featuredPost = collectionApi.getFilteredByTag("featured").pop();
    //     featuredPost.data.featured = true;
    //     return [featuredPost];
    // });
    // eleventyConfig.addCollection("notFeatured", function (collectionApi) {
    //     return collectionApi.getFilteredByGlob("./src/posts/*.md").reverse().filter(item => {
    //         return !item.data.featured;
    //     });
    // });
    // eleventyConfig.addCollection("projects", function (collectionApi) {
    //     return collectionApi.getFilteredByGlob("./src/projects/*.md");
    // });

    //Serve specific
    if (process.argv.includes("--serve")) {
        eleventyConfig.addWatchTarget("./src/css/");
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