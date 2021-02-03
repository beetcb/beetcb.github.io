import './css/my.css'
import './css/prism.css'
import './Pixer.woff'

let judge = false

/**
 * Event listener comstom
 *
 * @param {String} event event String
 * @param {Function} calling function
 * @argument ID who to listen to
 * @argument tagName search element according to tagName
 * @argument data-attr search element according to `data attr`'s value
 */
function listen(event, call) {
  const item = document.getElementById(arguments[2])
  item.addEventListener(event, currentEvent => {
    const tar = currentEvent.target,
      tag_selector = arguments[3],
      data_selector = arguments[4]
    if (tag_selector === false) {
      call.call(tar, judge)
    } else {
      tag_selector && data_selector
        ? tar.matches(tag_selector) && tar.getAttribute(data_selector)
          ? call.call(tar, judge)
          : null
        : tag_selector
        ? tar.matches(tag_selector)
          ? call.call(tar, judge)
          : null
        : null
      judge = !judge
    }
  })
}

if (!window.location.href.match(/(tags)|(about)|(posts)/g))
  listen(
    'mouseover',
    function () {
      // find coresponding tag index, define addCss();
      const index_attr = this.getAttribute('data-index'),
        addCSS = s =>
          ((d, e) => {
            d.head.removeChild(d.head.children[d.head.children.length - 1])
            e = d.createElement('style')
            e.innerHTML = s
            d.head.appendChild(e)
          })(document)
      const allStyle = `.tag[data-index*="${index_attr}"]{order:-2;background:#2A9D8F;transition:background .5s,order .1s .3s}`
      // add <style></style> to dom; (need optmizing???)
      addCSS(allStyle)
    },
    'postList',
    'a',
    'data-index'
  )

Turbolinks.start()
