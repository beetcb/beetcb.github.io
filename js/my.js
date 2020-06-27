let countInt = 0
    , countPause = setInterval(() => countInt += 1, 1000)
    , commitCheck = document.getElementById('veditor')
// change pText 
const countNum = setInterval(() => {
    let countDown = (20 - countInt)
        , pText = document.querySelector('#alertTime');
    (countInt < 20) ?
        pText.innerHTML = `出于对作品的尊重，请至少等待${countDown}秒再进行评价` :
        (pText.innerHTML = '', clearInterval(countDown), clearInterval(countPause))
}, 1000)

// click btn func
function onToast() {
    (commitCheck.value.length == 0) ?
        Materialize.toast('请输入打分结果', 3000, 'rounded') :
        (Materialize.toast('正在提交，请等待', 3000, 'rounded'), document.querySelector('.vsubmit').classList.add('hideBtn'));
    const timeUpload = setInterval(() => {
        (commitCheck.getAttribute('placeholder') === '您已评分，去评下一组吧') ?
            (Materialize.toast('已成功提交，去评分下一作品吧', 3000, 'rounded'),clearInterval(timeUpload))
            : console.log('where goes wrong???');
    }, 200);
}
