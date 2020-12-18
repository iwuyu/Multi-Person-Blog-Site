<template>
  <div class="side">
    <!-- 公告 -->
    <side-item class="side_item" :side-item="notice">
      <p class="notice" style="-webkit-line-clamp: 5;display: -webkit-box;word-break: break-all;-webkit-box-orient: vertical;overflow: hidden;">{{notice.content}}</p>
    </side-item>
    <!-- 搜索框 -->
    <side-item class="side_item" :side-item="search">
      <el-input placeholder="请输入文章标题关键字" v-model="keyword" class="input-with-select">
        <el-button slot="append" @click="searchKeyWord" icon="el-icon-search"></el-button>
      </el-input>
    </side-item>
    <!-- 分类 -->
    <side-item class="side_item" :side-item="category">
      <ul class="tag_cloud">
        <li class="tag_item" @click="categoryClick(item.category_id)" v-for="(item,index) in category.content" :key="index">{{item.category_name}}</li>
      </ul>
    </side-item>
    <!-- 标签 -->
    <side-item class="side_item" :side-item="label">
      <ul class="tag_cloud">
        <li class="tag_item" @click="labelClick(item.label_id)" v-for="(item,index) in label.content" :key="index">{{item.label_name}}</li>
      </ul>
    </side-item>
    <!-- 最新留言 -->
    <!-- <side-item class="side_item" :side-item="newMessage">
      <div class="comment" v-for="(value,index) in newMessage.content" :key="index">
        <div class="comment_img">
          <img :src="value.head_image" alt="">
        </div>
        <div class="comment_content">
          <p class="commenter">{{value.username}}</p>
          <p class="comment_information">{{value.message_content}}</p>
          <p class="comment_url">评: {{value.article_title}}</p>
        </div>
      </div>
    </side-item> -->
    <!-- 站点统计 -->
    <!-- <side-item class="side_item" :side-item="siteStatistics">
      <ul class="site">
        <li class="site_item" v-for="(item,index) in siteStatistics.content" :key="index">
          {{item.lable}}&nbsp;{{item.lableValue}}{{item.unit}}
        </li>
      </ul>
    </side-item> -->
  </div>
</template>

<script>
import SideItem from './SideItem';
import {tagCloud} from 'utils/tagcloud';
// import Bus from 'utils/bus.js';
import uploadImage from "network/upload";
import { getLabel, getCategory } from 'network/article';// , getNewMessage, getSiteStatistics,getNotice
export default {
  name: 'Side',
  data() {
    return{
      keyword:'',
      tagName: '',
      search:{iconUrl:'&#xe609;',title:'搜索'},
      notice:{iconUrl:'&#xe626;',title:'公告',content:'欢迎来到博客园，在这里集结了很多技术文章，希望您有所收获!'},
      label:{iconUrl:'&#xe794;',title:'标签云',content:[]},
      category:{iconUrl:'&#xe629;',title:'分 类',content:[]},

    }
  },
  components: {
    SideItem
  },
  methods: {
    labelClick(labelId) {
      let date = Date.parse(new Date());
      this.$store.state.labelId = labelId + date;
    },
    categoryClick(categoryId) {
      let date = Date.parse(new Date());
      this.$store.state.categoryId = categoryId + date;
    },
    searchKeyWord() {
      this.$store.state.keyword = this.keyword;
      this.keyword = '';
    }
  },
  created() {
    // 获取分类
    getCategory().then((res) => {
      if (res.data.statusCode == 200) {
        this.category.content = res.data.data;
        return tagCloud()
      }else{
        this.$message({
          message: res.data.message,
          type: 'error',
          offset:'80'
        });
      }
    }).then(()=>{
      tagCloud()
    }).catch(err => {})

    // 获取标签
    getLabel().then((res) => {
      if (res.data.statusCode == 200) {
        this.label.content = res.data.data
        return tagCloud()
      }else{
        this.$message({
          message: res.data.message,
          type: 'error',
          offset:'80'
        });
      }
    }).then(()=>{
      tagCloud()
    }).catch(err => {})
  }
}
</script>

<style scoped>
  .side_item {
    margin-bottom: 20px;
  }
  .notice {
    line-height: 21px;
  }
  .comment{
    display: flex;
    padding: 5px 0;
    border-bottom: 1px solid rgba(100,100,100,.1);
  }
  .comment_img img{
    width: 50px;
    border-radius: 45px;
  }
  .comment_content {
    margin-left: 10px;
    overflow: hidden;
  }
  .commenter,.comment_url {
    height: 30px;
    line-height: 30px;
    color:#9466ff;
  }
  .commenter {
    font-size: 16px;
  }
  .comment_url {
    font-size: 13px;
    -webkit-line-clamp: 1;
    display: -webkit-box;
    word-break: break-all;
    -webkit-box-orient: vertical;
    /* line-height: 1.8; */
  }
  .site {
    width: 100%;
    list-style:none;
    display: flex;
    flex-flow: wrap;
  }
  .site_item {
    width: 50%;
    padding: 8px 0;
  }
  .site_item:last-child{
    width: 100%;
  }
  
  .tag_cloud {
    list-style: none;
    display: flex;
    flex-flow: wrap;
    
    justify-content: flex-start;
  }

  .tag_item {
    padding: 5px 10px;
    border-radius: 5px;
    color: #fff;
    margin-right: 5px;
    margin-bottom: 5px;
    cursor: pointer;
  }
  .tag_item:hover {
    transform: rotate3d(10, 20, 0, 30deg);
    cursor: pointer;
    transition: .5s;
  }
  
</style>