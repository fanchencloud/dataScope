/**
 * 用户模块
 */
const state = () => ({
    customerCode: '',
    preAudit: 0,
    // 盗抢险等费用支付金额
    payAmount: 0,
    orderCode: '',
})

// getters
const getters = {}

// actions 用于提交 mutation,可以包含异步操作
const actions = {
    // async getUserBaseInfoAction({commit}) {
    //     const res = await getUserInfoApi()
    //     console.debug(res)
    //     const {code, data} = res
    //     if (code === 200) {
    //         commit('setUserBaseInfo', data)
    //     }
    // }
}

// 更改 Vuex 的 store 中的状态 提交 mutations
const mutations = {
    setCustomerCode(state, customerCode) {
        state.customerCode = customerCode
    },
    setPreAudit(state, preAudit) {
        state.preAudit = preAudit
    },
    setPayAmount(state, payAmount) {
        state.payAmount = payAmount
    },
    setOrderCode(state, orderCode) {
        state.orderCode = orderCode
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
