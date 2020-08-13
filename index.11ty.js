class Index {
    // store social data in array

    // frontMatter(js way)
    data() {
	return {
	    layout: "indexExtend",
	    eleventyExcludeFromCollections: true
	}
    }

    // return to rendered Page
    render({ config }) {
	const socialIcon = config.blog.components.sociallogo,
	      logo = config.blog.description.logo;

	// store social data in array
	const array = [];
	for (let i in socialIcon) {
	    array.push(`<a href="${ socialIcon[i] }">
	                        <svg class="svg-icon">
	                            <use xlink:href="/src/icon.svg#${ i }" /></svg>
	                    </a><br>
			    `.trim())
	}

	return `
	<div class="title">
	    <span>${ logo }&nbsp</span>
	    </div>

	    <input id="check" type="checkbox" checked="checked">
	    <label for="check" style="display: block;text-align: center;margin-top: 1em;">💊</label>

	    <div class="discp">
	        <div>
	            
	            <input type="radio" id="profileA" name="profile">
	            <label for="profileA" id="disA">🐣</label>
	            <div class="discription">
	                <p class="beetsaid">
	                    <strong>破壳：</strong><br>
			    11ty助力，💕加持，终使博客破壳。我是时傻时专注的beet，诚邀屏幕前的小朋友进cabin🏯玩耍。<br>
					    <small style="float: right;">2020.3.3 by beet</small>
							</p>
	            </div>
	        </div>
	        <div>
	            
	            <input type="radio" id="profileB" name="profile">
	            <label for="profileB" id="disB">🐤</label>
	            <div class="discription">
	                <p class="beetsaid">
	                    <strong>专注：</strong><br>
	                    <code>前端开发</code><br>
	                    <code>Git</code><br>
	                    <code>Linux</code><br>
	                </p>
	            </div>
	        </div>
	        <div>
	            
	            <input type="radio" id="profileC" name="profile">
	            <label for="profileC" id="disC">🐥</label>
	            <div class="discription">
	                <p class="beetsaid">
	                    <strong>活跃：</strong><br>

	                    博客源码在
			    ${array[0]}
	                    博文同步于 
			    ${array[3]}
	                    划水于：
			    ${array[5]}
			    ${array[4]}
	                    正经在： 
			    ${array[6]}
			    ${array[2]}
	                </p>
	            </div>
	        </div>
	    </div>

	`
    .trim()
    }

}

module.exports = Index;
