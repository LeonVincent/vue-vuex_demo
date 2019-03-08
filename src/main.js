// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue/dist/vue.esm.js'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// import animate from 'animate.css'
// Vue.use(animate)

import api from './api/login.js'
Vue.use(ElementUI);
Vue.prototype.$api = api;
import store from './store';
import './utils/adaptive'
Vue.directive('dbClick', {
    inserted(el, binding) {
        el.addEventListener('click', e => {
            if(!el.disabled) {
              el.disabled = true;
                  let timer = setTimeout( () => {
                      el.disabled = false;
                  },2500)
            }
        })
    }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});
