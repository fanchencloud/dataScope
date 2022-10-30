import httpRequest from "@/utils/httpRequest.js"

export const loginApi = (username, password) => {
    return httpRequest({
        url: '/permission/user/login',
        method: 'POST',
        data: {username, password,}
    })
}

/**
 * 获取用户的基本信息
 */
export const getUserBaseInfoApi = () => {
    return httpRequest({
        url: '/permission/user/baseInfo',
        method: 'GET',
    })
}

/**
 * 退出登录
 */
export const logoutApi = () => {
    return httpRequest({
        url: '/permission/user/logout',
        method: 'GET',
    })
}
