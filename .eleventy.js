const pluginSyntaxHighlight = require('@11ty/eleventy-plugin-syntaxhighlight'),
  lazyImagesPlugin = require('eleventy-plugin-lazyimages'),
  yaml = require('js-yaml')

module.exports = eleventyConfig => {
  //add postIndex filter
  eleventyConfig.addFilter('removeAtSymbol', function (value) {
    return value.replace(/@/g, '')
  })

  // alias like
  const e = eleventyConfig

  /* plugin */
  e.addPlugin(pluginSyntaxHighlight)

  /* rendless but needed a copy */
  e.addPassthroughCopy('static/assets')

  /* default layout template */
  e.addLayoutAlias('base', 'layouts/base.11ty.js')
  e.addLayoutAlias('home', 'layouts/home.11ty.js')
  e.addLayoutAlias('post', 'layouts/post.11ty.js')

  /* use custom data as a blog config set -> Yaml */
  e.addDataExtension('yaml', contents => yaml.load(contents))

  return {
    dir: {
      input: 'src',
      output: 'dist',
    },

    templateFormats: ['html', 'md', '11ty.js', 'njk'],
    htmlTemplateEnging: 'njk',
    markdownTemplateEngine: 'njk',
  }
}
