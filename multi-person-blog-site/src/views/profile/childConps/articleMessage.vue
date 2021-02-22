<template>
  <div class="article_message">
    <h1>文章评论</h1>
    <h3>选择文章</h3>
    <el-select class="change" v-model="param.categoryId" @change="selectCategoryChanged" filterable placeholder="请选择文章分类">
      <el-option
        v-for="item in categoryData"
        :key="item.category_id"
        :label="item.category_name"
        :value="item.category_id">
      </el-option>
    </el-select>
    <el-select class="change" v-model="param.labelId" @change="selectLabelChanged" filterable placeholder="请选择标签">
      <el-option
        v-for="item in labelData"
        :key="item.label_id"
        :label="item.label_name"
        :value="item.label_id">
      </el-option>
    </el-select>
    <el-select v-model="articleId" placeholder="请选择文章">
      <el-option
        v-for="item in articleList"
        :key="item.id"
        :label="item.title"
        :value="item.id">
      </el-option>
    </el-select>
    <el-button class="select_btn" type="primary"  @click="hasComment(articleId)">确认查询</el-button>
    <hr style="margin:30px 0 10px">
    <h3>评论表</h3>
    <el-table :data="message"  style="width: 80%; ">
      <el-table-column label="评论者" width="200">
        <template slot-scope="scope">
          <el-tag size="medium" style="margin-right: 10px">{{ scope.row.username }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="评论内容">
        <template slot-scope="scope">
          <span style="margin-right: 10px">{{ scope.row.content }}</span>
        </template>
      </el-table-column>
      <el-table-column label="评论日期" width="230">
        <template slot-scope="scope">
          <span>{{ scope.row.time }}</span>
        </template>
      </el-table-column>
      <el-table-column label="回复数量" width="100">
        <template slot-scope="scope">
          <span>{{ scope.row.reply.length }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// import { getMessageAndReply, hasMessage } from 'network/getContent';
// import { getArticle, deleteMessage } from 'network/adminOperation';
import { getArticle, getCategory, getLabel,hasComment, getComment, deleteComment } from 'network/article';
import uploadImage from "network/upload";
export default {
  name: "articleMessage",
  data() {
    return {
      param:{
        categoryId:"", // 当前分类
        labelId:"", //当前标签
        keyword:"", // 关键字
        currentPage:1, // 当前页码
        pageSize:6, // 每页数据量
        author:localStorage.userId, //作者
        articleStatus:1 //文章状态
      },
      categoryData:[],
      labelData:[],
      categoryId:'', // 当前分类
      message:[],
      articleList:[],
      articleId:'', // 被查询的文章
      obj:{},
      list:{},
    }
  },
  methods:{
    /* 初始化获取文章 */
    getArticlesData() {
      getArticle(this.param).then(res => {
        // 获取文章
        if(res.data.statusCode === 200){
          this.articleList = res.data.data;
        }else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      }).catch(err => {})
    },
    /* 选中分类 搜索该分类的数据 */
    selectCategoryChanged(val){
      this.categoryId = val;
      this.param.labelId = "";
      this.getArticlesData(); // 获取该分类的商品
    },
    /* 选中标签 搜索该标签的数据 */
    selectLabelChanged(val){
      this.getArticlesData(); // 获取该分类的商品
    },
    hasComment(articleId) {
      this.message = [];
      let data = {};
      data.id = articleId;
      hasComment(data).then(res => {
        if(res.data.statusCode === 200) {
          if(res.data.data.count > 0){
            this.getMessageAndReply();
          }else {
            this.$message({
              type: 'error',
              message: '此文章还无人问津~'
            })
          }
        }
      })
    },
    // 获取留言与回复信息
    getMessageAndReply() {
      let data = {};
      data.id = this.articleId;
      data.type = 1;
      getComment(data).then(res => {
        if(res.data.statusCode === 200){
          let data = res.data.data;
          this.message = data;
        }else {
          this.$message({
            type: 'error',
            message: res.data.message
          });   
        }
      })
    },
    // 删除评论
    handleDelete(index, row) {
      this.$confirm('注意：此操作会删除该留言与其相关评论, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // console.log(row);
        let data = {};
        data.token = localStorage.username;
        data.articleId = row.parent_id;
        data.commentId = row.id;
        deleteComment(data).then(res => {
          if(res.data.statusCode === 200){
            this.$message({
              type: 'success',
              message: res.data.message
            });
            this.getArticlesData();
          }else {
            this.$message({
              type: 'error',
              message: res.data.message
            })
          }
        }).catch(err => {})
      });
    } 
  },
  // 监听category的变化匹配对应的label
  watch:{
    categoryId(){
      // 遍历对象 获取对象中每个数组的值this.obj[key]
      Object.keys(this.obj).forEach((key) => {
        // 如果所选分类的value与所遍历的值的article_category_id相匹配
        if (this.categoryId == this.obj[key][0].category_id) {
          // 把该值赋值给labels
          this.labelData = this.obj[key];
        }
      });
    }
  },
  created() {
    /* 获取文章*/
    this.getArticlesData();
    // 获取分类
    getCategory().then((res) => {
      if (res.data.statusCode == 200) {
        this.categoryData = res.data.data;
      }else{
        this.$message({
          message: res.data.message,
          type: 'error',
          offset:'80'
        });
      }
    }).catch(err => {})

    // 获取标签
    getLabel().then((res) => {
      if (res.data.statusCode == 200) {
        res.data.data.forEach((item, index) => {
          let categoryName = item.category_name;
          if (!this.obj.hasOwnProperty(categoryName)) {
            // obj中不包括该属性名
            this.obj[categoryName] = []; // 将该字段作为obj的属性名
            this.obj[categoryName].push(item);
          } else {
            this.obj[categoryName].push(item);
          }
        });
      }else{
        this.$message({
          message: res.data.message,
          type: 'error',
          offset:'80'
        });
      }
    }).catch(err => {})
  }
}
</script>
<style scoped>
.article_message {
  padding: 1rem 1.5rem 1.5rem 1rem;
}
.article_message h3 {
  margin: 1.5rem 0 0.5rem 0;
}
.el-table {
  border-radius: 10px;
}
.el-select{
  /* width: calc(80% - 8rem); */
  margin-right: 1rem;
}
.select_btn {
  width: 7rem;
}
</style>