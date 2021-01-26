<template>
  <div id="admin">
    <el-container class="panel">
      <el-aside :width="asideWith" translate=".5s">
        <div class="contraction" @click="contraction">
          <el-tooltip class="item" effect="dark" content="展开/关闭菜单" placement="right">
            <i :class="elIcon"></i>
          </el-tooltip>
        </div>
        <!-- default-active="1-1" -->
        <el-menu 
        background-color="#2f4050"
        text-color="#fff"
        active-text-color="pink"
        class="el-menu-vertical-demo"
        default-active="1-1"
        :collapse="isCollapse">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-user-solid"></i><span slot="title">仪表盘</span></template>
            <el-menu-item @click.native="$router.push('/admin/dashboard')" index="1-1">仪表盘</el-menu-item>
          </el-submenu>
          <el-submenu opened="true" index="2">
            <template slot="title"><i class="el-icon-s-order"></i><span slot="title">管理面板</span></template>
              <el-menu-item @click.native="$router.push('/admin/audit/article')" index="2-1">文章审核</el-menu-item>
              <el-menu-item @click.native="$router.push('/admin/management/user')" index="2-2">用户管理</el-menu-item>
              <el-menu-item @click.native="$router.push('/admin/audit/question')" index="2-3">问答审核</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-discount"></i><span slot="title">分类/标签</span></template>
              <el-menu-item @click.native="$router.push('/admin/article/category')" index="3-1">分类管理</el-menu-item>
              <el-menu-item @click.native="$router.push('/admin/article/label')" index="3-2">标签云</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-data-analysis"></i><span slot="title">公告</span></template>
              <el-menu-item @click.native="$router.push('/admin/notice/publish')" index="4-1">发布公告</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-s-tools"></i><span slot="title">系统设置</span></template>
              <el-menu-item index="5-1">关于系统</el-menu-item>
              <el-menu-item index="5-2">退出系统</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
  
      <el-container>
        
    <!-- <el-header>博客后台管理系统</el-header> -->
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import adminLogin from './childComps/adminLogin'
export default {
  name:'admin',
  data() {
    return {
      isCollapse:false,
      asideWith:'199px',
      elIcon:'el-icon-arrow-left'
    }
  },
  methods: {
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
  }
}
</script>

<style lang="scss" scoped>
  #admin {
    height: 100vh;
    .el-header {
      height: 80px !important;
      background-color: #2f4050;
      color: #fff;
      text-align: center;
      font-size: 22px;
      line-height: 80px;
    }
    .panel {
      height: 100%;
      // width: 1240px;
      // margin: 0 auto;
    }
    .el-aside {
      width: 200px;
      background-color:#2f4050; //
      // height: calc(100vh - 80px);
      height: 100vh;
    }

    .contraction {
      height: 50px;
      line-height: 50px;
      padding-left: 40%;
      font-size: 1.3rem;
      color: #fff;
    }

    .el-main {
      // max-height: calc(100vh - 80px);
      height: 100vh;
      padding: 20px;
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