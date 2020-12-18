<template>
  <div id="app">
    <app-header class="header"/>
    <router-view></router-view>
  </div>
</template>

<script>
import appHeader from "components/content/header/appHeader"
export default {
  name: "app",
  components: {
    appHeader
  }
}
</script>

<style>
@import "./assets/css/base.css" ;

#app {
  height: 100%;
  width: 100%;
  -webkit-overflow-scrolling: touch;
  background: url(assets/img/blogbg.png);
}
</style>
