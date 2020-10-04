class Home {
	data() {
		return {
			layout: 'base',
		}
	}

	/**
	 * Grab all possible Tags
	 *
	 * @parma {Object} data global data collection
	 * @parma {Object} tags tags collection Object
	 * @return {String} <a> link tags
	 */
	getTag(data, tags) {
		if (!/(pages)|(^\/$)/.test(data.page.url)) {
			return ''
		} else {
			return (
				'<div id="tagList" class="tagList">' +
				Object.keys(tags)
					.slice(1)
					.reduce((string, cur) => {
						cur = `
		    <span class="tag" data-index="${this.getTagIndex(tags, cur)}">
			# ${cur}
		    </span> 
	    `.trim()
						string += cur
						return string
					}, '') +
				'</div>'
			)
		}
	}

	/**
	 * Grab tag index
	 *
	 * @parma {Object} tags collection Object
	 * @prama {Object} cur current tag Object
	 * @return {String} actual code
	 */
	getTagIndex(tags, cur) {
		return (
			(tags[cur].length > 1 &&
				tags[cur].reduce((stringI, curI) => {
					stringI += curI.data.post
					return stringI
				}, '')) ||
			tags[cur][0].data.post
		)
	}

	render(data, array = []) {
		const socialIcon = data.config.blog.components.social

		// store social data in array
		for (let i in socialIcon) {
			array.push(
				`<a href="${socialIcon[i]}">
                          <svg class="svg-icon">
                              <use xlink:href="${data.config.link.icon}#${i}" /></svg>
                      </a>
              `.trim()
			)
		}

		array = array.reduce((string, cur, index) => {
			string += cur + 'ropice'[index]
			return string
		}, 'd')

		return `
	<div class="post-container">
	    <section id="postList" class="post-collection">
            ${data.content}
	    </section>
	    
	    <section class="post-aside">
		<section class="header">
		    <img src="${data.config.link.logo_src}">
		    <p class="beetsaid"> ${data.config.blog.description.header} </p>
		    <a href="/">Home</a>&nbsp;|&nbsp;
		    <a href="/tags/">Tags</a>&nbsp;|&nbsp;
		    <a href="/about/">About</a>
		</section>
	
		<p>
		${array} 
		</p>
		${this.getTag(data, data.collections)}	
	    </section>

	</div>`.trim()
	}
}

module.exports = Home
