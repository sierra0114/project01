// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import AppMain from './layout/AppMain.vue'
import router from './router'
import VueRouter from 'vue-router'
// elementUI导入
import './style/theme/index.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


Vue.component('full-calendar', fullCalendar)
Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(ElementUI)

// eslint-disable-next-line no-new
new Vue({
  el: '#app',
  router,
  components: {
    AppMain
  },
  methods: {
    isClicked () {
      // 路由挑战到首页
      router.push()
    }
  },
  // app打开前的过渡
  created () {
    try {
      setTimeout(function () {
        document.getElementById('loadingImg').style.display = 'block'
        document.body.removeChild(document.getElementById('appLoading'))
      }, 500)
    } catch (e) {
      console.log(e)
    }
  },
  render: h => h(AppMain)
})
