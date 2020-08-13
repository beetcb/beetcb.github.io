class IndexExtend {

    data() {
	return {
	    layout: "base",
	    eleventyExcludeFromCollections: true
	}
    }
    
    // grab all blog Posts
    getPost(allPost) {

	return allPost.reduce(((last, cur) => {
	    cur =  `
		<a data-index="${ cur.data.post }" class="post" href="${ cur.url }">
		    <img class="post-nailimg" src="${ cur.data.nailimg }" alt="${ cur.data.title }">
		    <div class="description">
			<h1>${ cur.data.title }</h1>
			<small>
			${ cur.date.toDateString() }
			</small>
		    </div>
		</a>
	     `	
	    last += cur
	    return last
	}), '')

    }
    // grab all possible Tags
    getTag(allPost) {

	return allPost.reduce(((last, cur) => {
	    // if Tags embed multi tags
	    if (cur.data.tags.length > 1) { 
		// loop the indside
		cur = cur.data.tags.reduce(((lastI, curI)=>{
		    curI = `<a data-index="${ cur.data.post }" class="tag" href="${ cur.url }">
			    # ${ curI }
			    </a>`
		    lastI += curI;
		    return lastI;
		}), '')
		last += cur;
	    } else {
		cur = `
		    <a data-index="${ cur.data.post }" class="tag" href="${ cur.url }">
			# ${ cur.data.tags } 
		    </a>
		`
		last += cur;	

	    }	    


	return last;
	}), '')

    }

    render(data) {

	return `
	<div class="post-container">


	    <section id="postList" class="post-collection">
		${ this.getPost(data.collections.all) }
	    </section>



	    <section class="post-aside">

		<div class="profile">
		    ${ data.content } 
		</div>

		<div id="tagList" class="tagList">
		    ${ this.getTag(data.collections.all) }	
		</div>

	    </section>


	</div>`

    
    }
}
module.exports = IndexExtend;
