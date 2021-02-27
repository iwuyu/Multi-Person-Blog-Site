<template>
  <div id="add-article">
    <p class="breadbcrumb">文章管理 / {{edit?"修改文章":"文章发布"}}</p>
    <br>
    <el-form :model="formAdd" status-icon :rules="rules" ref="formAdd" class="demo-formAdd">
      <el-form-item prop="title">
        <label><i class="el-icon-paperclip">&nbsp;文章标题</i></label>
        <el-input type="text" v-focus v-model="formAdd.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="category">
        <label><i class="el-icon-paperclip">&nbsp;文章分类</i></label><br/>
        <el-select v-model="formAdd.category" @change="currentCategory" placeholder="请选择分类">
          <el-option
            v-for="item in categoryArray"
            :key="item.category_id"
            :label="item.category_name"
            :value="item.category_id">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item prop="label">
        <label><i class="el-icon-paperclip">&nbsp;文章标签</i></label><br/>
        <el-select v-model="formAdd.label"  placeholder="请选择标签">
          <el-option
            v-for="item in labelArray"
            :key="item.label_id"
            :label="item.label_name"
            :value="item.label_id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <label><i class="el-icon-paperclip">&nbsp;封面图</i></label>
        <el-upload
          class="avatar-uploader"
          ref="avatar"
          name="images"
          :action="uploadImage"
          :show-file-list="false"
          :auto-upload="false"
          :with-credentials="true"
          :on-change="avatarSaveToUrl"
          :on-success="avatarSuccess">
          <img v-if="localImageUrl.avatorImageUrl" :src="localImageUrl.avatorImageUrl" class="avatar">
          <i v-else class="el-icon-picture avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item prop="describe">
        <label><i class="el-icon-paperclip">&nbsp;文章简介</i></label><br/>
        <el-input
          class="textarea"
          type="textarea"
          :rows="4"
          placeholder="请输入文章简介"
          v-model="formAdd.describe"
          :show-word-limit="true"
          :maxlength="200"
        ></el-input>
      </el-form-item>
      <!-- <upload-article-image/> -->
      <el-form-item prop="content">
        <label><i class="el-icon-paperclip">&nbsp;文章内容</i></label>
        <div class="editor">
          <mavon-editor style="height: 100%" @imgAdd="imgAdd" @imgDel="imgDel" :toolbars="toolbars" v-model="formAdd.content" ref="md"></mavon-editor>
        </div>
      </el-form-item> 
      <el-form-item>
        <el-button type="danger" class="submit" @click="submitForm('formAdd')">{{edit?"确认修改":"确认添加"}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { articlePublish, articleUpdata, getCategory, getLabel,articleImages, deleteImage } from "network/article"
import upload from "network/upload" 
// import uploadArticleImage from './uploadArticleImage';
export default {
  name:"articleAdd",
  components: {
    // uploadArticleImage
  },
  props: {
    list: {}
  },
  data() {
    /* 验证文章名 */
    let validateTitle = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入文章标题'));
      } else {
        callback();
      }
    };
    /* 验证文章分类 */
    let validateCategory = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入文章分类'));
      } else {
        callback();
      }
    };
    /* 验证文章标签 */
    let validateLabel = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择文章标签'));
      } else {
        callback();
      }
    };
    /* 验证文章简介 */
    let validateDescribe = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入文章简介'));
      } else {
        callback();
      }
    };
    /* 验证文章内容 */
    let validateContent = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入文章内容'));
      } else {
        callback();
      }
    };
    return {
      formAdd:{
        title: '', // 文章标题
        image: '', // 文章封面图
        describe: '', // 文章简介
        content: '',  // 文章内容
        label: '',  // 文章标签
        category: '', // 文章分类
        token: localStorage.username //作者
      },
      baseurl:upload.UPLOAD.BASEURL, // baseurl
      uploadImage:upload.UPLOAD.BASEURL + upload.UPLOAD.UPLOADIMAGE,  // 封面图地址
      localImageUrl:{avatorImageUrl:""}, // 本地暂存图片
      categoryArray:[], // 文章分类
      labelArray:[], // 文章分类对应标签
      stagingLabel:{}, //暂存标签
      dialogVisible: false,
      editArticleId: null, // 修改的文章id
      edit:false, // 是否为修改状态
      rules: {
        title: [
          { validator: validateTitle, trigger: 'blur' }
        ],
        category: [
          { validator: validateCategory, trigger: 'blur' }
        ],
        label: [
          { validator: validateLabel, trigger: 'blur' }
        ],
        describe: [
          { validator: validateDescribe, trigger: 'blur' }
        ],
        content: [
          { validator: validateContent, trigger: 'blur' }
        ],
      },
      toolbars: {
        bold: true, // 粗体
        italic: false, // 斜体
        header: true, // 标题
        underline: false, // 下划线
        strikethrough: false, // 中划线
        mark: false, // 标记
        superscript: false, // 上角标
        subscript: false, // 下角标
        quote: true, // 引用
        ol: false, // 有序列表
        ul: false, // 无序列表
        link: true, // 链接
        imagelink: true, // 图片链接
        code: true, // code
        table: false, // 表格
        fullscreen: true, // 全屏编辑
        readmodel: true, // 沉浸式阅读
        htmlcode: true, // 展示html源码
        help: true, // 帮助
        /* 1.3.5 */
        undo: true, // 上一步
        redo: true, // 下一步
        trash: true, // 清空
        save: true, // 保存（触发events中的save事件）
        /* 1.4.2 */
        navigation: true, // 导航目录
        /* 2.1.8 */
        alignleft: false, // 左对齐
        aligncenter: false, // 居中
        alignright: false, // 右对齐
        /* 2.2.1 */
        subfield: true, // 单双栏模式
        preview: true, // 预览
      },
    }
  },
  methods:{
    /* 图片保存本地 */
    imageSaveToLocal(event,Path){  
      let path = this.localImageUrl;
      if(window.createObjectURL != undefined){
        path[Path] = window.createObjectURL(event.raw);
      }else if(window.URL != undefined){
        path[Path] = window.URL.createObjectURL(event.raw);
      }else if(window.webkitURL != undefined){
        path[Path] = window.webkitURL.createObjectURL(event.raw);
      }
    },
    /* 保存数据流 */
    imageSaveToSend(file,Path){
      let path = this.formAdd;
      const isJPG = file.type === 'image/jpeg'||'image/png';
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG或png 格式!');
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!');
      }
      if(isJPG && isLt2M) {
        Path == "detailsFigure"?path[Path].push(file):path[Path] = file;
      }
      return;
    },
    /* 封面图片保存本地 */
    avatarSaveToUrl(event) {
      let even = event;
      this.imageSaveToLocal(even,"avatorImageUrl");
    },
    /* 封面图上传成功 保存图片路径 */
    avatarSuccess(res) {
      console.log('上传封面图',res)
      if (res.statusCode == 200) {
        this.formAdd.image = res.data;
      } else {
        this.$message({
          message: "封面图上传失败",
          type: 'error'
        });
      }
    },

    // 根据当前分类获取对应标签
    currentCategory() {
      // 重选分类，将label选项框清空
      this.formAdd.label = "";
      // 遍历对象 获取对象中每个数组的值this.obj[key]
      Object.keys(this.stagingLabel).forEach((key) => {
        // 如果所选分类的value与所遍历的值的category_id相匹配
        if (this.formAdd.category == this.stagingLabel[key][0].category_id) {
          // 把该值赋值给labels
          this.labelArray = this.stagingLabel[key];
        }
      });
    },

    // 文章内容图上传
    imgAdd(pos, file) {
      let formdata = new FormData()
      formdata.append('articleImages', file)
      articleImages(formdata).then(res => {
          if (res.data.statusCode === 200) {
            res.data.data = this.baseurl + res.data.data
            this.$refs.md.$img2Url(pos, res.data.data);
          } else {
            this.$message({
              message: res.data.message,
              type: 'error',
              offset:'80'
            });
          }
      })
    },

    // 文章内容图删除
    imgDel(pos) {
      let path = pos[0]
      path = path.substring(this.baseurl.length)
      let data = {}
      data.filePath = path
      deleteImage(data).then(res => {
        if(res.data.statusCode === 200) {
          this.$message({
            message: res.data.message,
            type: 'success'
          });
        }else {
          this.$message({
            message: res.data.message,
            type: 'error'
          });
        }
      })
    },

    /* 确认提交 */
    submitForm(formAdd) {
      this.$refs[formAdd].validate((valid) => {
        if (valid) {
          this.submitTxt = "上传中";
          this.$refs.avatar.submit();
          let timer = "";
          clearTimeout(timer);
          timer = setTimeout(() => {
          if(this.formAdd.image){
            if(!this.edit) {
              // this.formAdd.label = this.formAdd.label.join()
              // 发布文章
              console.log(this.formAdd);
              articlePublish(this.formAdd).then(res => {
                let data = res.data;
                if (data.statusCode == 200) {
                  this.$refs[formAdd].resetFields(); // 上传成功，清空表单
                  this.localImageUrl.avatorImageUrl = "";
                  this.submitTxt = "确认添加";
                  // 成功
                  this.$message({
                    message: data.message,
                    type: 'success',
                    offset:'80'
                  });
                }else {
                  this.submitTxt = "再次上传";
                  this.$message({
                    message: data.message,
                    type: 'error'
                  });
                }
              }).catch(err => {
                console.log('catch',err);
                this.$message({
                  type: 'error',
                  message: "出错了，请稍后重试！"
                })
              })
            }else {
              // 修改文章
              this.formAdd.articleId = this.editArticleId
              articleUpdata(this.formAdd).then(res => {
                if (res.data.statusCode == 200) {
                  // 成功
                  this.$message({
                    message: res.data.message,
                    type: 'success',
                    offset:'80'
                  });
                } else {
                  this.$message({
                    message: res.data.message,
                    type: 'error',
                    offset:'80'
                  });
                }
              }).catch(err => {})
            }
          }else{
            this.$message({
              type: 'error',
              message: "图片上传失败！"
            })
          }
          },2000)
        } else {
          this.$message.error('错了哦，请验证信息是否完整正确!');
          return false;
        }
      });
    },

    // 修改文章时将原文章数据绑定到标签中显示出来
    async getTicket () {
      let {title,category_id,label_id,image,describes,content,id} = this.list;
      image = image.split(this.baseurl)[1];
      this.formAdd.title = title;
      this.formAdd.category = category_id;
      this.formAdd.label = label_id;
      this.formAdd.image = image;
      this.formAdd.describe = describes;
      this.formAdd.content = content;
      this.editArticleId = id;
      this.localImageUrl.avatorImageUrl = this.baseurl+this.formAdd.image;
    }
  },
  // 修改文章时监听分类的变化，匹配相应的标签内容
  watch: {
    list () {
      this.getTicket().then(res => {
        this.edit = true;
        return this.currentCategory();
      }).then(() => {
        this.formAdd.label = this.list.label_id;
      })
    }
  },
  directives: {
    focus: {
      // 指令的定义
      inserted: function(el) {
        el.children[0].focus();
        // el.querySelector("input").focus();
      }
    }
  },
  mounted() {
    // 获取分类
    getCategory().then((res) => {
      if (res.data.statusCode === 200) {
        this.categoryArray = res.data.data;
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
      if (res.data.statusCode === 200) {
        res.data.data.forEach((item, index) => {
          let categoryName = item.category_name;
          if (!this.stagingLabel.hasOwnProperty(categoryName)) {
            // stagingLabel中不包括该属性名
            this.stagingLabel[categoryName] = []; // 将该字段作为stagingLabel的key
            this.stagingLabel[categoryName].push(item);
          } else {
            this.stagingLabel[categoryName].push(item);
          }
        });
        
        // console.log(this.stagingLabel)
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

<style lang="scss" scoped>
  #add-article {
    margin: 0 20px;
    .breadbcrumb {
      font-size: 14px;
      padding: 10px;
      color: #666;
      background-color: #fff;
      margin: 10px 0;
    }
    .demo-formAdd{
      margin: auto;
      .el-input,
      .el-select,
      .textarea {
        width: 50%;
        display: block;
      }
      @media screen and (max-width:600px) {
        .el-input,
        .el-select,
        .textarea {
          width: 100%;
        }
      }
      .editor {
        margin: auto;
        width: 100%;
        height: 600px;
      }
    }
    
    .avatar-uploader {
      border: 1px dashed #d9d9d9 ;
      border-radius: 6px;
      width: 300px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 300px;
      height: 178px;
      line-height: 178px;
      text-align: center;
      &:hover{
        color: #409EFF;
      }
    }
    .avatar {
      width: 300px;
      height: 178px;
      display: block;
    }

    #articleContent {
      position: relative;
      width: 100%;
      height: 50%;
    }

    .submit {
      margin-top: 2rem;
      float: right;
      width: 178px;
    }
    @media screen and (max-width:600px) {
      padding: 1rem;
      // .avatar-uploader{
      //   width: 100%;
      // }
      // .avatar-uploader-icon{
      //   width: 100%;
      // }
      // .avatar{
      //   width: 100%;
      // }
      .submit{
        margin-top: 1rem;
        width: 100%;
      }
    }
  }
  
</style>