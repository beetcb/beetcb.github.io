class Base {
  /**
   * Create head(part) for better SEO
   *
   * @param {Object} $ global config file
   * @param {Object} data global data collection
   * @return {String} actual code
   */
  betterSeo($, data) {
    // in case of 'undefined'
    const get = getWhat => (getWhat && `${getWhat} |`) || ''

    // shorten code (* ￣︿￣)
    const [thisTitle, blogTitle, thisSum, descr] = [
      get(data.title),
      $.blog.title,
      get(data.summary),
      $.blog.description.metatag,
    ]

    return `<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>${thisTitle} ${blogTitle}</title>
    <link type="text/css" rel="stylesheet" href="${$.link.css}">
		<meta name="description" content="${thisSum} ${descr}">
		<meta name="title" content="${thisTitle} ${blogTitle}">
		<meta property="og:site_name" content="${$.blog.site_name}">
		<meta property="og:url" content="${$.blog.url}">
		<meta property="og:type" content="website">
		<meta property="og:title" content="${thisTitle} ${blogTitle}">
		<meta property="og:description" content="${thisSum} ${descr}">
	  <link rel="icon" href="${$.link.favicon}">`
  }

  /**
   * Create Main HTML code
   *
   * @param $ global config file
   * @param data global data collection
   * @return {Array} [codePartOne, codePartTwo]
   */
  getMain($, data) {
    const head = `
    <head>
	    ${this.betterSeo($, data)}
	    ${this.cleanCss($, data.page.url)}
      <script src="${$.link.packed_js}" defer></script>
      <script src="${$.link.turbolinks}"></script>
	  </head>
	`

    const body = `<body>
      <main class="main">
      ${data.content} 
      </main>
      <footer class="footer">
        <div class="footer-desc">
        ${$.blog.description.footer}<a style="color: skyblue;" href="https://www.11ty.dev/"
            target="_blank">11ty</a> by beet <br> 
        <a href="http://www.beian.miit.gov.cn/" target="_blank">ICP-20003648-1</a>
        </div>
      </footer>
	  </body>`

    return [head, body]
  }

  /**
   * Create <style></style> stylesheet
   *
   * @param {Object} $ global config file
   * @param {String} url - page url adress
   * @return {String} actual html code
   */
  cleanCss = ($, url) =>
    (url !== '/' &&
      url.match(/(tag)|(about)/g) &&
      `<style>
	    ol,ul {
		display: block !important;
	    }
	    .post-aside {
		order: -1;
	    }
	    .post-container {
		flex-flow: column nowrap;
		align-items: center;
	    }
	    .post-aside,
	    .post-container {
		width: 100%
	    }
	    .subPage ul {
	        padding-bottom: 2em;
		padding-left: 0;
		color: var(--link);
		font-size: 1.3em;
		line-height: 1.5em;

	    }
	    .subPage ul li {
		font-size: .8em;
		color: var(--text)
	    }
	</style>`) ||
    ''

  render(data) {
    let dataArray = this.getMain(data.config, data)
    return (
      `<!DOCTYPE html>
      <html>` +
      dataArray[0] +
      dataArray[1] +
      `</html>`
    )
  }
}

module.exports = Base
