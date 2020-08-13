class Base {
    getData($, data) {

	const head = `<head>
	    <meta charset="UTF-8">
	    <meta name="viewport" content="width=device-width, initial-scale=1.0">
	    <meta name="description" content="${ $.blog.description.metatag }">
	    <title>${ $.blog.title }</title>
	    <link rel="stylesheet" href="${ $.link.my_css }">
	    <link rel="stylesheet" href="${ $.link.highlight_css }">
	    <link rel="shortcut icon" href="/src/favicon.ico" type="image/x-icon">
	    <script defer src="/src/js/my.js"></script>
	    </head>
	`.trim()

	const body = `<body>
		<header class="header">
		   <a class="logo" href="/" target="_blank">
			<span>${ $.blog.description.logo }&nbsp</span>
			<img src="${ $.link.logo_src }">
		    </a>
		</header>
		<main class="main">
		${data.content} 
		</main>
		<footer class="footer">
				    <div class="footer-desc" style="font-size:14px">
			${ $.blog.description.footer } with <a style="color: skyblue;" href="https://www.11ty.dev/"
			    target="_blank">11ty</a>
		    </div>
		</footer>

	    </body>
	`.trim()
	
	return [head, body]

    }

    

    render(data) {
	let dataArray = this.getData(data.config, data);
	return `<!DOCTYPE html>
<html lang="en">` + dataArray[0] + dataArray[1] + `</html>`.trim()

    }

}

module.exports = Base;
