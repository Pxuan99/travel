<template>
  <div>
    <div>
      <top></top>
    </div>
    <div>
      <el-container>
        <el-container>
          <!-- 左边 -->
          <el-aside width="300px">
            <el-card>
              <img :src="pic" class="image" />
            </el-card>
          </el-aside>
          <!-- 右边上中下 -->
          <el-container>
            <el-header
              ><h2>{{ spotName }}</h2></el-header
            >
            <el-main>{{ spotBody }}</el-main>
            <el-footer>
              门票价格：{{ ticketPrice }}
              <el-button type="danger" round @click="dialog = true"
                >购买门票</el-button
              >
            </el-footer>
          </el-container>
        </el-container>
      </el-container>
      <el-dialog title="购票详情" :visible.sync="dialog">
        <el-form :model="form">
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
          <el-form-item label="出行日期" :label-width="formLabelWidth">
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
          <el-button type="primary" @click="buy()">确认购买</el-button>
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
              maxlength="233">
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
          <el-col :offset="4" :span="13" v-for="(user,i) in data" :key="i">
            <div>用户{{ user.userId }}</div>
            <span>{{ user.comment}}</span>
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
      username: "",
      userId: "",
      comment: "",
      dialog: false,
      num: 1,
      value: "",
      data: [
        {id:1, name:'zs1'},
        {id:2, name:'zs2'},
        {id:3, name:'zs3'},
        {id:4, name:'zs4'},
        {id:5, name:'zs5'},
        {id:6, name:'zs6'},
      ],
      pic:
        "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
      textarea: "",
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      formLabelWidth: "140px",
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < Date.now();
        },
      },
      form: {
        num: "",
        date: "",
      },
    };
  },
  created() {
    this.getData();
    this.getCom();
    this.username = localStorage.getItem("username");
    this.userId = localStorage.getItem("id"); //获取当前用户的id

    // this.userId=this.getData();
  },
  mounted() {},
  methods: {
    getData() {
      let that = this;
      let url = "http://127.0.0.1:8088/spot?id=1";
      that.$axios.get(url).then((res) => {
        // that.$qs.parse(res.body);
        // console.log(res);
        that.spotBody = res.data.data.records[0].spotBody;
        that.spotName = res.data.data.records[0].spotName;
        that.spotId = res.data.data.records[0].id;
        that.ticketPrice = res.data.data.records[0].ticketPrice;
      });
    },

getCom() {
      let that = this;
      let url = "http://127.0.0.1:8088/comment?spotId=1";
      that.$axios.get(url).then((res) => {
        let str =JSON.stringify(res.data.data.records);
        that.data=JSON.parse(str);
        
      });
    },
    handleChange(value) {
      console.log(value);
    },
    buy() {
      let that = this;
      // console.log(that.form.num);
      // console.log(that.form.date);
      // this.getData();
      this.$axios
        .post("/api/userOrder", {
          userId: that.userId,
          spotId: that.spotId,
          ticketNum: that.form.num,
          orderDate: that.form.date,
          orderTotalprice: that.ticketPrice * that.form.num,
        })
        .then(() => {
          this.dialog = false;
          this.$message({
            type: "success",
            message: "购买成功!",
          });
        });
    },
    comment1() {
      let that = this;
      // console.log(that.form.num);
      // console.log(that.form.date);
      this.getData();
      if(that.textarea!=''){
      this.$axios
        .post("/api/comment", {
          userId: that.userId,
          spotId: that.spotId,
          comment: that.textarea,
        })
        .then(() => {
          that.textarea = "";
          that.getCom();
          this.$message({
            type: "success",
            message: "评价成功!",
          });
        });
      }
      else{
         this.$message({
            type: "error",
            message: "输入不能为空!",
          });
      }
    },
  },
};
</script>

<style scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  /* line-height: 200px; */
  margin-right: 200px;
}

.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: right;
  /* line-height: 200px; */
  margin-right: 200px;
  padding-top: 10px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  /* line-height: 1000px; */
  margin-left: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /* line-height: 600px; */
  margin-right: 200px;
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