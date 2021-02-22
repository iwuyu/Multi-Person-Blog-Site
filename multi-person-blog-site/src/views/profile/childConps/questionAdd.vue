<template>
  <div id="question-add">
    <h1 style="margin:20px">问答发布</h1>
    <el-form :model="formAdd" status-icon :rules="rules" ref="formAdd" class="demo-formAdd">
      <el-form-item prop="title">
        <label><i class="el-icon-paperclip">&nbsp;问答标题</i></label>
        <el-input type="text" v-model="formAdd.title" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item prop="label">
        <label><i class="el-icon-paperclip">&nbsp;问答标签</i></label><br/>
        <el-select 
          v-model="formAdd.label"
          filterable
          allow-create
          default-first-option 
          placeholder="请选择标签">
          <el-option
            v-for="item in labelArray"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      
      <el-form-item prop="describe">
        <label><i class="el-icon-paperclip">&nbsp;问答描述</i></label><br/>
        <el-input
          class="textarea"
          type="textarea"
          :rows="4"
          placeholder="请输入问答描述"
          v-model="formAdd.describe"
          :show-word-limit="true"
          :maxlength="200"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" class="submit" @click="submitForm('formAdd')">{{edit?"确认修改":"确认添加"}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getQuestionLabel,questionPublish } from 'network/question'
export default {
  name: 'questionAdd',
  data() {
    /* 验证问答标题 */
    let validateTitle = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入问答标题'));
      } else {
        callback();
      }
    };
    /* 验证问答标签 */
    let validateLabel = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请选择问答标签'));
      } else {
        callback();
      }
    };
    /* 验证问答描述 */
    let validateDescribe = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入问题描述'));
      } else {
        callback();
      }
    };
    return {
      formAdd:{
        title: '', // 问答标题
        describe: '', // 文章描述
        label: '',  // 文章标签
        token: localStorage.username //作者
      },
      labelArray:[], // 文章分类对应标签
      dialogVisible: false,
      editArticleId: null, // 修改的文章id
      edit:false, // 是否为修改状态
      rules: {
        title: [
          { validator: validateTitle, trigger: 'blur' }
        ],
        label: [
          { validator: validateLabel, trigger: 'blur' }
        ],
        describe: [
          { validator: validateDescribe, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    /* 确认提交 */
    submitForm(formAdd) {
      this.$refs[formAdd].validate((valid) => {
        if (valid) {
          this.submitTxt = "上传中";
          questionPublish(this.formAdd).then(res => {
            this.$refs[formAdd].resetFields(); // 上传成功，清空表单
            if(res.data.statusCode === 200) {
              this.submitTxt = "点击上传";
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
        } else {
          this.$message.error('错了哦，请验证信息是否完整正确!');
          return false;
        }
      });
    },
  },
  created() {
    getQuestionLabel().then(res => {
      if(res.data.statusCode === 200) {
        this.labelArray = res.data.data;
      }else {
        this.$message({
          message: res.data.message,
          type: 'error'
        });
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  .demo-formAdd {
    width: 900px;
    margin: 0 auto;
  }

</style>