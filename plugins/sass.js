const sass = require("sass");
const fs = require("fs");

module.exports = function (content, outputPath, options) {
    if (outputPath && outputPath.endsWith("html")) {
        const styleLinks = content.matchAll(/<link.*rel="stylesheet".*>/g);
        if(styleLinks){
            let output = content;
            for (const [string] of styleLinks) {
                const [, path, file, extension] = string.match(/href="[\.\/]*(.*\/)(.*)\.(s?[ac]ss)"/);
                try {
                    const result = sass.renderSync({
                        file: `src/${path}${file}.${extension}`,
                        ...options
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
            return content //Content does not have a stylesheet link
        }
    }
    return content; //Content is not .html
}