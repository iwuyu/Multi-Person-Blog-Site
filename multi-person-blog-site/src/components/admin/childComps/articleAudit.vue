<template>
  <div class="article-audit">
    <h3>文章审核</h3>
    <div class="list">
      <el-table :data="tableData" style="width: 100%;" @row-click="handleSelectionChange">
        <el-table-column label="文章标题">
          <template slot-scope="scope">
            <span style="-webkit-line-clamp: 1;display: -webkit-box;word-break: break-all;-webkit-box-orient: vertical;line-height: 1.8;">{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="文章配图" width="150" >
          <template slot-scope="scope">
            <div class="article_img">
              <img :src="scope.row.image" alt="">
            </div>
          </template>
        </el-table-column>
        <el-table-column label="点赞量" width="120">
          <template slot-scope="scope">
            <span style="margin-left: 0px">点赞量：{{ scope.row.likes }}</span>
          </template>
        </el-table-column>
        <el-table-column label="阅读量" width="120">
          <template slot-scope="scope">
            <span style="margin-left: 0px">阅读量：{{ scope.row.access }}</span>
          </template>
        </el-table-column>
        <el-table-column label="发布日期" width="180">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 0px"> {{ scope.row.time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100">
          <template slot-scope="scope">
            <span style="margin-left: 0px" :class="scope.row.reviewed == 0 ? 'review' : (scope.row.reviewed == 1 ? 'reviewed' : 'nopass')">{{ scope.row.reviewed == 0 ? "待审核" : (scope.row.reviewed == 1 ? "已审核" : "未通过") }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="handleReview(scope.$index, scope.row)">通过</el-button>
            <el-button size="mini" type="danger" @click="handleNoReview(scope.$index, scope.row)">不通过</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <page :total="total" @pageSize="getPageSize" @currentPage="getCurrentPage"/>
  </div>
</template>

<script>
import {getArticle, getArticlesCount,reviewedArticle} from 'network/article'
import uploadImage from "network/upload"
import Page from 'components/content/page/Page'
export default {
  name: 'articleAudit',
  components: {Page},
  data() {
    return {
      total:0, // 文章总数
      tableData:[],
      param:{
        categoryId:"", // 当前分类
        labelId:"", //当前标签
        keyword:"", // 关键字
        currentPage:1, // 当前页码
        pageSize:6, // 每页数据量
        author:"", //作者
        articleStatus:0 //文章状态
      },
    }
  },
  methods: {
    /* 初始化获取文章数量 */
    getArticleCount() {
      getArticlesCount(this.param).then(res => {
        let data = res.data;
        if(data.statusCode == 200) {
          this.total = data.data[0].count
        }else {
          this.$message({
            type:"error",
            message: "商品数量获取失败请稍后重试！"
          })
        }
      }).catch(err => {console.log(err)})
    },
    // 初始化获取文章
    getNoreviewedArticle () {
      getArticle(this.param).then(res => {
        if(res.data.statusCode == 200) {
          let data = res.data.data
          data.forEach((item,index) => {
            item.image = uploadImage.UPLOAD.BASEURL + item.image
          });
          this.tableData = res.data.data
        }else {
          this.$message({
            message: res.data.message,
            type: 'error'
          });
        }
      })
    },

    /* 获取该页数量的数据 */
    getPageSize(val){
      this.param.pageSize = val; // 获取每页请求数量
      this.getArticleCount(); // 获取商品所有数量
      this.getArticlesData(); // 获取商品数据
    },
    
    /* 获取该页的数据 */
    getCurrentPage(val) {
      this.param.currentPage = val; // 获取当前页
      this.getArticleCount(); // 获取对应条件的所有商品数量
      this.getArticlesData(); // 获取对应条件的商品
    },

    /* 审核通过 */ 
    handleReview(index, row) {
      this.$confirm('该文章将被审核通过, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('审核通过',index,row)
        let data = {
          status:1, // 1:审核通过
          articleId:row.id
        }
        reviewedArticle(data).then(res => {
          if(res.data.statusCode == 200) {
            this.$message({
              type:'success',
              message:res.data.message
            })
          }else {
            this.$message({
              type:'error',
              message:res.data.message
            })
          }
        })
      }).catch( err => {})
    },

    /* 审核不通过 */ 
    handleNoReview(index, row) {
      this.$confirm('该文章审核不予通过, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('审核不通过',index,row)
        let data = {
          status:2, // 2:审核不通过
          articleId:row.id
        }
        reviewedArticle(data).then(res => {
          if(res.data.statusCode == 200) {
            this.$message({
              type:'success',
              message:res.data.message
            })
          }else {
            this.$message({
              type:'error',
              message:res.data.message
            })
          }
        })
      }).catch( err => {})
    },

    /* 选中某一行查看详情 */ 
    handleSelectionChange(item) {
      this.$router.push(`/article/detail/${item.id}`);
    }
  },
  created() {
    /* 获取所有文章数量 */
    this.getArticleCount();
    this.getNoreviewedArticle();
  }
}
</script>

<style lang="scss" scoped>
  .el-table {
    margin-top: 1rem;
    border-radius: 10px;
  }
  .article_img {
    height: 2rem;
  }
  .article_img img {
    height: 100%;
    z-index: 999;
  }

  .reviewed {
    color: #67C23A;
  }
  .review {
    color:#E6A23C;
  }
  .nopass {
    color: #F56C6C;
  }
</style>