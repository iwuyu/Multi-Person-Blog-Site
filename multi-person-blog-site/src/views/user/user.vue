<template>
  <div id="user">
    <div class="user-info">
      <div class="box1">
        <div class="avatar">
          <img :src="profileData.avatar" alt="" />
        </div>
        <p class="username"><strong>{{profileData.username}}</strong></p>
      </div>
      <p class="signature">这个人很懒~</p>
      <div class="box2">
        <p @click="currentArticle" :class="isShow ? 'active' : ''">文章 {{profileData.article_count}}</p>&nbsp;&nbsp;|&nbsp;&nbsp;
        <p @click="currentQuestion" :class="!isShow ? 'active' : ''">问答 {{profileData.question_count}}</p>&nbsp;&nbsp;|&nbsp;&nbsp;
        <p>去私信</p>
      </div>
    </div>
    <div class="content-list">
      <article-list v-show="isShow" :user="user"></article-list>
      <question-list v-show="!isShow" :user="user"></question-list>
    </div>
  </div>
</template>

<script>
import uploadImage from "network/upload";
import { getOtherInfo } from "network/user";
import articleList from '../../components/content/article/ArticleList'
import questionList from '../question/childCopnps/questionList'
export default { 
  name: 'user',
  components: {
    articleList,
    questionList
  },
  data() {
    return {
      user: {
        userId: '',
      },
      isShow:true,
      profileData:{}
    };
  },
  methods: {
    currentArticle() {
      this.isShow = true
    },
    currentQuestion() {
      this.isShow = false
    }
  },
  created() {
    this.user.userId = this.$route.params.id
    getOtherInfo(this.user).then((res) => {
      console.log(res);
      if(res.data.statusCode === 200) {
        res.data.data.avatar = uploadImage.UPLOAD.BASEURL + res.data.data.avatar
        this.profileData = res.data.data
      }
    });
  },
}
</script>

<style lang='scss' scoped>
  #user{
    padding-top: 80px;
    min-height: 100vh;
    .user-info{
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 1200px;
      margin: 0 auto;
      background-color: #fff;
      padding-bottom: 20px;
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
        padding-top: 1rem;
        p {
          cursor: pointer;
        }
      }
    }
    .content-list {
      margin: 20px auto;
      width: 1200px;
      background-color: #fff;
    }
  }
  .active {
    color:#409EFF;
  }
</style>