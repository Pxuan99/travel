<template>
<!-- 详情页 -->
  <div>
    <div>
      <top></top>
    </div>
    <div>
      <el-container>
        <el-container>
          <!-- 左边 -->
          <el-aside>
            <img :src="spotPic" class="image" height="250px" />
          </el-aside>
          <!-- 右边上中下 -->
          <el-container>
            <el-header
              ><h2>{{ spotName }}</h2></el-header
            >
            <el-main>{{ spotBody }}</el-main>
            <el-footer v-if="ticketPrice != null">
              门票价格：{{ ticketPrice }}
              <el-button type="danger" round @click="pre()">购买门票</el-button>
            </el-footer>
            <el-footer v-if="ticketPrice == null"> 免门票 </el-footer>
          </el-container>
        </el-container>
      </el-container>
      <el-dialog title="购票详情" :visible.sync="dialog">
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item
            label="购买门票数量（张）"
            :label-width="formLabelWidth"
          >
            <el-input-number
              v-model="form.num"
              @change="handleChange"
              :min="1"
              :max="10"
              label="描述文字"
            ></el-input-number>
          </el-form-item>
          <el-form-item
            label="出行日期"
            :label-width="formLabelWidth"
            prop="date"
          >
            <el-date-picker
              v-model="form.date"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              :picker-options="pickerOptions"
            >
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="buy('form')">确认购买</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 发表评论区 -->
    <div id="comment">
      <el-row>
        <el-col :span="2" :offset="4"
          ><div class="block">
            <el-avatar :size="55" :src="circleUrl"></el-avatar></div
        ></el-col>
        <el-col :span="9">
          <div>
            <el-input
              type="textarea"
              :autosize="{ minRows: 2, maxRows: 4 }"
              placeholder="点击发表评价"
              v-model="textarea"
              show-word-limit
              maxlength="233"
            >
            </el-input>
          </div>
          <div>
            <el-button
              type="warning"
              round
              size="mini"
              id="commentButton"
              @click="comment1()"
              >发表评价</el-button
            >
          </div>
        </el-col>
      </el-row>
      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 评论栏 -->
      <div>
        <el-row>
          <el-col :offset="4" :span="13" v-for="(user, i) in data" :key="i">
            <div>{{ user.name }}：</div>
            <span>{{ user.comment }}</span>
            <el-divider></el-divider>
          </el-col>
        </el-row>
      </div>
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
      ticketPrice: "",
      spotName: "",
      spotBody: "",
      spotId: "",
      spotPic: "",
      username: "",
      userId: "",
      comment: "",
      currentTime: "",
      dialog: false,
      num: 1,
      value: "",
      data: [],
      pic:
        "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
      textarea: "",
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      formLabelWidth: "140px",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < new Date().getTime() - 86400000;
        },
      },
      form: {
        num: "",
        date: "",
      },
      rules: {
        date: [{ required: true, message: "请选择日期", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getParams();
    this.getData();
    this.getCom();
    this.getTime();
    // console.log(this.getTime());
    this.username = localStorage.getItem("username");
    this.userId = localStorage.getItem("id"); //获取当前用户的id
    // this.userId=this.getData();
  },
  mounted() {},
  methods: {
    getParams() {
      // // 取到路由带过来的参数
      let routerParams = this.$route.query.spotId;
      // // 将数据放在当前组件的数据内
      this.spotId = routerParams;
      // console.log(this.spotId);
    },
    getData() {
      let that = this;
      let url = "http://127.0.0.1:8088/spot?id=" + that.spotId;
      that.$axios.get(url).then((res) => {
        // that.$qs.parse(res.body);
        // console.log(res);
        that.spotBody = res.data.data.records[0].spotBody;
        that.spotName = res.data.data.records[0].spotName;
        // that.spotId = res.data.data.records[0].id;
        that.ticketPrice = res.data.data.records[0].ticketPrice;
        that.spotPic = res.data.data.records[0].spotPic;
        // console.log(that.spotPic);
      });
    },
    getCom() {
      //获取评论
      let that = this;
      let url =
        "http://127.0.0.1:8088/comment/com?id=" + that.spotId + "&noParm=1";
      that.$axios.get(url).then((res) => {
        // console.log(res);
        let str = JSON.stringify(res.data.data);
        that.data = JSON.parse(str);
      });
    },
    handleChange(value) {
      console.log(value);
    },
    buy(formName) {
      this.$refs[formName].validate((valid) => {
        //先验证是否输入了数据
        if (valid) {
          let that = this;
          this.$axios
            .post("/api/userOrder", {
              userId: that.userId,
              spotId: that.spotId,
              ticketNum: that.form.num,
              orderDate: that.form.date,
              orderTotalprice: that.ticketPrice * that.form.num,
              orderTime: that.getTime(),
            })
            .then(() => {
              this.dialog = false;
              this.$message({
                type: "success",
                message: "购买成功!",
              });
            });
        } else {
          //如果没输入数据
          this.$message({
            type: "error",
            message: "日期不能为空，请重新选择!",
          });
        }
      });
    },

    pre() {
      // 购买前先判断是否登录
      if (this.username == "" || this.username == null) {
        this.$message({
          type: "error",
          message: "请先登录!",
        });
      } else {
        this.dialog = true;
      }
    },

    getTime() {
      //获取当前时间
      var yy = new Date().getFullYear();
      var mm = new Date().getMonth() + 1;
      var dd = new Date().getDate();
      var _this = this;
      _this.gettime = yy + "-" + mm + "-" + dd;
      // var currentTime = _this.gettime;
      // console.log(currentTime);
      return _this.gettime;
    },
    comment1() {
      if (this.username == "" || this.username == null) {
        this.$message({
          type: "error",
          message: "请先登录!",
        });
      } else {
        let that = this;
        this.getData();
        if (that.textarea != "") {
          this.$axios
            .post("/api/comment", {
              userId: that.userId,
              spotId: that.spotId,
              comment: that.textarea,
              commentTime: that.getTime(), //调用自定义获取时间函数
            })
            .then(() => {
              that.textarea = "";
              that.getCom();
              this.$message({
                type: "success",
                message: "评价成功!",
              });
            });
        } else {
          this.$message({
            type: "error",
            message: "输入不能为空!",
          });
        }
      }
    },
  },
};
</script>

<style scoped>
.el-header {
  background-color: #ffe2e2;
  color: #333;
  text-align: center;
  /* line-height: 200px; */

  margin-right: 150px;
}

.el-footer {
  background-color: #fff9e3;
  color: #333;
  text-align: right;
  /* line-height: 200px; */
  margin-right: 150px;
  padding-top: 10px;
}

.el-aside {
  background-color: #d2fffb;
  color: #333;
  text-align: center;
  /* line-height: 1000px; */
  margin-left: 200px;
}

.el-main {
  background-color: #fff9e3;
  color: #333;
  text-align: center;
  /* line-height: 600px; */
  margin-right: 150px;
}
.image {
  width: 100%;
  display: block;
}
.el-container {
  padding-top: 10px;
}
#comment {
  margin-top: 100px;
}
#commentButton {
  margin-top: 10px;
}
</style>