<template>
  <div id="app-header">
    <div class="left"><logo/></div>
    <div class="center"><navbar/></div>
    <div class="right"></div>
  </div>
</template>

<script>
import logo from './childComps/logo';
import navbar from './childComps/navbar'
export default {
  name: "appHeader",
  components:{
    logo,
    navbar
  }
}
</script>

<style lang="scss" scoped>
#app-header {
  position: flex;
  display: flex;
  width: 100%;
  height: 60px;
  border-bottom: 1px solid #eaeaea;
  .left {
    line-height: 60px;
    width: 23%;
  }
  .center {
    flex: 20;
  }
  .right {
    flex:2;
  }
}
</style>