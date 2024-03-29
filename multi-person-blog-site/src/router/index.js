import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index'
import {adminIsLogined} from 'network/login'

const home = () => import('../views/home/index')
const profile = () => import('../views/profile/index')
// // 插件安装
Vue.use(VueRouter);

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    component: home
  },
  {
    path: '/profile',
    component: profile,
    redirect: '/profile/personal',
    children: [
      {
        path: '/profile/personal',
        name: 'personal',
        component: () => import('../views/profile/childConps/personal.vue')
      },
      {
        path: '/profile/article/publish',
        name: 'articleAdd',
        component: () => import('../views/profile/childConps/articleAdd.vue')
      },
      {
        path: '/profile/article/management',
        name: 'articleManagement',
        component: () => import('../views/profile/childConps/articleManagement.vue')
      },
      {
        path: '/profile/article/message',
        name: 'articleMessage',
        component: () => import('../views/profile/childConps/articleMessage.vue')
      },
      {
        path: '/profile/question/publish',
        name: 'questionAdd',
        component: () => import('../views/profile/childConps/questionAdd.vue')
      },
      {
        path: '/profile/question/management',
        name: 'questionManagement',
        component: () => import('../views/profile/childConps/questionManagement.vue')
      },
      {
        path: '/profile/message',
        name: 'message',
        component: () => import('../views/profile/childConps/message.vue')
      },
    ]
  },
  {
    path: '/article/detail/:id',
    name: 'detail',
    component: () => import('../views/detail/index.vue')
  },
  {
    path: '/question',
    name: 'question',
    component: () => import('../views/question/index.vue')
  },
  {
    path: '/question/detail/:id',
    name: 'detail',
    component: () => import('../views/question/detail.vue')
  },
  {
    path: '/user/home/:id',
    name: 'user',
    component: () => import('../views/user/user.vue')
  },
  {
    path: '/profile/letter',
    name: 'privateLetter',
    component: () => import('../views/profile/childConps/privateLetter.vue')
  },
  {
    path: '/admin/login',
    name: 'adminLogin',
    component: () => import('../components/admin/childComps/adminLogin.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import('../components/admin/admin.vue'),
    children: [
      {
        path: '/admin/dashboard',
        name: 'dashboard',
        component: () => import('../components/admin/childComps/dashboard.vue')
      },
      {
        path: '/admin/audit/article',
        name: 'articleAudit',
        component: () => import('../components/admin/childComps/articleAudit.vue')
      },
      {
        path: '/admin/management/user',
        name: 'managementUser',
        component: () => import('../components/admin/childComps/managementUser.vue')
      },
      {
        path: '/admin/management/category',
        name: 'category',
        component: () => import('../components/admin/childComps/category.vue')
      },
    ]
  },
]

// 创建路由对象
const router = new VueRouter({
  routes,
  mode: 'history',
})


/* 重定向不报错 */
const originalPush = VueRouter.prototype.replace
VueRouter.prototype.replace = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
// /* 重定向不报错 */
const originalPush2 = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush2.call(this, location).catch(err => err)
}

/* 管理系统守卫 */
router.beforeEach((to,from,next) => {
  if(to.path.includes("/admin")) {
    store.state.adminIsLogin = false
    adminIsLogined().then(res => {
      if(res.data.statusCode === 200) {
        next()
      } else {
        next('/admin/login')
      }
    }).catch(err => {
      
    })
  }
  next()
})

/* 路由跳转回顶部 */
// router.afterEach((to,from,next)=>{
//   window.scrollTo(0,0);
// })

// 导出
export default router;
