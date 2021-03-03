import Vue from 'vue'
import Router from 'vue-router'

import Main from '../components/Main.vue'

import Approaching from '../components/Approaching.vue'
import Expired from '../components/Expired.vue'
import System from '../components/System.vue'
import Calendar from '../components/Calendar.vue'
import Tags from '../components/Tags.vue'
import User from '../components/User.vue'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Setting from '../components/Setting.vue'

Vue.use(Router)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [{
  name: 'appMain',
  path: '/',
  components: {
    Main: Main
  },
  children: [{
    name: 'approaching',
    path: '/approaching',
    component: Approaching
  },
  {
    name: 'expired',
    path: '/expired',
    component: Expired
  },
  {
    name: 'system',
    path: '/system',
    component: System
  },
  {
    name: 'calendar',
    path: '/calendar',
    component: Calendar
  },
  {
    name: 'tags',
    path: '/tags',
    component: Tags
  },
  {name: 'user',
    path: '/user',
    component: User
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'register',
    path: '/register',
    component: Register
  },
  {
    name: 'setting',
    path: '/setting',
    component: Setting
  },{
    name:'priority',
    path:'/priorrity',
    component:Priority
  }]
}]
const router = new Router({
  routes,
  linkActiveClass: 'active'
})
export default router
