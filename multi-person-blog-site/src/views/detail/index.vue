<template>
  <div id="detail">
    <div class="detail_header">
      <p class="art_title">{{articleDetail.title}}</p>
      <ul class="art_about">
        <li>
          作者&nbsp;{{articleDetail.username}}&nbsp;&nbsp;&nbsp;
        </li>
        <li>
          {{articleDetail.time}}&nbsp;&nbsp;&nbsp;
        </li>
        <li>
          阅读&nbsp;{{articleDetail.access}}&nbsp;&nbsp;&nbsp;
        </li>
        <!-- <li>
          评论&nbsp;{{messageCount}}&nbsp;&nbsp;&nbsp;
        </li> -->
        <li>
         喜欢&nbsp;{{articleDetail.likes}}
        </li>
      </ul>
    </div>
    <div class="tag_box">
      <el-tag type="success" size="small">{{articleDetail.category_name}}</el-tag>
      <el-tag type="danger" size="small">{{articleDetail.label_name}}</el-tag>
    </div>
    <div class="markdown-body">
      <div class="article_message hljs renderNav" v-html="articleDetail.content"></div>
    </div>

    <!-- 留言 -->
  <replay-or-publish :articleId="id"/>
  </div>
</template>

<script>
import ReplayOrPublish from "components/common/ReplayOrPublish";
import { getArticleDetail, getComment } from 'network/article';//, getMessageAndReply
import uploadImage from 'network/upload';
// import QrcodeVue from "qrcode.vue";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
export default {
  name:'detail',
  components:{
    ReplayOrPublish
  },
  data() {
    return {
      id: null,
      author:'物语',
      articleDetail: {},
    }
  },
  methods:{
    /* 获取留言 */
    getArticleComment() {
      let data = {};
      data.id = this.id
      data.type = 1
      getComment(data).then(res => {
        console.log(res)
        if(res.data.statusCode == 200){
          this.message = res.data.data
        }else{
          this.$message({
            type:'error',
            message:res.data.message
          })
        }
      }).catch(err => {
        console.log(err)
      })
    } 
  },
  mounted(){
    this.getArticleComment()
    var rendererMD = new marked.Renderer();
    marked.setOptions({
      renderer: rendererMD,
      highlight: function(code) {
        return hljs.highlightAuto(code).value;
      },
      pedantic: false,
      gfm: true,
      tables: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    });
    // 获取传来的文章id
    this.id = this.$route.params.id
    // 根据id查询文章详情
    getArticleDetail(this.id).then(res => {
      let data = res.data;
      if(data.statusCode == 200){
        data.data.content = marked(data.data.content);
        // this.share_img = uploadImage.UPLOADIMG.BASEURL + data.article_image;
        // data.article_music = uploadImage.UPLOADIMG.BASEURL + data.article_music;
        // this.share_title = data.article_title;
        // this.share_brief = data.article_synopsis;
        this.articleDetail = data.data;
      }else {
        this.$message({
          type:'success',
          offset:'80',
          message:data.message
        })
      }
    }).catch(err => {
      console.log(err);
    })
  },

}
</script>

<style lang="scss" scoped>
@import"../../assets/css/detail.css";
#detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 60px 0 20px 0;
  background: #fff;
  // background-color: #f5f5d5;
}
.scrollbar{
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 2px;
  background: #50bcb6;
  transition: width .5s ease;
  z-index: 999999;
}
.el-page-header {
  line-height: 30px;
  padding-left: 1.2%;
}
.detail_header {
  text-align: center;
}
.art_title {
  font-size: 24px;
  color: #555;
  padding: 20px 20px;
}
.art_about {
  color: #555;
  list-style: none;
  display: flex;
  justify-content: center;
  padding-bottom: 20px;
}
.art_about .iconfont {
  font-size: 13px;
}
.tag_box {
  display: flex;
  justify-content: center;
}
.tag_box > .el-tag {
  margin: 0 3px;
}

.image {
  height: 10rem;
  display: flex;
  margin-top: 2rem;
  justify-content: center;
}

.image img {
  height: 100%;
}
.article_message {
  border-left: 1.5px dotted #2980b9;
  border-top: 1.5px dotted #633bd3;
  border-right: 1.5px dotted #192f44;
  border-bottom: 1.5px dotted #27ae60;
  width:97%;
  background: #fff;
  line-height: 1.7rem;
  padding: 1rem;
  margin: 3rem auto;
  border-radius: 5px;
}
@media screen and (max-width: 610px) {
  .article_message {
    width: 98%;
  }
  .detail_share span {
    display: none;
  }
}

.detail_share {
    position: relative;
    margin: 1rem 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;
    }
    .erweima {
      position: absolute;
      top: -130px;
      background: #fff;
      padding: 0.4rem 0.4rem 0 0.4rem;
      border-radius: 0.1rem;
      border: 1px solid #ccc;
    }
  .detail_share span {
      color: #333;
      margin-right: 1rem;
    }
    .detail_share i {
      padding: 0.6rem 0.63rem;
      border-radius: 50%;
      font-size: 1.4rem;
      margin: 0 1rem;
      cursor: pointer;
      transition: all 0.6s;
    }
    i.icon-weibo {
      border: 1px solid rgb(255, 153, 0);
      color: rgb(255, 153, 0);
    }
    i.icon-weibo:hover {
      background: rgb(255, 153, 0);
      color: white;
    }
    i.icon-gongzhonghao {
      border: 1px solid lightgreen;
      color: lightgreen;
    }
    i.icon-gongzhonghao:hover {
      background: lightgreen;
      color: white;
    }
    i.icon-qq {
      border: 1px solid skyblue;
      color: skyblue;
    }
    i.icon-qq:hover {
      background: skyblue;
      color: white;
    }
    i.icon-qzone {
      border: 1px solid yellow;
      color: yellow;
    }
    i.icon-qzone:hover {
      background: yellow;
      color: white;
    }
    .reward{
      text-align: center;
      font-size: .9rem;
      color: gold;
      cursor: pointer;
      margin-bottom: 2rem;
    }
</style>