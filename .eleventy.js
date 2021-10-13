module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./src/css/");
    eleventyConfig.addWatchTarget("./src/css/");
    eleventyConfig.setBrowserSyncConfig({
        open: true,
      });
    return {
        dir: {
            input: "src",
            output: "dist"
        }
    }
}