import {login, logout, getInfo, sign, loginvalid, logingoogle} from '@/api/login'
// import {getToken, setToken, removeToken} from '@/utils/auth'

const coin = {
    state: {
        recommend: null,
        initCoin: ''

    },

    mutations: {
        SET_RECOMMEND : (state, data) => {
            state.recommend = data
        },
        SET_INITCOIN : (state,data) => {
            state.initCoin = data
        }
    },

    actions: {
    }
}

export default coin
