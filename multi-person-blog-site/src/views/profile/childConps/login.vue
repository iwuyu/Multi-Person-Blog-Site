<template>
<div id="login" class="container" :class="isLogin?'right-panel-active':''">
  <div class="form-container sign-up-container">
    <!-- 注册 -->
    <div class="form">
      <h1>用户注册</h1>
      <div class="social-container">
        <a class="social" v-for="(item,index) in 4" :key="index"><i class="iconfont icon-qq"></i></a>
      </div>
      <span>欢迎加入博客大家庭╰(￣▽￣)╭</span>
      <el-form :model="registerForm" status-icon :rules="rules" ref="registerForm"  class="demo-ruleForm">
        <el-form-item  prop="regUsername">
          <el-input id="regUsername" class="el-input" type="text" v-model="registerForm.regUsername" placeholder="用户名" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="regPassword">
          <el-input id="regPassword" class="el-input" type="password" v-model="registerForm.regPassword" placeholder="密码" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="mail">
          <el-input id="mail" class="el-input" type="text" v-model="registerForm.mail" placeholder="邮箱" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button id="send_code" @click="sendEmail" type="primary">发送验证码</el-button>
        </el-form-item>
        <el-form-item prop="code">
          <el-input id="code" class="el-input" type="text" v-model="registerForm.code" placeholder="验证码" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <button @click="submitRegister('registerForm')">注册</button>
    </div>
  </div>
  <div class="form-container sign-in-container">
    <!-- 登陆 -->
    <div class="form">
      <h1>用户登录</h1>
      <div class="social-container">
        <a class="social" v-for="(item,index) in 4" :key="index"><i class="iconfont icon-qq"></i></a>
      </div>
      <span>一直在等你，欢迎回来╰(￣▽￣)╭</span>
      <el-form :model="loginForm" status-icon :rules="rules" ref="loginForm"  class="demo-ruleForm">
        <el-form-item  prop="username">
          <el-input id="username" class="el-input" type="text" v-model="loginForm.username" placeholder="用户名" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input id="password" class="el-input" type="password" v-model="loginForm.password" placeholder="密码" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <a class="forget">忘记密码？</a>
      <button @click="submitLogin('loginForm')">登录</button>
    </div>
  </div>
  <!-- 侧边栏内容 -->
  <div class="overlay-container">
    <div class="overlay">
      <div class="overlay-panel overlay-left">
        <h1>已有帐号？</h1>
        <p>亲 快快点我去进行登录吧。</p>
        <button class='ghost' @click="loginSwitch">登录</button>
      </div>
      <div class="overlay-panel overlay-right">
        <h1>没有帐号？</h1>
        <p>点击注册去注册一个属于你的账号吧。</p>
        <button class='ghost' @click="loginSwitch">注册</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { userLogin, userRegister, sendMail } from "network/login/login";
export default {
  name: "login",
  data() {
    var validateUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入账号'));
      }
      callback();
    };
    var validatePassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    var validateRegUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入账号'));
      }
      callback();
    };
    var validateRegPassword = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    var validateMail = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入邮箱'));
      }
      callback();
    };
    var validateCode = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码'));
      } else {
        callback();
      }
    };
    return {
      isLogin:false,
      loginForm: {
        username: '',
        password: ''
      },
      registerForm: {
        regUsername: '',
        regPassword: '',
        mail: '',
        code:''
      },
      rules: {
        username: [
          { validator: validateUsername, trigger: 'blur' }
        ],
        password: [
          { validator: validatePassword, trigger: 'blur' }
        ],
        regUsername: [
          { validator: validateRegUsername, trigger: 'blur' }
        ],
        regPassword: [
          { validator: validateRegPassword, trigger: 'blur' }
        ],
        mail: [
          { validator: validateMail, trigger: 'blur' }
        ],
        code: [
          { validator: validateCode, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    loginSwitch() {
      this.isLogin = !this.isLogin;
    },
    submitLogin(data) {
      this.$refs[data].validate((valid) => {
        if (valid) {
          userLogin(data).then(res => {
            console.log(res);
          })
        } else {
          console.log('error login!!');
          return false;
        }
      });
    },
    sendEmail() {
      let data = {};
      data.mail = this.registerForm.mail;
      console.log(data)
      sendMail(data).then(res => {
        console.log(res);
      })
    },
    submitRegister(data) {
      this.$refs[data].validate((valid) => {
        if (valid) {
          // console.log(data)
          let data = this.registerForm;
          let truedata = {};
          truedata.username = data.regUsername;
          truedata.password = data.regPassword;
          truedata.mail = data.mail;
          truedata.code = data.code;
          userRegister(truedata).then(res => {
            console.log(res);
          })
        } else {
          console.log('error register!!');
          return false;
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin: 2rem auto;
  position: relative;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, .25), 0 10px 10px rgba(0, 0, 0, .22);
  padding: 0.6rem;
  width: 50rem;
  height: 35rem;
  overflow: hidden;
  max-width: 100vw;
  min-height: 70vh;
  h1 {
    margin: 0.2rem;
    font-size: 1.2rem;
  }
  p {
    font-size: 1rem;
    line-height: 1.5rem;
    font-weight: 100;
    margin: 1.2rem 0;
    letter-spacing: 0.1rem;
  }
  span {
    font-size: 0.8rem;
    margin: 1.2rem 0;
  }
  a {
    color: #333;
    font-size: 1rem;
    text-decoration: none;
  }
  .form-container{
    .form {
      background: #fff;
      display: flex;
      flex-direction: column;
      padding: 0 1.8rem;
      height: 100%;
      justify-content: center;
      align-items: center;
      .social-container {
        margin: 0.6rem 0;
        a {
          border: 1px solid #eee;
          border-radius: 50%;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          margin: 0 5px;
          height: 1.8rem;
          width: 1.8rem;
          &:nth-child(1) {
            background-color: rgb(247, 33, 33);
          }
          &:nth-child(2) {
            background-color: rgb(243, 243, 36);
          }
          &:nth-child(3) {
            background-color: rgb(15, 165, 15);
          }
          &:nth-child(4) {
            background-color: rgb(90, 90, 163);
          }
          &:hover {
            opacity: .8;
          }
        }
      }
      .el-input {
        width: 100%;
        height: 2.2rem;
        text-indent: 1rem;
      }
      button:active {
        transform: scale(0.95,0.95);
      }
      button {
        padding: 0.4rem 1rem;
        background: #417dff;
        color: white;
        border: 1px solid #fff;
        outline: none;
        cursor: pointer;
        width: 5rem;
        border-radius: 8px;
        transition: all 100ms ease-in;
        // margin: 0.6rem 0;
        font-size: 0.6rem;
        // padding: 0.5rem 0;
        
      }
      .forget {
        margin-bottom: 1rem;
        font-size: .8rem;
        &:hover{
        	background: radial-gradient(circle at 10px -7px, transparent 8px, currentColor 8px, currentColor 9px, transparent 9px) repeat-x,
        	radial-gradient(circle at 10px 27px, transparent 8px, currentColor 8px, currentColor 9px, transparent 9px) repeat-x;
        	background-size: 20px 20px;
        	background-position: -10px calc(100% + 16px), 0 calc(100% - 4px);
        	animation: waveFlow 1s infinite linear;
          cursor: pointer;
        }
        @keyframes waveFlow {
        	from { background-position-x: -10px, 0; }
        	to { background-position-x: -30px, -20px; }
        }
      }
    }
  }
}
button.ghost {
  background: transparent;
  border-color: #fff;
  border: 1px solid #fff;
  outline: none;
  cursor: pointer;
  width: 5rem;
  border-radius: 8px;
  transition: all 100ms ease-in;
  margin: 0.6rem 0;
  padding: 0.5rem 0;
  color: white;
  font-size: 0.6rem;
}
#send_code {
  width: 100%;
  height: 2rem;
  margin-left: 1rem;
}
button.ghost:active {
  transform: scale(0.95,0.95);
}
.form-container {
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.5s ease-in;
}
.sign-in-container {
  left: 0;
  width: 50%;
  z-index: 2;
}
.sign-up-container {
  left: 0;
  width: 50%;
  opacity: 0;
  z-index: 1;
}
.overlay {
  background: #417dff;
  width: 200%;
  height: 100%;
  position: relative;
  left: -100%;
  transition: all 0.6s ease-in-out;
  color: white;
}
.overlay-container {
  position: absolute;
  top: 0;
  right: 0;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: all 0.6s ease-in-out;
  z-index: 99;
}
.overlay-panel {
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 100%;
  padding: 0 2.2rem;
}
.overlay-right {
  right: 0;
}
.container.right-panel-active .overlay-container {
  transform: translateX(-100%);
}
.container.right-panel-active .sign-in-container {
  transform: translateX(100%);
}
.container.right-panel-active .sign-up-container {
  transform: translateX(100%);
  opacity: 1;
  z-index: 5;
  transition: all 0.6s ease-in-out;
}
.container.right-panel-active .overlay {
  transform: translateX(50%);
}
.container.right-panel-active .overlay-left {
  transform: translateX(0);
  transition: all 0.6s ease-in-out;
}
.container.right-panel-active .overlay-right {
  transform: translateX(20%);
  transition: all 0.6s ease-in-out;
}

@media screen and (max-width:810px) {
  .overlay-container {
    width: 30%;
  }
  .form-container {
    width: 100%;
  }
  .form-container .form {
    width: 70%;
    padding: 0 .1rem;
  }
  .overlay-panel {
    h1 {
      display: none;
    }
    p{
      writing-mode: vertical-rl;
      writing-mode: tb-lr;
    }
  } 
  .container.right-panel-active .overlay-container {
    transform: translateX(-240%);
  }
  .container.right-panel-active .sign-up-container {
    transform: translateX(30%);
    opacity: 1;
    z-index: 5;
    transition: all 0.6s ease-in-out;
  }
}
</style>