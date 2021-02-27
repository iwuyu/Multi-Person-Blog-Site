<template>
  <div id="message">
    <p class="breadbcrumb">我的消息 / 最新消息</p>
    <div class="m-content">
      <div class="message-box" v-for="item in messageList" :key="item.id">
        <p class="time">{{item.time}}</p>
        <div class="msg-info"><span>{{item.type_name}}</span> <span @click="$router.push(`/user/home/${item.initiator_id}`)">{{item.username}}</span>&nbsp; <span>{{item.describes}}</span></div>
        <h4 class="msg-text">{{item.goal_title}}</h4>
        <span class="el-icon-delete-solid msg-del" @click="deleteMessage(item.id)"></span>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserMessage,deleteUserMessage } from'network/user'
export default {
  name: "message",
  data() {
    return {
      param: {
        token: localStorage.username
      },
      messageList:[]
    }
  },
  methods: {
    getMessage() {
      getUserMessage(this.param).then(res => {
        if(res.data.statusCode === 200) {
          this.messageList = res.data.data
          console.log(this.messageList);
        }else {
          this.$message({
            message: res.data.message,
            type: 'error'
          });
        }
      })
    },
    deleteMessage(id) {
      let data = {}
      data.token = localStorage.username
      data.messageId = id
      deleteUserMessage(data).then(res => {
        if(res.data.statusCode === 200) {
          this.getMessage()
          this.$message({
            message: res.data.message,
            type: 'success'
          });
        }else {
          this.$message({
            message: res.data.message,
            type: 'error'
          });
        }
      })
    }
  },
  created() {
    this.getMessage()
  }
}
</script>

<style lang="scss" scoped>
  #message {
    margin: 0 20px;
    .breadbcrumb {
      font-size: 14px;
      padding: 10px;
      color: #666;
      background-color: #fff;
      margin: 10px 0;
    }
    .m-content {
      background-color: #fff;
      padding: 10px 0;
      .message-box {
        width: 80%;
        margin: 20px auto;
        border-radius: 10px;
        background-color: rgba(0,0,0,.1);
      }

    }
  }
  .message-box {
    padding:10px 20px 20px;
    position: relative;
    .time {
      text-align: center;
      color: #777;
      font-size: 14px;
    }
    .msg-info {
      padding-bottom: 10px;
      span:nth-child(1) {
        display: inline-block;
        border: 1px solid #ccc;
        padding: 2px 6px;
        border-radius: 5px;
        margin-right: 10px;
        // background-color: #fff;
        color:gold;
      }
      span:nth-child(2) {
        cursor: pointer;
        &:hover {
          color: #409EFF;
        }
      }
    }
    .msg-text {
      cursor: pointer;
      &:hover{
      	background: radial-gradient(circle at 10px -7px, transparent 8px, currentColor 8px, currentColor 9px, transparent 9px) repeat-x,
      	radial-gradient(circle at 10px 27px, transparent 8px, currentColor 8px, currentColor 9px, transparent 9px) repeat-x;
      	background-size: 20px 20px;
      	background-position: -10px calc(100% + 16px), 0 calc(100% - 4px);
      	animation: waveFlow 1s infinite linear;
      }
    }
    @keyframes waveFlow {
    	from { background-position-x: -10px, 0; }
    	to { background-position-x: -30px, -20px; }
    }
    .msg-del {
      position: absolute;
      top: 10px;
      right: 10px;
      color: #777;
      cursor: pointer;
      &:hover {
        color: #555;
      }
    }
  }
</style>