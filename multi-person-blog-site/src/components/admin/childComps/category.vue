<template>
  <div class="category">
    <h2>分类管理</h2>
    <div class="change-status">
      <el-button type="primary" @click="isAdd = false">分类管理</el-button>
      <el-button type="success" @click="isAdd = true">分类添加</el-button>
    </div>
    <div class="list" v-show="!isAdd">
      <el-table :data="tableData" style="width: 740px; margin:0 auto;">
        <el-table-column label="分类ID" width="120">
          <template slot-scope="scope">
            <span style="color:#67C23A; padding-left:10px">{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column label="分类名" width="180" >
          <template slot-scope="scope">
            <div class="article_img">
              <img :src="scope.row.avatar" alt="">
            </div>
          </template>
        </el-table-column>
        <el-table-column label="标签数量" width="120">
          <template slot-scope="scope">
            <span style="margin-left: 0px"> {{ scope.row.question_count }}</span>
          </template>
        </el-table-column>
        <el-table-column label="文章数量" width="120">
          <template slot-scope="scope">
            <span style="margin-left: 0px"> {{ scope.row.article_count }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="add-item" v-show="isAdd">
      <el-input
        placeholder="请输入内容"
        v-model="input"
        clearable>
      </el-input>
      <el-button type="primary">确认添加</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'category',
  data() {
    return{
      isAdd: false
    }
  }
}
</script>

<style lang="scss" scoped>
  .change-status {
    padding: 30px 0;
    text-align: center;
    border-bottom: 1px solid #ccc;
  }
  .list,.add-item{
    margin-top: 20px;
  }
</style>