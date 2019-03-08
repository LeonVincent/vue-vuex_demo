import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import coin from './modules/coin'
import getters from './getters'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    coin
  },
  getters,
  plugins: [createPersistedState()]  //加上这个就可以了
})

export default store
