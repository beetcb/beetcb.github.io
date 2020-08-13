const pluginSyntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight"),
      yaml = require("js-yaml");

module.exports = eleventyConfig => {

    // alias like
    const e = eleventyConfig;

    /* plugin */
    e.addPlugin(pluginSyntaxHighlight);

    /* rendless but needed copy */
    e.addPassthroughCopy("src/");

    /* default layout template */
    e.addLayoutAlias('base', 'layouts/base.11ty.js');
    e.addLayoutAlias('indexExtend', 'layouts/indexExtend.11ty.js');
    e.addLayoutAlias('post', 'layouts/post.11ty.js');
    
    /* use custom data as a blog config set -> Yaml */
    e.addDataExtension("yaml", contents => yaml.safeLoad(contents));

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
            "11ty.js"
        ],
        htmlTemplateEnging: "njk",
        markdownTemplateEngine: "njk"
    };
} 
