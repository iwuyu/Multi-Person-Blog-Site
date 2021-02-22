<template>
  <div id="question">
    <question-list class="q_list"></question-list>
  </div>
</template>

<script>
import questionList from './childCopnps/questionList'
export default {
  name:'question',
  components:{
    questionList
  }

}
</script>

<style lang="scss" scoped>
  #question {
    padding-top: 80px;
    width: 1200px;
    height: 100vh;
    margin: 0 auto;
  }
</style>