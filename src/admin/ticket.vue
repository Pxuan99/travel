<!-- 门票管理：查看门票信息、取消门票 -->
<template>
  <div id="user">
    <div>
      <el-row>
        <el-col :span="22">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="name" label="姓名" width="180">
            </el-table-column>
            <el-table-column prop="spotAddress" label="出游地址">
            </el-table-column>
            <el-table-column prop="ticketNum" label="门票数"> </el-table-column>
            <el-table-column prop="totalPrice" label="总价"> </el-table-column>
            <el-table-column prop="orderDate" label="出游日期" width="180">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="del(scope.row)" type="danger" size="small"
                  >取消订单</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      // currentPage: 1, //当前页码
      // pageSize: 10, //每页数据条数
      // total: 50, //总数据条数
    };
  },

  mounted() {
    this.getData();
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    getData() {
      let that = this;
      let url = "http://127.0.0.1:8088/ticket/all";
      that.$axios.get(url).then((res) => {
        // console.log(res.data.data);
        that.tableData = res.data.data;
        // console.log(that.tableData)
      });
    },
    del(row) {
      let yy = new Date().getFullYear();
      let mm = new Date().getMonth() + 1;
      let dd = new Date().getDate();
      let _this = this;
      _this.gettime = yy + "-" + mm + "-" + dd;
      var now = new Date(_this.gettime.replace("-", "/"));
      let order = row.orderDate;
      var ordertime = new Date(order.replace("-", "/"));
      if (now - ordertime > 0) {
        this.$message({
          type: "error",
          message: "已过订单有效期，无法取消订单!",
        });
      } else {
        let that = this;
        let url = "http://localhost:8088/userOrder?idList=" + row.id;
        this.$confirm("确定将订单删除吗?", "提示", {
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
      }
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