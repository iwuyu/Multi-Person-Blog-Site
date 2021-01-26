<template>
  <div class="dashboard">
    <!-- <h2>仪表盘</h2> -->
    <div class="top-panel">
      <div class="cake user-cake"></div>
      <div class="cake article-cake"></div>
      <div class="cake question-cake"></div>
    </div>
    <h4>近一周数据折线图</h4>
    <div class="center-panel"></div>
  </div>
</template>

<script>
import {cake1, cake2, cake3, line, columnar, columnar2} from 'utils/echars'
export default {
  name: 'dashboard',
  mounted() {
    cake1();
    cake2();
    cake3();
    line();
    // columnar();
    // columnar2();
  }
}
</script>

<style lang="scss" scoped>
  .dashboard {
    margin-bottom: -20px;
    h2 {
      margin-bottom: 20px;
    }
    .top-panel {
      height: 190px;
      display: flex;

      .cake {
        flex: 1;
      }
    }
    h4 {
      margin-top: 50px;
      margin-bottom: 20px;
      text-align: center;
    }
    .center-panel {
      height: 400px;
    }

    .bottom-panel {
      height: 190px;
      // background-color: skyblue;
    }
  }

</style>