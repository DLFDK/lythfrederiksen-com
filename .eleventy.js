module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("./src/images/");
    eleventyConfig.addPassthroughCopy("./src/css/");
    eleventyConfig.addWatchTarget("./src/css/");

    if (process.argv.includes('--serve')) {
        const { createProxyMiddleware } = require('http-proxy-middleware');
        const proxy_dmi = createProxyMiddleware('/images', {
            target: 'https://res.cloudinary.com/dypwsyigo/image/upload/lythfrederiksen-com',
            changeOrigin: true,
            pathRewrite: {
                '^/images*': '/' // remove base path
            }
        });
        eleventyConfig.setBrowserSyncConfig({
            open: true,
            middleware: [proxy_dmi]
        });
    }

    return {
        dir: {
            input: "src",
            output: "dist"
        }
    }
}