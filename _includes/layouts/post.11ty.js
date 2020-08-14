exports.data = {
    layout: "base",
    permalink: "post/{{ post }}/index.html"
}

exports.render = function(data) {
    return `
	<article style="margin: 0 auto" class="article">
	    <h1 class="title">${ data.title }</h1>
	    <div class="content">
		${ data.content }
	    </div>
	    <div class="outline"></div>
	</article>

    `
}
