// 设置 rem 函数
function setRem() {
    const screenWidth = document.documentElement.clientWidth
    const remTotal = 28.41
    const converseNumber = screenWidth / remTotal
    document.documentElement.style.fontSize = converseNumber + 'px'
}

// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
    setRem()
}
