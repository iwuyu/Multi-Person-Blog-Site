<template>
  <div id="private-letter">
    <div class="w">
      <el-container style="height: 650px; border-radius: 20px;">
        <el-aside width="300px" style="background-color:#3d3d3d;">
          <div class="friends">
            <div class="my-info">
              <img :src="userList.author.author_avatar" v-if="userList.author" alt="">
              <span class="username" v-if="userList.author">{{userList.author.author_username}}</span>
            </div>
            <ul class="friend-list">
              <li class="" v-for="(item,index) in userList.userLists" :key="index" @click="toogleUser(item.target_id,item.target_username)">
                <img :src="item.target_avatar" v-if="item.target_avatar" alt="">
                <span class="username">{{item.target_username}}</span>
              </li>
            </ul>
          </div>
        </el-aside>

        <el-container>
          <el-header style="background-color: #fff; border-bottom: 1px solid #eaeaea">
            <div class="title">
              <strong>{{currentTargetName}}</strong> 
            </div>
          </el-header>
          <el-main>
            <ul class="content" ref="chatbox">
              <li class="content-item" v-for="item in letterData" :key="item.id">
                <p class="time">{{item.time}}</p>
                <div :class="{'content-info' : true,'active':currentTargetId=== item.target_id }">
                  <img :src="item.author_avatar" alt="">
                  <div class="content-img" v-if="item.is_img === 1">
                    <img :src="item.image_url" alt="">
                  </div>
                  <span class="word" v-else>{{item.say_word}}</span>
                  <span class="el-icon-delete del" v-show="currentTargetId === item.target_id" @click="deleteLetter(item.id)"></span>
                </div>
              </li>
            </ul>
          </el-main>
          <!-- <el-footer style="background-color: #fff; border-top: 1px solid #eaeaea"> -->
            <div class="publish">
              <div class="tool">
                <el-upload
                  class="upload-demo"
                  ref="upload"
                  :action="uploadUrl"
                  :on-success="handleSuccess"
                  name="letterImage"
                  :limit="1"
                  :show-file-list="false"
                  :with-credentials="true"
                >
                  <span class="el-icon-picture"></span>
                </el-upload>
              </div>
              <textarea
                class="txtarea"
                maxlength="200"
                cols="100%"
                rows="5"
                v-model="param.word"
                placeholder="你想对他说点什么呢...">
              </textarea>
              <el-button type="danger" size="medium" @click="sendWord" class="leave_btn">提交</el-button>
            </div>
          <!-- </el-footer> -->
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script>
import {getLetterList,getLetterData,speakPublic,deleteLetter} from 'network/letter'
import upload from "network/upload";
export default {
  name: 'privateLetter',
  data() {
    return {
      param: {
        token: localStorage.username,
        hisId: '',
        word : '',
        image: '',
        isImage: false
      },
      uploadUrl : upload.UPLOAD.BASEURL + '/letter/letterImage',
      userList:[],
      letterData:[],
      currentTargetId:'',
      currentTargetName:''
    }
  },
  methods: {
    // 切换用户
    toogleUser(id,name){
      // 获取与该用户的聊天记录
      this.param.hisId = id
      this.currentTargetId = id
      this.currentTargetName = name
      this.getLetter()
    },
    goButtom() {
      this.$refs.chatbox.scrollTop = this.$refs.chatbox.scrollHeight
    },
    // 发言
    sendWord() {
      if(this.param.word.trim() === ''){
        return this.$message({
          type: 'error',
          message: '不能发送空内容O~'
        })
      }
      speakPublic(this.param).then(res => {
        if(res.data.statusCode === 200) {
          this.param.word = ''
          this.getLetter()
        }else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      })
    },
    // 删除发言
    deleteLetter(id) {
      console.log(id);
      let data= {}
      data.token = localStorage.username
      data.letterId = id
      deleteLetter(data).then(res => {
        if(res.data.statusCode !== 200){
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }else {
          this.getLetter()
        }
      })
    },
    // 上传图片
    handleSuccess(res) {
      console.log(res);
      if (res.statusCode === 200) {
        this.param.image = res.data
        this.param.isImage = true
        speakPublic(this.param).then(()=> {
          this.getLetter()
        })
        // setTimeout(()=> {
        //   this.getUserList()
        // })
        
      } else {
        this.$message({
          type: 'error',
          message: res.message
        });
      }
    },
    // 获取用户列表
    getUserList() {
      getLetterList(this.param).then(res => {
        if(res.data.statusCode === 200) {
          let data = res.data.data
          data.author.author_avatar = upload.UPLOAD.BASEURL + data.author.author_avatar
          data.userLists.forEach((item) => {
            item.target_avatar = upload.UPLOAD.BASEURL + item.target_avatar
          });
          this.userList= data
          return this.goButtom
        }else{
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      }).then(res => {
        res()
      })
    },
    // 获取私信内容
    getLetter() {
      getLetterData(this.param).then(res => {
        if(res.data.statusCode === 200) {
          let data = res.data.data
          data.forEach(item => {
            if(item.is_img === 1) {
              item.image_url = upload.UPLOAD.BASEURL + item.image_url
            }
            item.author_avatar = upload.UPLOAD.BASEURL + item.author_avatar
            item.target_avatar = upload.UPLOAD.BASEURL + item.target_avatar
          });
          this.letterData= data
          console.log(data);
          this.goButtom()
        }else{
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      })
    }
  },
  created() {
    getLetterList(this.param).then(res => {
      if(res.data.statusCode === 200) {
        let data = res.data.data
        data.author.author_avatar = upload.UPLOAD.BASEURL + data.author.author_avatar
        data.userLists.forEach((item,index) => {
          if(index === 0) {
            this.param.hisId = item.target_id
            this.currentTargetId = item.target_id
            this.currentTargetName = item.target_username
          }
          item.target_avatar = upload.UPLOAD.BASEURL + item.target_avatar
        });
        this.userList= data
        return this.getLetter
      }else{
        this.$message({
          type: 'error',
          message: res.data.message
        })
      }
    }).then(res => {
      res()
      // setInterval(()=>{
      //   res()
      // },6000)
    })
  }
}
</script>

<style lang="scss" scoped>
  #private-letter {
    padding-top: 80px;
    min-height: 100vh;
    .w {
      width: 1000px;
      height: 650px;
      margin: 0 auto;
      background-color: #fff;
      position: relative;
    }
    .friends {
      padding-top: 70px;
      .my-info {
        height: 70px;
        position: absolute;
        top:0;
        left: 0;
        width: 300px;
        background-color: #2e2e2e;
        border-bottom: 1px solid #777;
        display: flex;
        align-items: center;
        padding: 0 20px;
        color: #fff;
        img {
          width: 40px;
          height: 40px;
        }
        .username {
          margin-left: 20px;
        }
      }
      .friend-list {
        li {
          height: 70px;
          border-bottom: 1px solid #2e2e2e;
          display: flex;
          align-items: center;
          padding: 0 20px;
          color: #fff;
          cursor: pointer;
          &:hover {
            background-color: #2e2e2e;
          }
          img {
            width: 40px;
            height: 40px;
          }
          .username {
            margin-left: 20px;
          }
          &.active {
            background-color: #2e2e2e;
          }
        }
      }
    }
    .title{
      height: 60px;
      line-height: 60px;
      color: #555;
    }
    .content {
      background-color: #fff;
      list-style: none;
      .content-item {
        padding-bottom: 20px;
        .time {
          font-size: 13px;
          text-align: center;
          color: #888;
        }
        .content-info {
          display: flex;
          align-items: center;
          img{
            width: 40px;
            height: 40px;
            margin: 0 20px;
          }
          .content-img {
            width: 300px;
            height: 200px;
            img {
              width: 100%;
              height: 100%;
            }
          }
          .word {
            display: inline-block;
            background-color: #5cacde;
            height: 35px;
            line-height: 35px;
            border-radius: 5px;
            padding: 0 5px;
            position: relative;
            &::before {
              content: '';
              background-color: #5cacde;
              width: 8px;
              height: 8px;
              transform: rotate(-45deg);
              position: absolute;
              top: 10px;
              left: -3px;
            }
          }
          .del {
            margin: 0 20px;
            color: #999;
            display: none;
            cursor: pointer;
            &:hover {
              color: #555;
            }
          }
          &:hover .del {
            display: block;
          }
          &.active {
            flex-direction: row-reverse;
            .word::before {
              content: '';
              display: none;
            }
            .word::after {
              content: '';
              background-color: #5cacde;
              width: 8px;
              height: 8px;
              transform: rotate(-45deg);
              position: absolute;
              top: 10px;
              right: -3px;
            }
          }
        }
      }
    }
    .publish {
      height: 160px;
      border-top: 1px solid #eaeaea;
      position: relative;
      .tool {
        height: 30px;
        line-height: 30px;
        span {
          font-size: 20px;
          margin-left: 20px;
          color: #777;
          cursor: pointer;
          &:hover {
            color: #555;
          }
        }
      }
      .txtarea {
        width: 100%;
        height: 130px;
        resize: none;
        border: none;
        outline: none;
        padding: 10px;
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
  }
  .el-aside::-webkit-scrollbar,.el-main::-webkit-scrollbar{
	  width: 0;
  }
</style>