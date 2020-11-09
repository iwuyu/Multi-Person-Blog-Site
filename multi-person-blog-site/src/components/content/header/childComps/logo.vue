<template>
  <div id="logo" @click="goHome">
    <img src="../../../../assets/img/logo.png" alt="logo">
  </div>
</template>

<script>
export default {
  name: "logo",
  methods:{
    // 点击logo返回首页
    goHome() {
      this.$router.replace("/home");
    }
  }

}
</script>

<style lang="scss" scoped>
  #logo {
    width: 100%;
    height: 100%;
    margin: auto;
    line-height: 60px;
    img {
      height: 60px;
    }
  }

  @media screen and (min-width:900px) {
    #logo img {
      padding-left: 1rem;
    }
  }

  @media screen and (max-width:900px) {
    #logo img {
      padding-left: .5rem;
    }
  }
</style>