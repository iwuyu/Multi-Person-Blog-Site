<template>
  <div class="menu-list">
    <ul>
      <li v-for="(item,index) in menuData" :key="index">{{item.name}}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'menuList',
  data() {
    return {
      menuData: [
        {
          name: '个人信息',
          path:''
        },
        {
          name: '文章列表',
          path:'/profile/article/management'
        },
        {
          name: '文章发表',
          path:'/profile/article/publish'
        },
        {
          name:'文章评论',
          path:'/admin/article/message'
        }
      ]
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
  .menu-list {
    width: 1240px;
  }
  .menu-list ul{
    list-style: none;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
  }
  .menu-list ul li {
    // width: 200px;
    // height: 200px;
    background-color:hotpink;
  }
</style>