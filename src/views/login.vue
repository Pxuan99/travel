<template>
  <div id="all">
    <div class="background">
      <img :src="imgSrc"
           width="100%"
           height="100%"
           alt="" />
    </div>
    <div>
      <el-button @click="main()">返回首页</el-button>
    </div>
    <div class="front">
    <el-card class="box-card">
      <h2 class="title">登录</h2>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="用户名：" prop="name">
          <el-input
            v-model="ruleForm.name"
            maxlength="30"
            show-word-limit
            style="width: 290px"
            ><i slot="prefix" class="el-input__icon el-icon-user-solid"></i
          ></el-input>
        </el-form-item>
        <el-form-item label="密码：" prop="pass1">
          <el-input
            type="password"
            v-model="ruleForm.pass1"
            autocomplete="off"
            maxlength="30"
            show-password
            style="width: 290px"
          >
            <i slot="prefix" class="el-input__icon el-icon-lock"></i
          ></el-input>
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button type="primary" @click="Login('ruleForm')">登录 </el-button>
        <el-button @click="register()">注册</el-button>
      </div>
    </el-card>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      username: "",
      // activeName: "second",
      imgSrc: require("../assets/guzhen.jpg"),
      ruleForm: {
        delivery: false,
        type: [],
        name: "",
        // loginid: "",
        pass1: "",
      },
      rules: {
        name: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { max: 30, message: "长度在 30 个字符", trigger: "blur" },
        ],
        pass1: [{ required: true, validator: validatePass, trigger: "blur" }],
        // name: [
        //   { required: true, message: "请输入用户名", trigger: "blur" },
        //   { max: 30, message: "长度在 30 个字符", trigger: "blur" },
        // ],
      },
    };
  },
  // mounted() {
  //   this.username = localStorage.getItem("name");
  //   console.log(this.username);
  // },
  methods: {
    main() {
      this.$router.push("/");
    },
    Login(formName) {
      this.$refs[formName].validate((valid) => {
        //先验证是否输入了数据
        if (valid) {
          let that = this;
          //数据库中获取数据
          let url =
            "http://127.0.0.1:8088/user?name=" +
            that.ruleForm.name +
            "&password=" +
            that.ruleForm.pass1;
          that.$axios.get(url).then((res) => {
            let i = this.$qs.parse(res.data.data);
            // console.log(i);
            // console.log(res.data.data.records[0].name);
            if (i.total == 1) {
              //如果能找到数据，允许登录
              // console.log(res.data.data.records[0].email);
              localStorage.setItem("username", res.data.data.records[0].name);
              localStorage.setItem("id", res.data.data.records[0].id);
              localStorage.setItem("email", res.data.data.records[0].email);
              this.$message(
                {
                  type: "success",
                  message: "登录成功!",
                },
                this.$router.push("/")
              );
            } else {
              this.$message({
                type: "error",
                message: "输入信息有误，请重新输入!",
              });
            }
          });
        } else {
          //如果没输入数据
          this.$message({
            type: "error",
            message: "输入不能为空，请重新输入!",
          });
        }
      });
    },

    register() {
      this.$router.push("/register");
    },
  },
};
</script>

<style scoped>
.el-header {
  color: rgb(218, 241, 9);
  text-align: center;
  line-height: 150px;
  font-style: inherit;
  font-size: 50px;
}

.el-footer {
  color: #333;
  text-align: center;
  line-height: 60px;
  font-style: inherit;
  font-size: 30px;
}

.el-main {
  /* background-color: #e9eef3; */
  color: #333;
  /* text-align: center; */
  /*line-height: 160px;*/
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}

.box-card {
  width: 480px;
  height: 380px;
  /* margin: 10px;
  padding: 30px; */
  line-height: 80px;
  align-self: center;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
  border-radius: 30px 30px 30px 30px;
}
.title {
  text-align: center;
  /* font-size: 20px; */
  font-weight: bold;
}
/* 图片背景样式 */
.background {
  width: 100%;
  height: 100%; /*宽高100%是为了图片铺满屏幕*/
  z-index: -1;
  position: fixed;
  /* opacity: 0.9; */
  /* filter: alpha(Opacity=85);
  -moz-opacity: 0.85;
  opacity: 0.85; */
  
}
/* 图片和内容的层叠显示 */
.front {
  z-index: 1;
  /* position: absolute; */
  /* 设置透明度 */
  /* filter: alpha(Opacity=85); 兼容ie */
  -moz-opacity: 0.85;
  opacity: 0.9;
  
}
#all{
  margin: -8px;
  
}
</style>