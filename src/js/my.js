const postList = document.getElementById('postList');
function listen(event, call) {
    arguments[2].addEventListener(event, (trash) => {
        const tar = trash.target,
              tag_selector = arguments[3],
              data_selector = arguments[4];
        (tag_selector && data_selector) ?
        tar.getAttribute(data_selector) ? call.call(tar, trash) : null :
        (tag_selector) ?
        tar.matches(tag_selector) ? call.call(tar, trash) : null :
        null;
    });
}
listen('mouseover', function () { 
    const index_attr = this.getAttribute('data-index'),
          addCSS = (s)=>((d,e)=>{ d.head.removeChild(d.head.children[d.head.children.length-1]);e = d.createElement("style");e.innerHTML = s;d.head.appendChild(e)})(document);
          allStyle = `.tag[data-index="${index_attr}"]{order:-2;background:#2A9D8F;transition:background .5s,order .1s .4s}`;
    addCSS(allStyle);
}, postList, 'a', 'data-index');
