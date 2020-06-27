let go_next_btn = document.querySelector('.u-full-width');
setInterval(() => {
    (go_next_btn.offsetWidth > 0) ? go_next_btn.click() : console.log("not_the_click_time");
}, 1000);