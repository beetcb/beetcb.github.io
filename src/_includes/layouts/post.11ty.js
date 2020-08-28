function funcReturnHelper() {
  return function loadDisqus() {
    var d = document,
      s = d.createElement('script'),
      load = document.getElementById('show-comments'),
      dot = 0

    // loading animation
    load.innerHTML = 'loading ' + '◦' + ' 😛'
    loadInterval = setInterval(() => {
      load.innerHTML = 'loading ' + '◦'.repeat(dot + 2) + ' 😛'
      dot === 1 ? (dot = -dot) : dot++
    }, 1000)

    s.async = true
    s.setAttribute('data-timestamp', +new Date())
    s.src = 'https://beets-blog.disqus.com/embed.js'
    ;(d.head || d.body).appendChild(s)

    function listen(target, event, callback) {
      return target.addEventListener(event, callback)
    }

    // check the comment loadding process
    let commentPromise = new Promise((resolve, reject) => {
      listen(s, 'load', resolve)
      listen(s, 'error', reject)
    })
    commentPromise
      .then(() => {
        clearInterval(loadInterval)
        s.removeEventListener('load', arguments.callee)
        load.innerHTML = 'loadding completed 😎'
        setTimeout(() => (load.style.display = 'none'), 1000)
      })
      .catch(() => {
        clearInterval(loadInterval)
        s.removeEventListener('load', arguments.callee)
        load.innerHTML = '🐶 OOPS！Try to use Proxy?'
      })
  }
}

exports.data = {
  layout: 'base',
  permalink: 'posts/{{ post | removeAtSymbol }}/',
}

let formatDate = date => {
  const dateArr = date.toString().match(/^(?:\w+\s)(\w+)\s(\d+)\s(\d+)/)
  return `Posted date: ${dateArr[3]} ${dateArr[1]} ${dateArr[2]}`
}

exports.render = function (data) {
  return `
	<article class="article">
	    <h1 class="title">${data.title}</h1>
	    <div class="location content">
		<a href="/">Home</a> ${data.page.url}<br>
		<time datetime="${formatDate(data.date)}">${formatDate(data.date)}</time>
	    </div>
	    <div class="content">
		${data.content}
	    </div>
		<div class="outline"></div>
		<div class="comment">
			<button id="show-comments" onclick="loadDisqus();return false;">Load/Post Comments 🤗</button>
			<div id="disqus_thread"></div>
		</div>
	</article>

	<script>
	var disqus_config = function () {
		this.page.url = "https://www.beetcb.com${data.page.url}"
		this.page.identifier = "${data.page.url}"
	};
	${funcReturnHelper()}	
	</script>
	<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a></noscript>                     
    `
}
