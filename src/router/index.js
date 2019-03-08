import Vue from 'vue/dist/vue.esm.js'
import Router from 'vue-router'
Vue.use(Router)

var router = new Router({
    linkActiveClass:"active",
    routes: [
        {
            path: '/',
            redirect: {
                name: 'Index'
            }
        },{
            path: '/index',
            name: 'Index',
            component: resolve => require(['@/views/Index'], resolve),
            // meta: { title: "首页" },
        }
    ]

})
router.afterEach(() => {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
})
export default router
