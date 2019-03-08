import {login, logout, getInfo, sign, loginvalid, logingoogle} from '@/api/login'
import {getToken, setToken, removeToken} from '@/utils/auth'

const user = {
    state: {
        token: getToken(),
        name: '',
    },

    mutations: {
        SET_NAME: (state, name) => {
            state.name = name
        }
    },

    actions: {
        // 登出
        LogOut({commit, state}) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('SET_TOKEN', '')
                    commit('SET_ROLES', [])
                    removeToken()
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },

        // 前端 登出
        FedLogOut({commit}) {
            return new Promise(resolve => {
                commit('SET_TOKEN', '');
                removeToken()
                commit('SET_LOGIN', 0);
                resolve()
            })
        }
    }
}

export default user
