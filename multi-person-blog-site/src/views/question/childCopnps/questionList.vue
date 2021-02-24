<template>
<div class="article_list">
  <p class="article_p">问答列表</p>
  <div class="article_item" v-for="item in articleLists" :key="item.id">
    <div class="art_img">
      <div class="q_view">
        <span class="q_num">{{item.likes}}</span>
        <span class="q_tit">点赞</span>
      </div>
      <div class="q_view">
        <span class="q_num">{{item.comment_count}}</span>
        <span class="q_tit">回答</span>
      </div>
      <div class="q_view">
        <span class="q_num">{{item.access}}</span>
        <span class="q_tit">浏览</span>
      </div>
    </div>
    <!--文章内容-->
    <div class="content">
      <!-- 时间、标题 -->
      <div class="tops">
        <span class="title" @click="toDetail(item.id)">{{item.title}}</span>
      </div>
      <!-- 描述 -->
      <div class="bodys">
        <p class="summary"><strong>问题描述：</strong>{{item.describes}}</p>
      </div>
      <!--时间、浏览量、评论量、点赞量-->
      <div class="foots">
        <span><el-tag type="success">{{item.name}}</el-tag></span>
        <span>
          <span class="user-name" @click="$router.push(`/user/home/${item.author_id}`)"> <i class="iconfont icon-user"></i>&nbsp; {{item.username }}</span> &nbsp;&nbsp;
          <span> <i class="iconfont icon-icon-time"></i>&nbsp;{{item.time}}</span>&nbsp;&nbsp;
        </span>
      </div>
    </div>
    <div class="bar"></div>
  </div>
  <div class="page">
    <el-pagination small :page-size="param.pageSize" :current-page.sync="param.currentPage" @current-change="pageChange" layout="prev, pager, next" :total="questionCounts"></el-pagination>
  </div>
</div>
</template>

<script>
import Page from "../../../components/content/article/Page";
import { getQuestion,getQuestionCount } from 'network/question';

export default {
  name: "ArticleList",
  components: {
    Page
  },
  props:{user:{
    type: Object,
    default:() => ({})
  }},
  data() {
    return {
      articleLists: [],
      questionCounts: 0,
      // 文章页码与每页显示数量
      param: {
        labelId:'', //当前标签
        keyword:'', // 关键字
        currentPage:1, // 当前页码
        pageSize:5, // 每页数据量
        author:'', //作者
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

    // 切换问答页码
    pageChange() {
      /* 获取所有问答数量 */
      this.getQuestionCount(this.param);

      /* 获取问答*/
      this.getQuestionData(this.param);
    },

    /* 初始化获取问答数量 */
    getQuestionCount(param) {
      getQuestionCount(param).then(res => {
        let data = res.data;
        if(data.statusCode == 200) {
          this.questionCounts = data.data[0].count;
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
          console.log('success',data);
          // data.forEach((item,index) => {
          //   item.image = uploadImage.UPLOAD.BASEURL + item.image;
          //   // this.$set(this.tableData, index, item)
          // });
          this.articleLists = data;
          this.loading = false;
        }else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      }).catch(err => {})
    },
  },
  watch: {
    user: {
      immediate:true,
      handler(n,o) {
        console.log(1111111,n);
        this.param.author = n.userId ? n.userId : ''
        /* 获取所有问答数量 */
        this.getQuestionCount(this.param);

        /* 获取问答*/
        this.getQuestionData(this.param);
      }
    }
  },
  created() {
    /* 获取所有问答数量 */
    this.getQuestionCount(this.param);

    /* 获取问答*/
    this.getQuestionData(this.param);
  }
};
</script>

<style lang="scss" scoped>
  .article_list {
    background: #fff;
    padding: 10px;
    border-radius: 5px;
    .article_p {
      height: 40px;
      line-height: 40px;
      border-bottom: 1px solid #ccc;
      img{
        height: 30px;
        line-height: 40px;
      }
    }
    .article_item {
      display: flex;
      padding: 10px 0;
      position: relative;
      border-bottom: 1px solid #ddd;
      box-sizing: border-box;
      &:hover{
        .bar{
          position: absolute;
          bottom: 0;
          height: 1px;
          background: #409EFF;
          animation: line 1s 1;
          animation-fill-mode: forwards;
        }
      }
      @keyframes line {
        0% {
          width: 0;
        }
        100% {
          width: 100%;
        }
      }
      .art_img {
        width: 250px;
        display: flex;
        align-items: center;  
        border-radius: 5px;
        padding: 0 20px;
        .q_view{
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
      }
      .content {
        flex: 1;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        margin-left: 1rem;
        .tops{
          p{
            color: #444;
            font-size: .8rem;
            line-height: 1.5rem;
          }
          .title{
            color: #333;
            font-size: 1.2rem;
            line-height: 2rem;
            cursor: pointer;
          }
          .title:hover{
          	background: radial-gradient(circle at 10px -7px, transparent 8px, currentColor 8px, currentColor 9px, transparent 9px) repeat-x,
          	radial-gradient(circle at 10px 27px, transparent 8px, currentColor 8px, currentColor 9px, transparent 9px) repeat-x;
          	background-size: 20px 20px;
          	background-position: -10px calc(100% + 16px), 0 calc(100% - 4px);
          	animation: waveFlow 1s infinite linear;
          }
          @keyframes waveFlow {
          	from { background-position-x: -10px, 0; }
          	to { background-position-x: -30px, -20px; }
          }
        } 
        .bodys{
          height: 40px;
          line-height: 40px;
          font-size: .85rem;
          color: #666;
          -webkit-line-clamp: 1;
          display: -webkit-box;
          overflow: hidden;
          word-break: break-all;
          text-overflow: ellipsis;
          -webkit-box-orient: vertical;
          line-height: 1.8;
          -moz-box-flex: 1;
          -webkit-box-flex: 1;
        }
        .foots{
          color: #444;
          font-size: .85rem;
          line-height: 1.5rem;
          span:nth-child(1){
            float: left;
            // &:nth-child(1) {
            //   cursor: pointer;
            // }
            span {
              cursor: pointer;
            }
          }
          span:nth-child(2){
            float: right;
          }
          .user-name:hover {
            cursor: pointer;
            color: #409EFF;
          }
        }
      }
    }
  }
  @media screen and (max-width:768px) {
    .article_item{
      flex-direction: column;
      .art_img {
        width: 100% !important;
      }
      .content{
        margin: 0 !important;
      }
    }
  }
</style>