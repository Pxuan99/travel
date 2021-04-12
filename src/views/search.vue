<template>
  <div>
    <!-- 头部 -->
    <div>
      <top></top>
    </div>
    <!-- 搜索框 -->
    <div>
      <el-row>
        <el-col :offset="9" :span="7">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="景点查询">
              <el-input
                v-model="formInline.search"
                placeholder="输入景点地址搜索"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <div>
      <el-row>
        <el-col :offset="3" :span="18">
          <el-table :data="tableData" style="width: 100%">
            <!-- 景点标题 -->
            <el-table-column prop="spotName" label="景点" width="280">
            </el-table-column>
            <el-table-column prop="spotBody" label="景点特色" width="280">
            </el-table-column>
            <el-table-column prop="spotAddress" label="景点地址">
            </el-table-column>
            <el-table-column prop="spotPic" label="图片" width="180">
              <!--插入图片链接的代码-->
              <template slot-scope="scope">
                <img
                  :src="scope.row.spotPic"
                  alt=""
                  style="width: 100px; height: 80px"
                />
              </template>
            </el-table-column>
            <el-table-column fixed="right" label="" width="100">
              <template slot-scope="scope">
                <el-button
                  @click="handleClick(scope.row)"
                  type="text"
                  size="small"
                  >点击查看</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </div>
    <!-- <div class="paginationClass">
      <el-pagination
        align="center"
        @current-change="currentChange"
        :current-page="page.current"
        :page-size="page.size"
        layout="total, prev, pager, next, jumper"
        :total="page.total"
      >
      </el-pagination>
    </div> -->
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
      formInline: {
        search: "",
      },
      spotAddress: "",
      tableData: [],
      page: {
        current: 1, //当前页码
        size: 7, //每页数据条数
        total: 0, //总数据条数
      },
    };
  },
  created() {
    this.getParams();

    this.search();
    console.log(this.tableData);
    // this.getData();
  },
  methods: {
    handleClick(row) {
      this.$router.push({ path: "/detailSearch", query: { spotId: row.id } });
    },
    getParams() {
      // // 取到路由带过来的参数
      let routerParams = this.$route.query.spotAddress;
      // // 将数据放在当前组件的数据内
      this.formInline.search = routerParams;
      console.log(this.formInline.search);
    },
    search() {
      let that = this;
      let url =
        "http://127.0.0.1:8088/spot/search?spotAddress=" +
        that.formInline.search +
        "&noParm=1";
      that.$axios.get(url).then((res) => {
        that.tableData = res.data.data;
      });
    },
    getData() {
      let that = this;
      let url =
        "http://127.0.0.1:8088/spot?current=" +
        that.page.current +
        "&size=" +
        that.page.size;
      that.$axios.get(url).then((res) => {
        // console.log(res.data.data.records);
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
  },
};
</script>
<style scoped>
</style>