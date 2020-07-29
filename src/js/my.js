{
    window.judge = false;
    /* $event listener call$ method
        - <event> `str`
        - <function> 
        - <ID>    `str`=> listen to who[or as parent]
        - [tagName || false]    `str` false => 关闭查找
        - [data-(atrr)]    `str`
        */
    function listen(event, call) {
        const item = document.getElementById(arguments[2]);
        item.addEventListener(event, currentEvent => {
            const tar = currentEvent.target,
                tag_selector = arguments[3],
                data_selector = arguments[4];
            if (tag_selector === false) {
                call.call(tar, judge);
            } else {
                (tag_selector && data_selector) ?
                    tar.matches(tag_selector) && tar.getAttribute(data_selector) ? call.call(tar, judge) : null :
                    (tag_selector) ?
                        tar.matches(tag_selector) ? call.call(tar, judge) : null :
                        null;
                judge = !judge;
            }

        });
    }

    function addActive(event, func, id, tag, data, deep) {

        listen(event, function (judge) {
            if (deep) {
                const howDeep = `parentNode.`.repeat(deep);
                Function(`judge || this.${howDeep}classList.add('active');judge && this.${howDeep}classList.remove('active');`).call(this);
            }
            else {
                judge || this.classList.add('active');
                judge && this.classList.remove('active');
            }
            if (func) func(this);
        }, id, tag, data);
    }


    listen('mouseover', function () {
        const index_attr = this.getAttribute('data-index'),
            addCSS = (s) => ((d, e) => { d.head.removeChild(d.head.children[d.head.children.length - 1]); e = d.createElement("style"); e.innerHTML = s; d.head.appendChild(e) })(document);
        allStyle = `.tag[data-index="${index_attr}"]{order:-2;background:#2A9D8F;transition:background .5s,order .1s .3s}`;
        addCSS(allStyle);
    }, 'postList', 'a', 'data-index');

    // addActive('click', null, 'nav', 'div');
    addActive('click', null, 'nav', 'div', null, 2);
}