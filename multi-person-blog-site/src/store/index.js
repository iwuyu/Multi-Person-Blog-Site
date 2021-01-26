import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

 const store = new Vuex.Store({
  state: {
    userIsLogined: false,
    username:'登录/注册',
    avatar:'',
    categoryId:'',
    labelId:'',
    keyword:'',
    adminIsLogin:true
  },
  mutations: {
    Logined(state){
      state.userIsLogined = true
    },
    unLogined(state){
      state.userIsLogined = false
    }
  },
  actions: {

  }
})

export default store;