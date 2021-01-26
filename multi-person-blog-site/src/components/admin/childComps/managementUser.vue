<template>
  <div class="management-user">
    <h3>用户管理</h3>
    <div class="list">
      <el-table :data="tableData" style="width: 80%">
        <el-table-column label="用户名" width="120">
          <template slot-scope="scope">
            <span style="color:#67C23A; padding-left:10px">{{ scope.row.username }}</span>
          </template>
        </el-table-column>
        <el-table-column label="头像" width="120" >
          <template slot-scope="scope">
            <div class="article_img">
              <img :src="scope.row.avatar" alt="">
            </div>
          </template>
        </el-table-column>
        <el-table-column label="邮箱" width="200">
          <template slot-scope="scope">
            <span style="margin-left: 0px">{{ scope.row.email }}</span>
          </template>
        </el-table-column>
        <el-table-column label="注册时间" width="200">
          <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 0px"> {{ scope.row.register_time }}</span>
          </template>
        </el-table-column>
        <el-table-column label="文章数量" width="120">
          <template slot-scope="scope">
            <span style="margin-left: 0px"> {{ scope.row.article_count }}</span>
          </template>
        </el-table-column>
        <el-table-column label="问答数量" width="120">
          <template slot-scope="scope">
            <span style="margin-left: 0px"> {{ scope.row.question_count }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-switch 
              v-model="scope.row.ban"
              @change='changeStatus(scope.row.id)'
              active-color="#13ce66"
              inactive-color="#ff4949"
              active-text="正常"
              inactive-text="禁言">
            </el-switch>
          </template>
        </el-table-column>
        <!-- <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <page :total="total" @pageSize="getPageSize" @currentPage="getCurrentPage"/>
  </div>
</template>

<script>
import { getUsers,changeStatus } from 'network/user'
import uploadImage from "network/upload"
import Page from 'components/content/page/Page'
export default {
  name: 'managementUser',
  components:{Page},
  data() {
    return {
      param:{
        currentPage:1, // 当前页码
        pageSize:6, // 每页数据量
      },
      tableData: [],
      total:0
    }
  },
  methods: {
    // 初始化获取用户
    getUsers() {
      getUsers(this.param).then(res => {
        if(res.data.statusCode == 200) {
          let data = res.data.data
          this.total = data.length
          data.forEach((item,index) => {
            item.avatar = uploadImage.UPLOAD.BASEURL + item.avatar
            item.ban = item.ban == 0 ? true : false
          });
          this.tableData = res.data.data
        } else {
          this.$message({
            type:'error',
            message: res.data.message
          })
        }
      })
    },
    /* 获取该页数量的数据 */
    getPageSize(val){
      this.param.pageSize = val; // 获取每页请求数量
      this.getUsers(); // 获取商品数据
    },
    
    /* 获取该页的数据 */
    getCurrentPage(val) {
      this.param.currentPage = val; // 获取当前页
      this.getUsers(); // 获取对应条件的商品
    },
    // 禁言状态改变
    changeStatus(userId) {
      let data = {};
      data.userId = userId;
      changeStatus(data).then(res => {
        if(res.data.statusCode == 200) {
          this.getUsers()
          this.$message({
            type:'success',
            message: res.data.message
          })
        }else {
          this.$message({
            type:'error',
            message: res.data.message
          })
        }
      })
    },
    // 删除用户
    deleteUser() {

    }
  },
  created() {
    this.getUsers()
  }

}
</script>

<style lang="scss" scoped>
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
    color: #F56C6C;
  }
  .review {
    color:#67C23A;
  }
</style>