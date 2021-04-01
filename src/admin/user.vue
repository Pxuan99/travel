<!-- 用户管理：查看用户信息 删除用户 -->
<template>
  <div id="user">
    <div>
      <el-row>
        <el-col :span="22">
          <el-table
            :data="tableData"
            @selection-change="selectionChange"
            style="width: 100%"
          >
            <el-table-column prop="id" label="编号" width="180">
            </el-table-column>
            <el-table-column prop="name" label="用户名" width="180">
            </el-table-column>
            <el-table-column prop="email" label="邮箱"> </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="del(scope.row)" type="danger" size="small" v-if="scope.row.id!=1"
                  >删除用户</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <div class="paginationClass">
      <el-pagination
        align="center"
        @current-change="currentChange"
        :current-page="page.current"
        :page-size="page.size"
        layout="total, prev, pager, next, jumper"
        :total="page.total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script src="https://cdn.staticfile.org/vue-resource/1.5.1/vue-resource.min.js"></script>
<script>
export default {
  data() {
    return {
      tableData: [
        //用户信息数据
        
      ],
      page: {
        current: 1, //当前页码
        size: 7, //每页数据条数
        total: 0, //总数据条数
      },
    };
  },
  created() {
    this.getData();//获取数据
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    
    getData() {
      let that = this;
      let url =
        "http://127.0.0.1:8088/user?current=" +
        that.page.current +
        "&size=" +
        that.page.size;
      that.$axios.get(url).then((res) => {
        // that.$qs.parse(res.body);
        // console.log(res);
        // console.log(res.data.data.records);
        if (res.data.code == 0) {
          that.tableData = res.data.data.records;
          that.page.current = res.data.data.current;
          that.page.size = res.data.data.size;
          that.page.total = res.data.data.total;
        }
        // console.log(that.tableData.length);
      });
    },
    currentChange(current) {
      this.page.current = current;
      this.getData();
    },
    selectionChange(selection) {
      console.log(selection);
    },
    //删除用户信息
    del(row) {
      let that = this;
      let url = "http://localhost:8088/user?idList=" + row.id;
      this.$confirm("确定将" + row.name + "删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        that.$axios.delete(url).then((res) => {
          // console.log(res.data);
          if (res.data.code == 0) {
            //重新获取数据
            that.getData();
          }
        });
      });
    },
  },
};
</script>
<style scoped>
#user {
  width: 600px;
  display: inline;
}
</style>