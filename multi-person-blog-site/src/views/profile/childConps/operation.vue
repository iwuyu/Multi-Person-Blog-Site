<template>
  <div class="admin_box">
    <el-container class="panel">
      <el-aside :width="asideWith" translate=".5s">
        <div class="contraction" @click="contraction">
          <el-tooltip class="item" effect="dark" content="展开/关闭菜单" placement="right">
            <i :class="elIcon"></i>
          </el-tooltip>
        </div>
        <!-- default-active="1-1" -->
        <el-menu 
        :default-openeds="['1','2','3','4','5']"
        background-color="#fff"
        text-color="#555"
        active-text-color="#409EFF"
        class="el-menu-vertical-demo"
        :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-user-solid"></i><span slot="title">基本信息</span></template>
            <el-menu-item @click.native="$router.push('/profile/personal')" index="1-1">我的信息</el-menu-item>
          </el-submenu>
          <el-submenu opened="true" index="2">
            <template slot="title"><i class="el-icon-s-order"></i><span slot="title">文章管理</span></template>
              <el-menu-item @click.native="$router.push('/profile/article/management')" index="2-1">我的文章</el-menu-item>
              <el-menu-item @click.native="$router.push('/profile/article/publish')" index="2-2">文章发表</el-menu-item>
              <el-menu-item @click.native="$router.push('/profile/article/message')" index="2-3">文章评论</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-question"></i><span slot="title">问答管理</span></template>
              <el-menu-item @click.native="$router.push('/profile/question/publish')" index="3-1">问题发布</el-menu-item>
              <el-menu-item @click.native="$router.push('/profile/question/management')" index="3-2">我的提问</el-menu-item>
              <!-- <el-menu-item @click.native="$router.push('/profile/question/answer')" index="3-3">被回答</el-menu-item>
              <el-menu-item @click.native="$router.push('/profile/question/myAnswer')" index="3-4">我的回答</el-menu-item> -->
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-s-comment"></i><span slot="title">我的消息</span></template>
              <el-menu-item @click.native="$router.push('/profile/message')" index="4-1">最新消息</el-menu-item>
              <el-menu-item @click.native="$router.push('/profile/letter')" index="4-2">私信</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-s-tools"></i><span slot="title">系统设置</span></template>
              <!-- <el-menu-item index="5-1">关于系统</el-menu-item> -->
              <el-menu-item index="5-1">退出登录</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
  
      <el-container>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import {adminExit} from 'network/adminOperation'
export default {
  name: 'operation',
  data() {
    return {
      isCollapse:false,
      asideWith:'199px',
      elIcon:'el-icon-arrow-left'
    }
  },
  methods:{
    contraction(){
      this.isCollapse = !this.isCollapse;
      if(!this.isCollapse) {
        this.asideWith = '199px';
        this.elIcon = 'el-icon-arrow-left';
      }else {
        this.asideWith = '60px';
        this.elIcon = 'el-icon-arrow-right';
      }
    },
    // adminExit() {
    //   adminExit().then(res => {
    //     if(res.data.err === 0) {
    //       this.$message({
    //         type:'success',
    //         offset:'80',
    //         message:'博主，期待您的下次光临！'
    //       })
    //       this.$router.replace('login')
    //     }else {
    //       this.$message({
    //         type:'error',
    //         offset:'80',
    //         message:'网络出错！请稍后重试'
    //       })
    //     }
    //   })
    // }
  },
  
}
</script>

<style lang="scss" scoped>
  .admin_box {
    height: calc(100vh-60px);
    .panel {
      height: calc(100vh-60px);
    }
    .el-aside {
      width: 200px;
      background-color:#fff;
      height: calc(100vh - 60px);
      max-height: calc(100vh - 60px);
    }

    .contraction {
      height: 50px;
      line-height: 50px;
      padding-left: 40%;
      font-size: 1.3rem;
      color: #555;
    }

    .el-main {
      max-height: calc(100vh - 60px);
      padding: 0;
    }
    i{
      color: #555;
    }

    .el-aside::-webkit-scrollbar,.el-main::-webkit-scrollbar{
	    width: 0;
    }

    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }
</style>