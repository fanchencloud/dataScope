/**
 * @file 微信相关工具
 * @author chen(fanchencloud@qq.com)
 */


import {getJsSignature, getOpenId} from "@/api/wechatApi";
import {GenerateRequestAddress} from "@/config";
import store from "@/store"
import wx from 'weixin-js-sdk'
import {Dialog} from "vant";
import validator from "validator";

/**
 * 配置微信接口
 */
export const configWechat = (currentUrl, jsApiList = []) => {
    // 请求获取微信 js-sdk config接口注入权限验证配置
    getJsSignature(currentUrl)
        .then(res => {
            console.debug('配置中')
            console.log(res)
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: res.data.appId, // 必填，公众号的唯一标识
                timestamp: res.data.timestamp, // 必填，生成签名的时间戳
                nonceStr: res.data.nonceStr, // 必填，生成签名的随机串
                signature: res.data.signature,// 必填，签名
                jsApiList // 必填，需要使用的JS接口列表
            });
        })
        .catch(err => {
            console.log(err)
        })
}

/**
 * 获取用户的openid
 * @param currentUrl 需要跳转页面的相对路径
 */
export const getUserOpenId = (currentUrl) => {
    // 微信授权code 仅可使用一次
    const wx_code = GetQueryString('code')
    console.log(wx_code)
    const hrefUrl = GenerateRequestAddress(currentUrl);
    if (wx_code == null || validator.isEmpty(wx_code)) {
        window.location.href = hrefUrl
    } else {
        getOpenId(wx_code)
            .then(res => {
                console.debug(res)
                const {code, data} = res
                if (code === 200) {
                    if (data != null && !validator.isEmpty(data)) {
                        // 保存用户的openId
                        store.commit('common/setOpenId', data)
                    }
                } else {
                    Dialog.alert({
                        message: '获取用户openid失败！',
                    }).then(() => {
                        // on close
                        wx.closeWindow()
                    });
                }
            })
            .catch(err => {
                console.error(err)
            })
    }
}

export const GetQueryString = (name) => {
    const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    const r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}
