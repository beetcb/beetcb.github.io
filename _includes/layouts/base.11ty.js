class Base {


    getData($, data) {
	const head = `<head>
	    <meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <meta name="description" content="${ $.blog.description.metatag }">
	    <meta name="pageurl" content="${ data.page.url }">
	    <title>${ $.blog.title }</title>
	    <link rel="stylesheet" href="${ $.link.my_css }">
	    <link rel="stylesheet" href="${ $.link.highlight_css }">
	    <link rel="shortcut icon" href="/src/favicon.ico" type="image/x-icon">
	    ${ this.changeJsnCss($, data.page.url) }
	    </head>
	`.trim()

	const body = `<body>
	    <main class="main">
		${ data.content } 
		</main>
		<footer class="footer">
		    <div class="footer-desc">
			${ $.blog.description.footer }<a style="color: skyblue;" href="https://www.11ty.dev/"
			    target="_blank">11ty</a> by beet <br> 
			<a href="http://www.beian.miit.gov.cn/" target="_blank">ICP-20003648-1</a>
		    </div>
		</footer>

	    </body>
	`.trim()
	
	return [head, body]

    }


    changeJsnCss = ($, url) =>  ( url!=='/' && url.match(/(tag)|(about)/g) ) 
	&&
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
	</style>`.trim() 

	||
	(url==='/' && `<script defer src="${ $.link.my_js }"></script>` || '')


    render(data) {
	let dataArray = this.getData(data.config, data);
	return `<!DOCTYPE html>
<html lang="en">` + dataArray[0] + dataArray[1] + `</html>`.trim()

    }

}

module.exports = Base;
