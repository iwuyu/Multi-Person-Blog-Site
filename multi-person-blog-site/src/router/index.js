import Vue from 'vue'
import VueRouter from 'vue-router'

// // 插件安装
Vue.use(VueRouter);

const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../views/home/index.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/profile/index.vue')
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
