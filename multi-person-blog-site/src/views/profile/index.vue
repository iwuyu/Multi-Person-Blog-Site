<template>
  <div id="profile">
    <!-- <app-header/> -->
    <login v-show="!$store.state.userIsLogined" @logined="logined"/>
    <operation v-show="$store.state.userIsLogined"/>
  </div>
</template>

<script>
import { userIsLogined } from 'network/login'
// import appHeader from "components/content/header/appHeader";
import login from "./childConps/login";
import operation from './childConps/operation'
export default {
  name:"profile",
  components: {
    // appHeader,
    login,
    operation
  },
  data(){
    return {
      isLogined: false,
    }
  },
  methods:{
    logined() {
      this.isLogined = true;
    },
    // 判断用户是否已经登录
    userIsLogined() {
      if(localStorage.getItem('username')){
        let data = {}
        data.token = localStorage.username
        userIsLogined(data).then(res => {
          if(res.data.statusCode === 200) {
            this.isLogined = true;
            this.$store.commit('Logined')
          }else {
            this.isLogined = false
            this.$store.commit('unLogined')
            localStorage.clear()
            this.$message({
              type:'error',
              message: res.data.message
            })
          }
        })
      }
    }
  },
  created() {
    this.userIsLogined()
    
  }
}
</script>

<style lang="scss" scoped>
  #profile{
    padding-top: 60px;
    min-height:calc(100vh) ;
  }
</style>