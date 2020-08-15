class Home {

    data() {
        return {
            layout: "base",
            eleventyExcludeFromCollections: true
        }
    }

    // grab all blog Posts
    getPost(pageIndex) {

/*        return allPost.reduce(((last, cur) => {
            cur = `
		<a data-index="${ cur.data.post}" class="post" href="${cur.url}">
		    <img class="post-nailimg" src="${ cur.data.nailimg}" alt="${cur.data.title}">
		    <div class="description">
			<h1>${ cur.data.title}</h1>
			<small>
			${ cur.date.toDateString()}
			</small>
		    </div>
		</a>
	     `
            last += cur
            return last
        }), '')
*/	
	return;

    }
    // grab all possible Tags
    getTag(tags, array = []) {

	for(let i in tags) {array.push(i)}
	array.shift();

	return 	array.reduce((string, cur) => {
	    cur = `
		<span class="tag" data-index="${ this.getTagIndex(tags, cur) }">
		    # ${ cur }
		</span> 
	    `.trim();
	    string += cur;

	    return string;
	},'')

    }
    // getTagIndex
    getTagIndex(tags, cur) {

	    return tags[cur].length>1
		&&
		(tags[cur].reduce((stringI, curI) => {
		    stringI += curI.data.post;
		    return stringI;
		},''))
		||
		(tags[cur][0].data.post)

    }

    render(data) {
        const socialIcon = data.config.blog.components.sociallogo,

        // store social data in array
        array = [];
        for (let i in socialIcon) {
            array.push(`<a href="${socialIcon[i]}">
                          <svg class="svg-icon">
                              <use xlink:href="/src/icon.svg#${ i}" /></svg>
                      </a>
              `.trim())
        }
        return `
	<div class="post-container">
	    <section id="postList" class="post-collection">
            ${ data.content }
        </section>
        
        <section class="post-aside">
            <section class="header">
                <img src="https://cdn.jsdelivr.net/gh/beetcb/pic/logo.svg">
                <a href="/">Home</a>&nbsp;|&nbsp;
                <a href="/tags/">Tags</a>&nbsp;|&nbsp;
                <a href="/about/">About</a>
            </section>
            <p class="beetsaid">
                d ${array[0]} r
                ${array[3]} o
                ${array[5]} p
                ${array[4]} i
                ${array[6]} c
                ${array[2]} e
		    </p>
            <div id="tagList" class="tagList">
                ${ this.getTag(data.collections)}	
            </div>
        </section>
	</div>`


    }
}
module.exports = Home;
