import {createStore} from 'vuex'
import common from './modules/common'
import user from "@/store/modules/user"

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
    modules: {
        common,
        user,
    },
    strict: debug,
})
