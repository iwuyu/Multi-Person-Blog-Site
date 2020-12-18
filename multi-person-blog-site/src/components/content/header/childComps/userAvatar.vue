<template>
  <div id="user_avatar">
    <el-popover
      class="user"
      placement="bottom"
      width="100"
      trigger="hover">
      <el-button v-show="$store.state.userIsLogined" type="text" @click="signOut" class="exit">退出登录</el-button>
      <p v-show="!$store.state.userIsLogined">点击去 登录/注册</p>
      <div class="user" slot="reference">
        <p class="username" type="text" slot="reference" @click="toLogin"><i class="iconfont icon-user"> {{$store.state.username}}</i></p>
      </div>
    </el-popover>
  </div>
</template>

<script>
import { userIsLogined, userSignOut } from 'network/login'
export default {
  data() {
    return {
    }
  },
  methods:{
    // 判断用户是否已经登录
    userIsLogined() {
      if(localStorage.getItem('username')){
        let data = {}
        data.token = localStorage.username
        userIsLogined(data).then(res => {
          this.$store.state.username = res.data.data
          if(res.data.statusCode === 200) {
            this.$store.commit('Logined')
          }else {
            this.$store.commit('unLogined')
            localStorage.clear()
            this.$message({
              type:'error',
              message: res.data.message
            })
          }
        })
      }
    },
    toLogin() {
      if(localStorage.getItem('username')) return;
      this.$router.replace("/profile")
    },
    // 注销登录
    signOut() {
      if(localStorage.getItem('username')){
        let data = {}
        data.token = localStorage.username
        userSignOut(data).then(res => {
          this.$store.commit('unLogined')
          this.$store.state.username = "登录/注册"
          localStorage.clear();
          this.$message({
            type:'success',
            message:res.data.message
          })
        })
      }
    }
  },
  created(){
    this.userIsLogined()
  }
}
</script>

<style lang="scss" scoped>
  #user_avatar{
    height: 60px;
    line-height: 60px;
    .el-popover{
      // width: 100px;
      height: 100px;
    }
    .user{
      display: flex;
      align-items: center;
      .username{
        padding: 0 15px;
        color: #555;
        &:hover {
          color: #409EFF;
        }
      }
      .exit {
        width: 100%;
        text-align: center;
        margin: 0 auto;
      }
    }
  }
</style>