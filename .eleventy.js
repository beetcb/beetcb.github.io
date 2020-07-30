const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight"),
      yaml = require("js-yaml");

module.exports = eleventyConfig => {
    /* plugin */
    eleventyConfig.addPlugin(pluginSyntaxHighlight);

    /* rendless but needed copy */
    eleventyConfig.addPassthroughCopy("src/");

    /* default layout template */
    eleventyConfig.addLayoutAlias('base', 'layouts/base.njk');
    eleventyConfig.addLayoutAlias('indexExtend', 'layouts/indexExtend.njk');
    eleventyConfig.addLayoutAlias('post', 'layouts/post.njk');
    
    /* use custom data as a blog config set -> Yaml */

    eleventyConfig.addDataExtension("yaml", contents => yaml.safeLoad(contents));

    return {
        /*
        dir: {
            input: "build",
            output: "sequel",
            includes: "templates"
        }, 
        custom 11ty settings
        */
        templateFormats: [
            "html",
            "md",
            "liquid",
            "njk"
        ],
        htmlTemplateEnging: "njk",
        markdownTemplateEngine: "njk"
    };
} 
