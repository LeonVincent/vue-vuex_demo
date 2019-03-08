import router from './../router'
import store from './../store'
import NProgress from 'nprogress' // Progress 进度条
import 'nprogress/nprogress.css'// Progress 进度条样式
import { MessageBox } from 'element-ui'
import { getToken } from '@/utils/auth' // 验权

const whiteList = ['/','/index','/up_coin','/transaction','/risk','/depth'] // 不重定向白名单
router.beforeEach((to, from, next) => {
    let know = store.getters.langpack.y_already_konw;
  NProgress.start();
  if (whiteList.indexOf(to.path) !== -1) {
    next();
  } else {
    if (getToken()) {
      next();
      NProgress.done()
  } else {
      MessageBox.alert(store.getters.langpack.y_login_first, ' ', {
        confirmButtonText: know,
        customClass: 'myMsgrouter',
      }).then(() => {
          store.dispatch('FedLogOut').then(() => {
              next({path: '/'});
              setTimeout(() => {
                  location.reload()
              },1500)
              // location.reload() // 为了重新实例化vue-router对象 避免bug
          })
      }).catch(() => {

      });
      NProgress.done()
    }
  }
})


router.afterEach(() => {
  NProgress.done() // 结束Progress
})
