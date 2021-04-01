<!-- 景点管理：查删景点信息 -->
<template>
  <div id="user">
    <div>
      <el-row>
        <el-col :span="22">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="spotName" label="景点标题" width="180">
            </el-table-column>
            <el-table-column prop="spotBody" label="景点描述">
            </el-table-column>
            <el-table-column prop="spotAddress" label="景点地址">
            </el-table-column>
            <el-table-column prop="isticket" label="是否需要门票">
            </el-table-column>
            <el-table-column fixed="right" label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="del(scope.row)" type="danger" size="small" v-if="scope.row.id!=1&&scope.row.id!=2&&scope.row.id!=3&&scope.row.id!=4"
                  >删除景点</el-button
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

<script>
export default {
  data() {
    return {
      tableData: [],

      page: {
        current: 1, //当前页码
        size: 7, //每页数据条数
        total: 0, //总数据条数
      },
    };
  },
  created() {
    this.getData(); //获取数据
    // this.isticket=1?'是':"否";
    // this.ticket();
  },
  methods: {
    handleClick(row) {
      console.log(row);
    },
    getData() {
      let that = this;
      let url =
        "http://127.0.0.1:8088/spot?current=" +
        that.page.current +
        "&size=" +
        that.page.size;
      that.$axios.get(url).then((res) => {
        console.log(res.data.data.records);
        if (res.data.code == 0) {
          that.tableData = res.data.data.records;
          that.page.current = res.data.data.current;
          that.page.size = res.data.data.size;
          that.page.total = res.data.data.total;
        }
      });
    },
    currentChange(current) {
      this.page.current = current;
      this.getData();
    },
    selectionChange(selection) {
      console.log(selection);
    },
    del(row) {
      let that = this;
      let url = "http://localhost:8088/spot?idList=" + row.id;
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