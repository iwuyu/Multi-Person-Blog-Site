<template>
  <div id="detail">
    <div class="q-info">
      <div class="header">
        <img :src="questionDetail.avatar" alt="">
        <span class="username">&nbsp;&nbsp;&nbsp;{{questionDetail.username}}</span>
        <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{questionDetail.time}}</span>
      </div>
      <div class="body">
        <h2 class="title">{{questionDetail.title}}</h2>
        <div class="label"><el-tag type="success">{{questionDetail.name}}</el-tag></div>
        <p class="desc">{{questionDetail.describes}}</p>
      </div>
      <div class="footer">
        <i class="iconfont icon-heart">点赞</i>&nbsp;{{questionDetail.likes}}
      </div>
    </div>
    <div class='comment'>
      <textarea
          class="txtarea"
          maxlength="200"
          cols="100%"
          rows="5"
          v-model="formComment.content"
          placeholder="快输入你的答案"
        ></textarea>
        <el-button type="danger" size="medium" class="leave_btn" @click="leaveComments">提交</el-button>
    </div>
    <div class="answer">
      <div class="title"><span>3</span>&nbsp;条回答</div>
      <div class="q-info a-info">
        <div class="header">
          <img src="../../assets/img/default.jpg" alt="">
          <span class="username">&nbsp;&nbsp;&nbsp;物语、</span>
          <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2021-02-22 17:30</span>
        </div>
        <div class="body">
          <p class="desc">现在市面上很多公司都不会再用Jquery了，是真的被淘汰了吗？</p>
        </div>
        <div class="footer">
          <i class="iconfont icon-comment">评论</i>
        </div>
      </div>
      <div class="q-info a-info">
        <div class="header">
          <img src="../../assets/img/default.jpg" alt="">
          <span class="username">&nbsp;&nbsp;&nbsp;物语、</span>
          <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2021-02-22 17:30</span>
        </div>
        <div class="body">
          <p class="desc">现在市面上很多公司都不会再用Jquery了，是真的被淘汰了吗？</p>
        </div>
        <div class="footer">
          <i class="iconfont icon-comment">评论</i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getQuestionDetail } from 'network/question'
import uploadImage from 'network/upload';
export default {
  name:'detail',
  data() {
    return {
      id:null,
      questionDetail:{},
      formComment: {
        content: ''
      }
    }
  },
  methods: {
    leaveComments() {

    }
  },
  mounted() {
    // 获取传来的文章id
    this.id = this.$route.params.id
    // 根据id查询文章详情
    getQuestionDetail(this.id).then(res => {
      let data = res.data;
      if(data.statusCode == 200){
        // data.data.content = marked(data.data.content);
        // this.share_img = uploadImage.UPLOADIMG.BASEURL + data.article_image;
        // data.article_music = uploadImage.UPLOADIMG.BASEURL + data.article_music;
        // this.share_title = data.article_title;
        // this.share_brief = data.article_synopsis;
        data.data.avatar = uploadImage.UPLOAD.BASEURL + data.data.avatar;
        console.log(data);
        this.questionDetail = data.data;
      }else {
        this.$message({
          type:'error',
          message:data.message
        })
      }
    }).catch(err => {
      console.log(err);
    })
  }
}
</script>

<style lang="scss" scoped>
  #detail {
    padding-top: 80px;
    width: 1000px;
    // height: 100vh;
    margin: 0 auto;
    .q-info {
      background-color: #fff;
      padding: 20px;
      .header {
        img {
          width: 30px;
          height: 30px;
        }
        .username {
          font-size: 17px;
          color: #555;
        }
        .time {
          font-size: 14px;
          color: #777;
        }

      }
      .body {
        margin-top: 10px;
        .title {
          padding: 10px 0;
        }
        .label {
          margin-top: 10px;
        }
        .desc {
          padding: 20px 0;
        }
        .footer i{
          cursor: pointer;
        }
      }
    }
    .comment {
      background-color: #fff;
      margin-top: 20px;
      height: 150px;
      position: relative;
      .txtarea {
        width: 100%;
        height: 100%;
        resize: none;
        border: none;
        outline: none;
        padding: 10px 20px;
        font-size: 18px;
        &::placeholder {
          font-size: 18px;
        }
      }
      .leave_btn {
        position: absolute;
        right: 10px;
        bottom: 10px;
      }
    }
    .answer {
      background-color: #fff;
      margin-top: 20px;
      padding-bottom: 40px;
      .title {
        font-size: 16px;
        height: 50px;
        padding: 20px;
        border-bottom: 1px solid #ccc;
      }
      .a-info {
        border-bottom: 1px solid #ccc;
      }
    }
  }
</style>