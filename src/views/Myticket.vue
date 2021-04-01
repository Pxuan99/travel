<template>
  <!-- 我的门票 -->
  <div>
    <!-- 头部 -->
    <div>
      <top></top>
    </div>
    <div>
      <h1 style="text-align: center">我的门票</h1>
    </div>
    <div>
      <el-row>
        <el-col :offset="3" :span="18">
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
import top from "../views/top";

export default {
  components: {
    top,
  },
  data() {
    return {
      tableData: [],
      username:''
    };
  },
    mounted() {
    this.username = localStorage.getItem("username");
    this.getData();

  },
  methods: {
    getData() {
      let that = this;
      let url = "http://127.0.0.1:8088/ticket/one?name="+that.username+"&noParm=1";
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
h1 {
  color: rgb(240, 90, 90);
}
</style>