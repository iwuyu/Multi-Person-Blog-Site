<template>
  <div id="question-management">
    <p class="breadbcrumb">问答管理 / 我的提问</p>
    <div class="list">
    <el-table :data="questionLists" style="width: 100%; ">
      <el-table-column label="问答标题">
        <template slot-scope="scope">
          <span style="-webkit-line-clamp: 1;display: -webkit-box;word-break: break-all;-webkit-box-orient: vertical;line-height: 1.8;">{{ scope.row.title }}</span>
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
      <el-table-column label="回答" width="120">
        <template slot-scope="scope">
          <span style="margin-left: 0px">回答：{{ scope.row.comment_count }}</span>
        </template>
      </el-table-column>
      <el-table-column label="发布日期" width="180">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 0px"> {{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="toDetail(scope.row.id)">查看</el-button>
          <el-button class="article_del" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          <!-- @click="handleDelete(scope.$index, scope.row)" -->
        </template>
      </el-table-column>
    </el-table>
    </div>
    <page :total="total" @pageSize="getPageSize" @currentPage="getCurrentPage"/>
  </div>
</template>

<script>
import Page from 'components/content/page/Page';
// import { userIsLogined } from 'network/login';
// import { getArticle, getArticlesCount, articleLike} from 'network/article';
import { getQuestion,getQuestionCount,deleteQuestion } from 'network/question';
export default {
  name: 'questionManagement',
  components: {
    Page
  },
  data() {
    return {
      questionLists: [],
      total: 0,
      // 文章页码与每页显示数量
      param: {
        labelId:'', //当前标签
        keyword:'', // 关键字
        currentPage:1, // 当前页码
        pageSize:5, // 每页数据量
        author:localStorage.userId, //作者
        questionStatus: 0 //文章状态
      },
      categoryId:'',
      labelId:'',
      keyword:''
    };
  },
  methods: {
    // 进入详情页
    toDetail(path) {
      this.$store.state.detailId = path;
      this.$router.push("/question/detail/" + path);
    },

    /* 获取该页数量的数据 */
    getPageSize(val){
      this.param.pageSize = val; // 获取每页请求数量
      this.getQuestionCount(this.param); // 获取问答所有数量
      this.getQuestionData(this.param); // 获取问答数据
    },
    
    /* 获取该页的数据 */
    getCurrentPage(val) {
      this.param.currentPage = val; // 获取当前页
      this.getQuestionCount(this.param); // 获取对应条件的所有问答数量
      this.getQuestionData(this.param); // 获取对应条件的问答
    },

    /* 初始化获取问答数量 */
    getQuestionCount(param) {
      getQuestionCount(param).then(res => {
        let data = res.data;
        if(data.statusCode == 200) {
          this.total = data.data[0].count;
        }else {
          this.$message({
            type:"error",
            message: "商品数量获取失败请稍后重试！"
          })
        }
      }).catch(err => {console.log(err)})
    },

     /* 初始化获取问答 */
    getQuestionData(param) {
      getQuestion(param).then(res => {
        // 获取问答
        if(res.data.statusCode == 200){
          let data = res.data.data;
          // console.log('success',data);
          this.questionLists = data;
          this.loading = false;
        }else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      }).catch(err => {})
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        let data = {}
        data.token = localStorage.username
        data.questionId = row.id
        deleteQuestion(data).then(res => {
          console.log(res);
          if(res.data.statusCode === 200){
            /* 获取问答数量 */
            this.getQuestionCount(this.param);
            /* 获取问答*/
            this.getQuestionData(this.param);
            this.$message({
              type: 'success',
              message: res.data.message
            });
          }else {
            this.$message({
              type: 'error',
              message: res.data.message
            })
          }
        }).catch(err => {})
      })
    },
  },
  created() {
    /* 获取所有问答数量 */
    this.getQuestionCount(this.param);

    /* 获取问答*/
    this.getQuestionData(this.param);
  }
}
</script>

<style lang="scss" scoped>

  .breadbcrumb {
    font-size: 14px;
    padding: 10px;
    color: #666;
    background-color: #fff;
    margin: 10px 0;
  }
  #question-management {
    margin: 0 20px;
  }
  // .list {
  //   margin: 0 20px;
  // }

</style>