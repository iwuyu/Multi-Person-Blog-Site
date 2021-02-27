<template>
  <div id="personal">
    <p class="breadbcrumb"> 基本信息 / 我的信息</p>
    <information/>
  </div>
</template>

<script>
import information from 'components/content/user/information'
export default {
  name: "personal",
  components: {
    information
  }
}
</script>

<style lang="scss" scoped>
  #personal{
    // margin: 0 20px;
    // margin-left: 20px;
    .breadbcrumb {
      
      font-size: 14px;
      padding: 10px;
      color: #666;
      background-color: #fff;
      margin-top: 10px;
      margin-left: 20px;
    }
  }
</style>