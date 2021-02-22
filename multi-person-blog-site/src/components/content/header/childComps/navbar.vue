<template>
  <div id="navbar">
    <ul>
      <li v-for="(item,index) in navbars" :key="index" @click="$router.replace(item.path)"> {{item.title}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "navbar",
  data() {
    return {
      navbars:[
        {title:"首页",path:"/home"},
        {title:"问答",path:"/question"},
        {title:"个人中心",path:"/profile/personal"}
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  #navbar {
    ul {
      list-style: none;
      display: flex;  
      li {
        height: 4rem;
        line-height: 4rem;
        padding: 0 1.5rem;
        cursor: pointer;
        &:hover {
          color: #417dff;
        }
      }
    }
  }
</style>