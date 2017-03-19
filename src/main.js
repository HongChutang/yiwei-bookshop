import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import ConfigRouter from './router.js'
import Store from './store/store.js'
import App from './App'
import 'vue-lazyload-img'
import 'mint-ui/lib/style.css'

Vue.use(Vue.lazyimg, {
  // 是否淡入
  fadein: false,
  // 是否取消水平懒加载
  nohori: true,
  //窗口滚动速度阀值，超过这个速度不懒加载
  speed: 20
})
Vue.use(VueRouter)
Vue.use(VueResource)

Vue.config.debug = true

//配置前端请求基本路径
// const basePath = 'http://localhost/shop-api/'
window.basePath = basePath

const router = new VueRouter({
  transitionOnLoad: true
})
ConfigRouter(router)
global.router = router

router.redirect({
  '/': '/home'
})
//注册路由切换前
router.beforeEach(function() {
  window.scrollTo(0, 0)
})
//注册路由切换后
router.afterEach(function() {
})
router.start(App,'app')
