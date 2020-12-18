<template>
  <div id="app-header">
    <div class="left"><logo/></div>
    <div class="center"><navbar/></div>
    <div class="right"><user-avatar/></div>
  </div>
</template>

<script>
import logo from './childComps/logo'
import navbar from './childComps/navbar'
import userAvatar from './childComps/userAvatar'
export default {
  name: "appHeader",
  components:{
    logo,
    navbar,
    userAvatar,
  }
}
</script>

<style lang="scss" scoped>
#app-header {
  position: fixed;
  display: flex;
  width: 100%;
  height: 60px;
  background: #fff;
  z-index: 999;
  border-bottom: 1px solid #eaeaea;
  .left {
    line-height: 60px;
    width: 23%;
  }
  .center {
    flex: 20;
  }
  .right {
    // flex:2;
    padding-right: .5rem;
  }
}
</style>