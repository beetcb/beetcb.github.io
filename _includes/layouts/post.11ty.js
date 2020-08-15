exports.data = {
    layout: "base",
    permalink: "posts/{{ post | removeAtSymbol }}/"
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
