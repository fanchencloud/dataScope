import axios from 'axios'
import {tansParams} from "./utils"
import {ElMessageBox} from 'element-plus'
// import store from "@/store";
// 导入基础路径
import {BASE_URL} from "@/config";
import router from "@/router/index.js";

// 设置请求头
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
// 创建axios实例
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: BASE_URL,
    // 超时
    timeout: 10000
})

// request拦截器
service.interceptors.request.use((config) => {
    // 是否需要设置 token
    // const isToken = config.headers.isToken || false
    // if (isToken) {
    //     delete config.headers.isToken
    //     config.headers['authorization'] = store.state.common.token // 让每个请求携带自定义token 请根据实际情况自行修改
    // }
    // get请求映射params参数
    // todo if (config.method.toLowerCase() === 'get' && config.params) {
    if (config.params) {
        let url = config.url + '?' + tansParams(config.params);
        url = url.slice(0, -1);
        config.params = {};
        config.url = url;
    }
    // 是否是formData格式请求
    const isForm = config.headers.isForm || false
    if (isForm) {
        delete config.headers.isForm
        config.headers['Content-Type'] = 'multipart/form-data'
    }
    return config
}, (error) => {
    Promise.reject(error).then(() => console.log(error))
})

// 响应拦截器
service.interceptors.response.use(res => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    // 获取错误信息
    const message = res.data.message
    // 二进制数据则直接返回
    if (res.request.responseType === 'blob' || res.request.responseType === 'arraybuffer') {
        return res.data
    }
    if (code === 401) {
        // 处理未登录或者登录失效的情况
        ElMessageBox.alert('未登录或登录状态失效，请重新登录', {
            // if you want to disable its autofocus
            // autofocus: false,
            confirmButtonText: 'OK',
            center: true,
            showClose: false,
        })
            .then(() => {
                // router.push('/login')
            })
            .catch(() => {
                // router.push('/login')
            })
    } else {
        return res.data
    }
    return res.data
}, error => {
    console.log('err' + error)
    return Promise.reject(error)
})

export default service
