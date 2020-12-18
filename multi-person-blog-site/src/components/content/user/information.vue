<template>
  <div id="information">
    <div class="box1">
      <div class="avatar">
        <img src="../../../assets/img/default.jpg" alt="">
      </div>
      <p class="username"><strong>物语</strong></p>
    </div>
    <div class="box2">
      <p>文章 120&nbsp;&nbsp;</p>
      <p>问答 12&nbsp;&nbsp;</p>
      <p>获赞 1205</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "information"
}
</script>

<style lang="scss" scoped>
  #information{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 1rem;
    // background: url('../../../assets/img/userbg.jpg') 100% 100% no-repeat;
    .box1{
      display: flex;
      justify-content: center;
      align-items: center;
      padding-top: 1rem;
      .avatar{
        height: 6rem;
        width: 6rem;
        img{
          width: 100%;
          height: 100%;
          display: inline;
          border-radius: 50%;
        }
      }
      .username{
        font-size: 1.2rem;
        margin-left: 1rem;
        color: #333;
        padding: 3px 0;
      }
    }
    .box2{
      display: flex;
      justify-content: space-between;
      // align-items: center;
      padding-top: 1rem;
    }
  }
</style>