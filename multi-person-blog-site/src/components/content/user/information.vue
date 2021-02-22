<template>
  <div id="information">
    <div class="box1">
      <div class="avatar">
        <img :src="profileData.avatar" alt="" />
      </div>
      <p class="username"><strong>{{profileData.username}}</strong></p>
    </div>
    <p class="signature">快去写一个您的签名吧</p>
    <div class="box2">
      <p>文章 {{profileData.article_count}}&nbsp;&nbsp;|&nbsp;&nbsp;</p>
      <p>问答 {{profileData.question_count}}&nbsp;&nbsp;|&nbsp;&nbsp;</p>
      <p>留言 125</p>
    </div>
    <div class="box3"></div>
  </div>
</template>

<script>
import MenuList from "./menuList";
import uploadImage from "network/upload";
import { getUserInfo } from "network/user";
export default {
  name: "information",
  components: { MenuList },
  data() {
    return {
      param: {
        token: localStorage.username,
      },
      profileData:{}
    };
  },
  created() {
    getUserInfo(this.param).then((res) => {
      if(res.data.statusCode === 200) {
        res.data.data.avatar = uploadImage.UPLOAD.BASEURL + res.data.data.avatar
        this.profileData = res.data.data
      }
    });
  },
};
</script>

<style lang="scss" scoped>
#information {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-top: 1rem;
  // background: url('../../../assets/img/userbg.jpg') 100% 100% no-repeat;
  .box1 {
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 1rem;
    .avatar {
      height: 6rem;
      width: 6rem;
      img {
        width: 100%;
        height: 100%;
        display: inline;
        border-radius: 50%;
      }
    }
    .username {
      font-size: 1.2rem;
      margin-left: 1rem;
      color: #333;
      padding: 3px 0;
    }
  }

  .signature {
    margin-top: 10px;
    font-size: 14px;
    line-height: 20px;
  }
  .box2 {
    display: flex;
    justify-content: space-between;
    // align-items: center;
    padding-top: 1rem;
  }
}
</style>
