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
        background-color="#409EFF"
        text-color="#fff"
        active-text-color="pink"
        class="el-menu-vertical-demo"
        default-active="1-1"
        :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-user-solid"></i><span slot="title">基本信息</span></template>
            <el-menu-item @click.native="$router.push('/profile/personal')" index="1-1">基本信息</el-menu-item>
          </el-submenu>
          <el-submenu opened="true" index="2">
            <template slot="title"><i class="el-icon-s-order"></i><span slot="title">文章管理</span></template>
              <el-menu-item @click.native="$router.push('/profile/article/management')" index="2-1">文章列表</el-menu-item>
              <el-menu-item @click.native="$router.push('/profile/article/publish')" index="2-2">文章发表</el-menu-item>
              <el-menu-item @click.native="$router.push('/admin/article/message')" index="2-3">文章评论</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-discount"></i><span slot="title">分类/标签</span></template>
              <el-menu-item @click.native="$router.push('/admin/article/category')" index="3-1">文章分类</el-menu-item>
              <el-menu-item @click.native="$router.push('/admin/article/label')" index="3-2">标签云</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-video-camera-solid"></i><span slot="title">Demo</span></template>
              <el-menu-item @click.native="$router.push('/admin/demo/publish')" index="4-1">Demo上传</el-menu-item>
              <el-menu-item @click.native="$router.push('/admin/demo/management')" index="4-2">Demo管理</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-folder-opened"></i><span slot="title">Tools</span></template>
              <el-menu-item @click.native="$router.push('/admin/tool/publish')" index="5-1">Tool上传</el-menu-item>
              <el-menu-item @click.native="$router.push('/admin/tool/management')" index="5-2">Tool管理</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"><i class="el-icon-data-analysis"></i><span slot="title">公告</span></template>
              <el-menu-item @click.native="$router.push('/admin/notice/publish')" index="6-1">发布公告</el-menu-item>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title"><i class="el-icon-s-tools"></i><span slot="title">系统设置</span></template>
              <el-menu-item index="7-1">关于系统</el-menu-item>
              <el-menu-item index="7-2">退出系统</el-menu-item>
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
      isCollapse:true,
      asideWith:'59px',
      elIcon:'el-icon-arrow-right'
    }
  },
  methods:{
    contraction(){
      this.isCollapse = !this.isCollapse;
      if(this.isCollapse) {
        this.asideWith = '60px';
        this.elIcon = 'el-icon-arrow-right';
      }else {
        this.asideWith = '199px';
        this.elIcon = 'el-icon-arrow-left';
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
      background-color:#409EFF;
      height: calc(100vh - 60px);
      max-height: calc(100vh - 60px);
    }

    .contraction {
      height: 50px;
      line-height: 50px;
      padding-left: 40%;
      font-size: 1.3rem;
      color: #fff;
    }

    .el-main {
      max-height: calc(100vh - 60px);
      padding: 0;
    }
    i{
      color: #fff;
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