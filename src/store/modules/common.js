/**
 * 公共数据模块
 */
const state = () => ({
    // 登录token
    token: '',
    openId: '',

    userId: '',
    username: '',
    usertype: '',
    departmentId: '',
    departmentName: '',
    name: '',
    sex: '',

    // 是否水平折叠收起菜单
    isCollapse: false,
})

// getters
const getters = {}

// actions 用于提交 mutation,可以包含异步操作
const actions = {
    // async getUserBaseInfoAction({ commit }) {
    //   const res = await getUserInfoApi()
    //   console.debug(res)
    //   const { code, data } = res
    //   if (code === 200) {
    //     commit('setUserBaseInfo', data)
    //   }
    // },

    logout({commit}) {
        commit('clearBaseInfo')
    }
}

// 更改 Vuex 的 store 中的状态 提交 mutations
const mutations = {
    /**
     * 设置token
     * @param tokenVal
     */
    setToken(state, tokenVal) {
        state.token = tokenVal
    },

    setOpenId(state, openId) {
        state.openId = openId
    },

    /**
     * 清理用户token信息
     */
    clearToken(state) {
        state.token = ''
    },

    changeMenuStatus(state) {
        state.isCollapse = !state.isCollapse
    },
    setUserBaseInfo(state, baseInfo) {
        state.userId = baseInfo.id
        state.username = baseInfo.username
        state.usertype = baseInfo.usertype
        state.departmentId = baseInfo.departmentId
        state.departmentName = baseInfo.departmentName
        state.name = baseInfo.name
        state.sex = baseInfo.sex
    },
    clearBaseInfo(state) {
        state.userId = ''
        state.username = ''
        state.usertype = ''
        state.departmentId = ''
        state.departmentName = ''
        state.name = ''
        state.sex = ''
    },

}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
