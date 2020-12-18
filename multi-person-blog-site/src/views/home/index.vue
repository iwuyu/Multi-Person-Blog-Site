<template>
  <div id="home">
    <el-row :gutter="20">
      <el-col class="hidden-md-and-down"          :lg="1" :xl="2"><div class="grid-content"></div></el-col>
      <el-col :xs="24" :sm="24"          :md="18" :lg="16" :xl="15">
        <div class="banner">
          <el-carousel indicator-position="outside">
            <el-carousel-item v-for="item in 4" :key="item">
              <h3>{{ item }}</h3>
            </el-carousel-item>
          </el-carousel>
        </div>
        <article-list class="list"/>
      </el-col>
      <el-col class="hidden-sm-and-down" :md="6"  :lg="6" :xl="5"><side/></el-col>
      <el-col class="hidden-md-and-down"          :lg="1" :xl="2"><div class="grid-content"></div></el-col>
    </el-row>
  </div>
</template>

<script>
import ArticleList from "components/content/article/ArticleList"
import Side from 'components/content/article/Side'
export default {
  name: "home",
  components: {
    ArticleList,
    Side
  }
}
</script>

<style lang="scss" scoped>
  #home {
    padding-top: 80px;
  }
  .grid-content {
    min-height: 36px;  
  }
  .banner{
    padding: 10px;
    background: #fff;
    border-radius: 5px;
  }
  .list{
    margin-top: 20px;
  }
  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 200px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>