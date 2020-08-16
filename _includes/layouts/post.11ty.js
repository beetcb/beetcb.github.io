exports.data = {
    layout: "base",
    permalink: "posts/{{ post | removeAtSymbol }}/"
}

let formatDate = date => {
    const dateArr = date.toString().match(/^(?:\w+\s)(\w+)\s(\d+)\s(\d+)/);
    return `Posted date: ${dateArr[3]} ${dateArr[1]} ${dateArr[2]}`
}

exports.render = function(data) {
    return `
	<article class="article">
	    <h1 class="title">${ data.title }</h1>
	    <div class="location content">
		<a href="/">Home</a> ${ data.page.url }
		<time datetime="${ formatDate(data.date) }">${ formatDate(data.date) }</time>
	    </div>
	    <div class="content">
		${ data.content }
	    </div>
	    <div class="outline"></div>
	</article>

    `
}
