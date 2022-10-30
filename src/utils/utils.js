/**
 * 去除字符串的空格
 * @param str 待处理的字符串
 * @param type 1-所有空格  2-前后空格  3-前空格 4-后空格
 */
export const removeStringSpaces = (str, type) => {
    type = type || 1
    switch (type) {
        case 1:
            return str.replace(/\s+/g, '')
        case 2:
            return str.replace(/(^\s*)|(\s*$)/g, '')
        case 3:
            return str.replace(/(^\s*)/g, '')
        case 4:
            return str.replace(/(\s*$)/g, '')
        default:
            return str
    }
}

/**
 * @description 格式化金额
 * @param number：要格式化的数字
 * @param decimals：保留几位小数 默认0位
 * @param decPoint：小数点符号 默认.
 * @param thousandsSep：千分位符号 默认为,
 */
export const formatMoney = (number, decimals = 0, decPoint = '.', thousandsSep = ',') => {
    number = (number + '').replace(/[^0-9+-Ee.]/g, '')
    let n = !Number.isFinite(+number) ? 0 : +number
    let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
    let sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
    let dec = (typeof decPoint === 'undefined') ? '.' : decPoint
    let s = ''
    let toFixedFix = function (n, prec) {
        let k = Math.pow(10, prec)
        return '' + Math.ceil(n * k) / k
    }
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
    let re = /(-?\d+)(\d{3})/
    while (re.test(s[0])) {
        s[0] = s[0].replace(re, '$1' + sep + '$2')
    }
    if ((s[1] || '').length < prec) {
        s[1] = s[1] || ''
        s[1] += new Array(prec - s[1].length + 1).join('0')
    }
    return s.join(dec)
}


/**
 * 地址让获取参数
 * @param variable 地址栏参数名称
 * @returns {string|boolean} 参数数据
 */
export const getQueryVariable = (variable) => {
    const query = window.location.search.substring(1);
    const vars = query.split("&");
    for (const element of vars) {
        const pair = element.split("=");
        if (pair[0] === variable) {
            return pair[1];
        }
    }
    return '';
}

/**
 * 获取url参数（第一种）
 * @param {*} name
 * @param {*} origin
 */
export const getUrlParam = (name, origin = null) => {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    let r = null;
    if (origin == null) {
        r = window.location.search.substr(1).match(reg);
    } else {
        r = origin.substr(1).match(reg);
    }
    if (r != null) return decodeURIComponent(r[2]);
    return '';
}

/**
 * 判断字符串 str 是否是以 appoint 结尾的
 * @param str 原始字符串
 * @param appoint 结尾字符串
 * @returns {boolean} 判断结果
 */
export const validationStrEndWith = (str, appoint) => {
    str = str.toLowerCase();  //不区分大小写：全部转为小写后进行判断
    const start = str.length - appoint.length;  //相差长度=字符串长度-特定字符长度
    const char = str.substr(start, appoint.length);//将相差长度作为开始下标，特定字符长度为截取长度
    return char === appoint;
}

export const getCurrentUrl = () => {
    return window.location.href
}


/**
 * 参数处理
 * @param {*} params  参数
 */
export function tansParams(params) {
    let result = ''
    for (const propName of Object.keys(params)) {
        const value = params[propName];
        const part = encodeURIComponent(propName) + "=";
        if (value !== null && typeof (value) !== "undefined") {
            if (typeof value === 'object') {
                for (const key of Object.keys(value)) {
                    if (value[key] !== null && typeof (value[key]) !== 'undefined') {
                        let params = propName + '[' + key + ']';
                        const subPart = encodeURIComponent(params) + "=";
                        result += subPart + encodeURIComponent(value[key]) + "&";
                    }
                }
            } else {
                result += part + encodeURIComponent(value) + "&";
            }
        }
    }
    return result
}

export const getLastItem = thePath => thePath.substring(thePath.lastIndexOf('/') + 1)

export const GetUrlRelativePath = (flag = false) => {
    const url = document.location.toString();
    const arrUrl = url.split("//");
    const start = arrUrl[1].indexOf("/");
    let relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符
    if (flag && relUrl.indexOf("?") !== -1) {
        relUrl = relUrl.split("?")[0];
    }
    return relUrl;
}

