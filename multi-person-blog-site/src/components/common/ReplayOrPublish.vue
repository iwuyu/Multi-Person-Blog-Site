<template>
  <div class="replay_or_publish">
    <p class="ping"><i class="iconfont">&#xe66f;</i> 评论</p>
    <div class="compile">
      <textarea
        class="txtarea"
        maxlength="200"
        cols="100%"
        rows="5"
        v-model="formComment.content"
        placeholder="你想说些什么呢..."
      ></textarea>
      <el-button plain class="leave_btn" @click="leaveComments"
        >提交评论</el-button
      >
    </div>
    <div class="show_comment">
      <div class="comment_count">{{ this.comment.length }} 评论</div>
      <p class="nothing" v-show="!comment.length">暂无留言</p>
      <div class="comment_list" v-show="comment.length">
        <div
          class="comment_item"
          v-for="(item, index) in comment"
          :key="'comment_item' + index"
        >
          <div class="comment">
            <div class="avatar" v-if="item.avatar">
              <img :src="item.avatar" alt="" />
            </div>
            <div class="profile">
              <div class="name">{{ item.username }}</div>
              <div class="time">{{ item.time }}</div>
              <div class="content">{{ item.content }}</div>
            </div>
            <div
              class="reply_btn"
              @click="commentClick(item.user_id, item.id, 1)"
            >
              回复
            </div>
          </div>
          <div class="reply">
            <div class="comment_list">
              <div
                class="comment_item"
                v-for="(value, key) in item.reply"
                :key="key"
              >
                <div class="avatar" v-if="value.avatar">
                  <img :src="value.avatar" alt="" />
                </div>
                <div class="profile">
                  <div class="name">{{ value.son_user }}</div>
                  <div class="time">{{ value.time }}</div>
                  <div class="content">
                    <span class="parent_name">@ {{ value.parent_user }} </span>
                    {{ value.content }}
                  </div>
                </div>
                <div
                  class="reply_btn"
                  @click="replyClick(item.id, value.user_id, value.id, 2)"
                >
                  回复
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog title="回复" :visible.sync="formComment.isReply" width="90%">
      <div class="compile">
        <textarea
          class="txtarea"
          maxlength="200"
          cols="100%"
          rows="5"
          v-model="formComment.content"
          placeholder="你想说些什么呢..."
        ></textarea>
        <el-button plain class="leave_btn" @click="leaveComments"
          >提交评论</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { leaveComment, getComment } from "network/article";
import { userIsLogined } from "network/login";
import upload from "network/upload";

export default {
  name: "ReplayOrPublish",
  props: ["articleId"],
  data() {
    return {
      comment: [], // 已留言内容
      baseUrl: upload.UPLOAD.BASEURL,
      formComment: {
        parentId: "",
        type: 1,
        content: "",
        token: "",
        isReply: false,
      },
      messageContent: "", // 文章留言内容
      replyContent: "", // 留言回复内容
      drawer: false,
      currentMessageId: null,
      messageCount: 0,
    };
  },
  methods: {
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
                  this.formComment.parentId = this.articleId;
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
                      this.getArticleComment(this.articleId);
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
    getArticleComment(articleId) {
      let data = {};
      data.id = articleId | 0;
      data.type = 1;
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
    setTimeout(() => {
      this.getArticleComment(this.articleId);
    }, 100);
  },
};
</script>

<style lang="scss" scoped>
.replay_or_publish {
  // background: #fff;
  .ping {
    padding: 0 1.5%;
    font-size: 1.3rem;
    i {
      font-size: 1.3rem;
    }
  }
}
.compile,
.show_comment {
  margin: 1rem 1.5%;
  padding: 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #eaeaea;
  background: white;
  border-radius: 5px;
  box-shadow: 0 2px 2px 0 #ccc;
}
.txtarea {
  max-width: 900px;
  height: 10rem;
  line-height: 2rem;
  resize: none;
  outline: none;
  border-radius: 5px;
  border: 0.5px solid #9466ff;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background: url("../../assets/img/combg.webp") 100% no-repeat;
}
.leave_btn {
  width: 200px;
  padding: 13px 0;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  outline: none;
  background: hsl(209, 73%, 75%);
  color: #fff;
  transition: all 0.5s;
  &:hover {
    transform: scale(1.05);
    background: hsl(209, 73%, 75%);
    color: #fff;
  }
}
.show_comment {
  padding-top: 0;
  margin-top: 0;
  box-sizing: border-box;
  .comment_count {
    height: 3rem;
    line-height: 1.5rem;
    width: 100%;
    padding: 1rem;
    border-radius: 5px 5px 0 0;
    font-size: 1.1rem;
    background: rgba(0, 0, 0, 0.3);
    color: #fff;
  }
  .nothing {
    font-size: 1rem;
    padding: 1rem;
  }
  .comment_list {
    padding: 10px;
    width: 100%;
    .comment_item {
      max-width: 900px;
      margin: 0 auto;
      padding: 1rem;
      // border-bottom: 1px solid #ccc;
      .comment {
        display: flex;
        .avatar {
          max-width: 4rem;
          max-height: 4rem;
          border-radius: 50%;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            transition: 1s;
            &:hover {
              transform: rotate(360deg);
              transition: 1s;
            }
          }
        }
        .profile {
          display: flex;
          flex: 1;
          flex-direction: column;
          align-content: space-between;
          justify-content: space-between;
          margin-left: 1rem;
          .name {
            font-size: 1.3rem;
            color: gold;
          }
          .time {
            height: 2rem;
            line-height: 2rem;
            font-size: 0.9rem;
            color: #888;
          }
          .content {
            color: #555;
            min-height: 2rem;
            line-height: 2rem;
          }
        }
        .reply_btn {
          width: 3rem;
          height: 2rem;
          margin-top: 1rem;
          line-height: 2rem;
          background: #fff;
          border-radius: 3px;
          box-shadow: 0 1px 1px 0 #999;
          color: #409eff;
          text-align: center;
        }
      }
      .reply {
        .comment_list {
          padding: 10px;
          width: 100%;
          .comment_item {
            max-width: 900px;
            margin: 0 auto;
            padding: 1rem;
            display: flex;
            border-left: 0.1px dotted #ccc;
            border-bottom: 0.1px dotted #ccc;
            border-right: 0.1px dotted #ccc;
            .avatar {
              max-width: 4rem;
              max-height: 4rem;
              border-radius: 50%;
              img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
                transition: 1s;
                &:hover {
                  transform: rotate(360deg);
                  transition: 1s;
                }
              }
            }
            .profile {
              display: flex;
              flex: 1;
              flex-direction: column;
              align-content: space-between;
              justify-content: space-between;
              margin-left: 1rem;
              .name {
                font-size: 1.3rem;
                color: gold;
              }
              .time {
                height: 2rem;
                line-height: 2rem;
                font-size: 0.9rem;
                color: #888;
              }
              .content {
                color: #555;
                min-height: 2rem;
                line-height: 2rem;
                .parent_name {
                  color: gold;
                }
              }
            }
            .reply_btn {
              width: 3rem;
              height: 2rem;
              margin-top: 1rem;
              line-height: 2rem;
              background: #fff;
              border-radius: 3px;
              box-shadow: 0 1px 1px 0 #999;
              color: #409eff;
              text-align: center;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 900px) {
  .leavemessage {
    font-size: 0.9rem;
  }
  .compile {
    padding: 1rem;
  }
  .txtarea {
    max-width: 100%;
  }
  .comment_item {
    width: 100%;
    .avatar {
      width: 3rem;
      height: 3rem;
    }
    // .comment_list{
    //   max-width: 100%;
    //   .comment_item{
    //     max-width: 100%;
    //     // width: 80vw;
    //     // position: relative !important;
    //   }
    // }
  }
}
</style>