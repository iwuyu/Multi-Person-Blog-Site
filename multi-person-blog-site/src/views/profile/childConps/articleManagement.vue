<template>
  <div class="article_management">
    <h1>文章管理</h1>
    <div class="search">
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
      <el-select class="change" v-model="param.articleStatus" @change="selectLabelChanged" filterable placeholder="请选择状态">
        <el-option
          v-for="item in articleStatusData"
          :key="item.articleStatus_id"
          :label="item.articleStatus_name"
          :value="item.articleStatus_id">
        </el-option>
      </el-select>
      <el-input
        class="input-keywork"
        v-model="param.keyword"
        @blur="inputEnd"
        placeholder="请输入关键字"
        clearable
      ></el-input>
    </div>
    <div class="list">
    <el-table :data="tableData" style="width: 100%; ">
      <el-table-column label="文章标题">
        <template slot-scope="scope">
          <span style="-webkit-line-clamp: 1;display: -webkit-box;word-break: break-all;-webkit-box-orient: vertical;line-height: 1.8;">{{ scope.row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column label="文章配图" width="100" >
        <template slot-scope="scope">
          <div class="article_img">
            <img :src="scope.row.image" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column label="点赞量" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 0px">点赞：{{ scope.row.likes }}</span>
        </template>
      </el-table-column>
      <el-table-column label="阅读量" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 0px">阅读：{{ scope.row.access }}</span>
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
      <el-table-column label="操作" width="150">
        <template slot-scope="scope">
          <el-popover
            placement="right"
            width="900"
            trigger="click">
              <articlePublish :list="list">
              </articlePublish>
            <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)" slot="reference">编辑</el-button>
          </el-popover>
          <el-button class="article_del" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    </div>
    <page :total="total" @pageSize="getPageSize" @currentPage="getCurrentPage"/>
  </div>
</template>

<script>
import { getArticle, getArticlesCount, deleteArticle, getCategory, getLabel } from 'network/article';//deleteArticle,
import uploadImage from "network/upload";
import articlePublish from './articleAdd';
import Page from 'components/content/page/Page';

export default {
  name: 'articleManagement',
  components: {
    articlePublish,
    Page
  },
  data() {
    return {
      total:0, // 文章总数
      dialogFormVisible: false,
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
      articleStatusData:[
                          {articleStatus_id:1,articleStatus_name:'已审核'},
                          {articleStatus_id:0,articleStatus_name:'未审核'},
                          {articleStatus_id:2,articleStatus_name:'未通过'}
                        ],
      tableData:[],
      categoryId:'',
      obj:{},
      list:{},
      loading: true
    }
  },
  methods: {
    /* 初始化获取文章数量 */
    getArticleCount(param) {
      getArticlesCount(param).then(res => {
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

    /* 初始化获取文章 */
    getArticlesData(param) {
      getArticle(param).then(res => {
        // 获取文章
        if(res.data.statusCode == 200){
          let data = res.data.data;
          data.forEach((item,index) => {
            item.image = uploadImage.UPLOAD.BASEURL + item.image;
            // this.$set(this.tableData, index, item)
          });
          this.tableData = data;
          this.loading = false;
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
      this.param.currentPage = 1; // 初始化页码，默认第一页
      this.param.keyword = ""; // 初始化关键字框
      this.param.labelId = "";
      this.getArticleCount(this.param); // 获取该分类的总数
      this.getArticlesData(this.param); // 获取该分类的商品
    },
    /* 选中标签 搜索该标签的数据 */
    selectLabelChanged(val){
      this.param.currentPage = 1; // 初始化页码，默认第一页
      this.param.keyword = ""; // 初始化关键字框
      this.getArticleCount(this.param); // 获取该分类的总数
      this.getArticlesData(this.param); // 获取该分类的商品
    },

    /* 获取该页数量的数据 */
    getPageSize(val){
      this.param.pageSize = val; // 获取每页请求数量
      this.getArticleCount(this.param); // 获取商品所有数量
      this.getArticlesData(this.param); // 获取商品数据
    },
    
    /* 获取该页的数据 */
    getCurrentPage(val) {
      this.param.currentPage = val; // 获取当前页
      this.getArticleCount(this.param); // 获取对应条件的所有商品数量
      this.getArticlesData(this.param); // 获取对应条件的商品
    },


    /* 关键字查询input失去焦点查询 */
    inputEnd(val){
      this.param.categoryId = ""; // 分类初始化
      this.param.labelId = ""
      this.getArticleCount(this.param); // 获取该关键字所有商品的总数
      this.getArticlesData(this.param); // 获取该关键字的商品
    },

    handleEdit(index, row) {
      this.list = row;
    },
    handleDelete(index, row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const images = row.image.split('/');
        const image = images[images.length - 1];
        let data = {}
        data.token = localStorage.username
        data.articleId = row.id
        data.image = image
        deleteArticle(data).then(res => {
          if(res.data.statusCode == 200){
            /* 获取所有商品数量 */
            this.getArticleCount(this.param);

            /* 获取商品*/
            this.getArticlesData(this.param);
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
  mounted() {
    /* 获取所有文章数量 */
    this.getArticleCount(this.param);

    /* 获取文章*/
    this.getArticlesData(this.param);
  
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

<style lang="scss" >
  .article_management {
    padding: 1rem 1.5rem 1.5rem 1rem;
    max-width: 1200px;
    margin: 0 auto;
    // .list {
      
    // }
  }
  @media screen and (max-width:600px) {

  }
  .article_management h1 {
    margin-bottom: 1rem;
  }
  .search {
    padding-bottom: 1rem;
    border-bottom: 1px solid #ccc;
  }
  .change {
    margin-right: 1rem;
  }
  .input-keywork {
    width: 15rem;
    display: inline-block;
  }
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

  .el-popover {
    height: 99vh;
    // margin-top: -.7rem;
    overflow-y: auto;
    overflow-x: hidden;
  }
  .article_del {
    margin-left: 1rem;
  }

</style>