import Vue from 'vue'
import VueRouter from 'vue-router'

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
    ]
  },
  {
    path: '/article/detail/:id',
    name: 'detail',
    component: () => import('../views/detail/index.vue')
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

/* 管理系统守卫 */
// router.beforeEach((to,from,next) => {
  
// })

/* 路由跳转回顶部 */
// router.afterEach((to,from,next)=>{
//   window.scrollTo(0,0);
// })

// 导出
export default router;
