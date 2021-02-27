<template>
  <div id="question">
    <div class="question-label">
      <div :class="{'active':moreIcon,'labels':true}">
        <el-button class="label-btn" size="medium" @click="allClick">全部</el-button>
        <el-button class="label-btn" size="medium" v-for="item in questionLabels" :key="item.id" @click="labelClick(item.id)">{{item.name}}</el-button>
      </div>
      <div>
        <el-button class="more" @click="moreClick" size="medium" :icon="moreIcon ? 'el-icon-caret-bottom' : 'el-icon-caret-top'"></el-button>
      </div>
    </div>
    <question-list class="q_list" :label="label"></question-list>
  </div>
</template>

<script>
import questionList from './childCopnps/questionList'
import { getQuestionLabel } from 'network/question'
export default {
  name:'question',
  components:{
    questionList
  },
  data() {
    return {
      questionLabels:[],
      moreIcon:true,
      label: {
        labelId:''
      }
    }
  },
  methods: {
    // 查看更多
    moreClick() {
      this.moreIcon = !this.moreIcon
    },

    // 查询所有
    allClick () {
      this.label.labelId = ''
    },

    // 查询对应标签的问答
    labelClick(id) {
      this.label.labelId = id
    },

    // 获取问答标签
    getQuestionLabels() {
      getQuestionLabel().then(res => {
        if(res.data.statusCode === 200) {
          res.data.data.forEach((item,i) => {
            item.page = parseInt(i / 10 + 1)
          });
          this.questionLabels = res.data.data;
          console.log(this.questionLabels);
        }else {
          this.$message({
            type: 'error',
            message: res.data.message
          })
        }
      })
    }
  },
  created() {
    this.getQuestionLabels()
  }
}
</script>

<style lang="scss" scoped>
  #question {
    padding-top: 80px;
    width: 1200px;
    min-height: 100vh;
    margin: 0 auto;
    .question-label {
      // margin-bottom: 20px;
      display: flex;
      .labels {
        flex: 1;
        overflow: hidden;
        .label-btn {
          margin-bottom: 20px;
        }
      }
    }
  }
  .active {
    height: 55px;
  }
</style>