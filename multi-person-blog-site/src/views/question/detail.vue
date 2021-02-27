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
        <i class="iconfont icon-heart" @click="likeQuestion(questionDetail.id)">点赞</i>&nbsp;{{questionDetail.likes}}
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
      <div class="title"><span>{{comment.length}}</span>&nbsp;条回答</div>
      <div class="q-info a-info" v-for="item in comment" :key="item.id">
        <div class="header">
          <img :src="item.avatar" alt="">
          <span class="username">&nbsp;&nbsp;&nbsp;{{item.username}}</span>
          <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{item.time}}</span>
        </div>
        <div class="body">
          <p class="desc">{{item.content}}</p>
        </div>
        <div class="footer">
          <i class="iconfont icon-comment" @click="commentClick(item.user_id, item.id, 1)">评论</i>
        </div>
        <div class="reply" v-show="item.reply.length > 0">
          <div class="q-info a-info r-info" v-for="reply_item in item.reply" :key="reply_item.id">
            <div class="header">
              <img :src="reply_item.avatar" alt="">
              <span class="username">&nbsp;&nbsp;&nbsp;{{reply_item.son_user}}</span>
              <span class="time">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{reply_item.time}}</span>
            </div>
            <div class="body">
              <p class="desc"><span style="color:gold;">@ {{reply_item.parent_user}}:</span> {{ reply_item.content}}</p>
            </div>
            <div class="footer">
              <i class="iconfont icon-comment" @click="replyClick(item.id, reply_item.user_id, reply_item.id, 2)">评论</i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="回复" :visible.sync="formComment.isReply" width="50%">
      <div class='comment reply_box'>
        <textarea
          class="txtarea"
          maxlength="200"
          cols="100%"
          rows="5"
          v-model="formComment.content"
          placeholder="你想说点什么呢">
        </textarea>
        <el-button type="danger" size="medium" class="leave_btn" @click="leaveComments">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getQuestionDetail, questionLike } from 'network/question'
import { leaveComment, getComment } from "network/article";
import { userIsLogined } from "network/login";
import uploadImage from 'network/upload';
export default {
  name:'detail',
  data() {
    return {
      id:null,
      questionDetail:{},
      comment: [], // 已留言内容
      baseUrl: uploadImage.UPLOAD.BASEURL,
      formComment: {
        parentId: "", // 问答id
        type: 2, // 主题：2 问答
        content: "", // 评论内容
        token: "", // 评论者
        isReply: false, // 是否为回复
      },
      messageContent: "", // 文章留言内容
      replyContent: "", // 留言回复内容
      drawer: false,
      currentMessageId: null,
      messageCount: 0,
    }
  },
  // computed: {
  //   liked() {
  //     return function(id) {
  //       return localStorage.getItem(`like${id}`)
  //     }
  //   },
  // },
  methods: {
    /* 获取问答详情 */
    getQuestion(questionId) {
      // 根据id查询文章详情
      getQuestionDetail(questionId).then(res => {
        let data = res.data;
        if(data.statusCode === 200){
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
    },
    // 问答点赞
    likeQuestion(questionId) {
      if(localStorage.getItem('username')) {
        if(localStorage.getItem(`likeQuestion${questionId}`)) {
          this.$message({
            message: '你已经为这篇文章点过赞了噢~o(*￣▽￣*)o',
            type: 'warning',
            offset:'80'
          });
        } else {
          let data = {}
          data.token = localStorage.username
          userIsLogined(data).then(res => {
            if(res.data.statusCode === 200){
              /* 发送请求 */
              let param = {}
              param.questionId = questionId
              param.author = localStorage.userId
              questionLike(param).then(res => {
                if(res.data.statusCode === 200){
                  localStorage.setItem(`likeQuestion${questionId}`,questionId);
                  this.getQuestion(this.id)
                  this.$message({
                    message: res.data.message,
                    type: 'success'
                  });
                  // this.articleLists.forEach(item => {
                    // if(this.id === questionId){
                    //   item.likes += 1;
                    // }
                  // })
                }else {
                  this.$message({
                    message: res.data.message,
                    type: 'error'
                  });
                }
              })
            }else {
              // token已过期
              localStorage.removeItem("username");
              this.$message({
                message: res.data.message,
                type: 'error'
              });
            }
          })
        }
      } else {
        this.$message({
          message: "请先去登陆再来点赞ba！(ノへ￣、)",
          type: 'error'
        });
      }
    },
    /* 留言start */
    leaveComments() {
      if (localStorage.getItem("username")) {
        let data = {};
        data.token = localStorage.username;
        userIsLogined(data)
          .then((res) => {
            if (res.data.statusCode === 200) {
              // 如果 留言不为空的话
              if (this.formComment.content) { 
                this.formComment.token = localStorage.username;
                if (!this.formComment.isReply) {
                  this.formComment.parentId = this.id;
                }
                leaveComment(this.formComment)
                  .then((res) => {
                    console.log(res.data);
                    if (res.data.statusCode == 200) {
                      this.$message({
                        message: res.data.message,
                        type: "success",
                      });
                      this.formComment.content = "";
                      this.formComment.isReply = false;
                      this.getQuestionComment();
                    } else {
                      this.$message({
                        type: "error",
                        message: res.data.message,
                        offset: "80",
                      });
                      // this.$router.replace('/login')
                    }
                  })
                  .catch((err) => {});
              }
              //如果为空我们就不发起请求 给用户提示不能为空
              else {
                this.$message({
                  message: "小主信息不能为空哦,(ノへ￣、)！",
                  type: "warning",
                  offset: "80",
                });
              }
            } else {
              // token 过期
              localStorage.removeItem("username");
              this.$message({
                type: "error",
                message: res.data.message,
                offset: "80",
              });
            }
          })
          .catch((err) => {});
      } else {
        this.$message({
          message: "请先去登录再来留言哦,(ノへ￣、)！",
          type: "warning",
        });
      }
    },
    /* 留言end */
    /* 评论的回复 */
    commentClick(parentUser, id, type) {
      this.formComment.parentId = id; //评论内容id
      this.formComment.type = type; // 回复类型 1为回复评论 2为回复回复
      this.formComment.grandId = id; // 评论的回复中把祖父id定义为被评论的id
      this.formComment.parentUser = parentUser; // 被回复的人
      this.formComment.isReply = true;
      console.log("comment", this.formComment);
    },
    /* 回复的回复 */
    replyClick(grandId, parentUser, id, type) {
      this.formComment.parentId = id; //回复内容id
      this.formComment.type = type; // 回复类型 1为回复评论 2为回复回复
      this.formComment.grandId = grandId; // 评论的回复中把祖父id定义为被评论的id
      this.formComment.parentUser = parentUser; // 被回复的人
      this.formComment.isReply = true;
      console.log("reply", this.formComment);
    },
    /* 获取留言 */
    getQuestionComment() {
      let data = {};
      data.id = this.id | 0;
      data.type = 2;
      getComment(data)
        .then((res) => {
          let data = res.data.data;
          if (res.data.statusCode == 200) {
            data.forEach((item) => {
              item.avatar = this.baseUrl + item.avatar;
              item.reply.forEach((value) => {
                value.avatar = this.baseUrl + value.avatar;
              });
            });
            this.comment = data;
            console.log(data);
          } else {
            this.$message({
              type: "error",
              message: res.data.message,
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    // 获取传来的文章id
    this.id = this.$route.params.id
    this.getQuestion(this.id)
    // 获取此问答的评论
    this.getQuestionComment()
  }
}
</script>

<style lang="scss" scoped>
  #detail {
    padding-top: 80px;
    width: 1000px;
    min-height: 100vh;
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
      }
      .footer i{
          cursor: pointer;
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
        .reply {
          margin: 20px 20px 0;
          // height: 100px;
          .r-info {
            background-color: #eaeaea;
          }
        }
        .icon-comment {
          cursor: pointer;
        }
      }
    }
  }
  .reply_box {
    .txtarea {
      background-color: #eaeaea;
    }
  }
</style>