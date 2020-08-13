class Post {

    data() {
	return {
	    layout: "base",
	    permalink: "post/{{ post }}/index.html"
	}
    } 

    render(data) {
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
}


module.exports = Post;
