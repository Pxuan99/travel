<template>
  <div id="all">
    <div class="background">
       <img :src="imgSrc"
           width="100%"
           height="100%"
           alt="" />
    </div>
    <div class="front">
      <el-row>
        <el-col :span="12" :offset="12">
          <el-card class="box-card">
            <h2 class="title">修改密码</h2>
            <el-form
              :model="ruleForm"
              :rules="rules"
              ref="ruleForm"
              label-width="100px"
              class="demo-ruleForm"
            >
              <el-form-item label="用户名" prop="name">
                <el-input
                  v-model="ruleForm.name"
                  style="width: 330px"
                  disabled
                ></el-input>
              </el-form-item>

              <el-form-item label="输入旧密码" prop="oldpass">
                <el-input
                  type="password"
                  v-model="ruleForm.oldpass"
                  autocomplete="off"
                  show-password
                  style="width: 330px"
                  :clearable="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="输入新密码" prop="newpass">
                <el-input
                  type="password"
                  v-model="ruleForm.newpass"
                  autocomplete="off"
                  show-password
                  style="width: 330px"
                  :clearable="true"
                ></el-input>
              </el-form-item>
              <el-form-item label="确认新密码" prop="checkPass">
                <el-input
                  type="password"
                  v-model="ruleForm.checkPass"
                  autocomplete="off"
                  maxlength="30"
                  show-password
                  style="width: 330px"
                  :clearable="true"
                ></el-input>
              </el-form-item>
            </el-form>
            <div style="text-align: center">
              <el-button type="primary" @click="submitForm('ruleForm')"
                >修改密码</el-button>
              <el-button @click="goback">返回</el-button>
            </div>
          </el-card>
        </el-col>
      </el-row>
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
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.newpass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      imgSrc: require("../assets/sunwen.jpg"),
      dialogVisible1: true,
    //   username:'',
    id:'',
    email:'',
      ruleForm: {
        name: "",
        oldpass: "",
        newpass: "",
        checkPass: "",
       
      },
      rules: {
        oldpass: [
          { required: true, validator: validatePass, trigger: "blur" },
          {
            pattern: /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,18}$/,
            message: "密码需包含字母、数字，长度为 6 - 18位",
          },
        ],
        newpass: [
          { required: true, validator: validatePass, trigger: "blur" },
          {
            pattern: /^(?=.*\d)(?=.*[a-zA-Z])[a-zA-Z0-9]{6,18}$/,
            message: "密码需包含字母、数字，长度为 6 - 18位",
          },
        ],
        checkPass: [
          { required: true, validator: validatePass2, trigger: "blur" },
        ],
        // name: [
        //   { required: true, message: "请输入用户名", trigger: "blur" },
        //   { max: 30, message: "长度在 30 个字符以内", trigger: "blur" },
        // ],
        // mail: [
        //   { required: true, message: "请输入邮箱", trigger: "blur" },
        //   { max: 30, message: "长度在 30 个字符", trigger: "blur" },
        //   {
        //     pattern: /^([a-zA-Z0-9]+[-_.]?)+@[a-zA-Z0-9]+.(com|cn)+$/,
        //     message: "邮箱格式错误",
        //   },
        //   {
        //     type: "email",
        //     message: "请输入正确的邮箱地址",
        //     trigger: ["blur", "change"],
        //   },
        // ],
        //登录ID
        // loginid: [
        //   { max: 30, message: "长度在 30 个字符", trigger: "blur" },
        //   { required: true, message: "请输入ID", trigger: "blur" },
        //   { pattern: /^[0-9]*$/, message: "ID为数字" },
        // ],
      },
    };
  },
  mounted() {
    this.ruleForm.name = localStorage.getItem("username"); //挂载方法获取用户名、id、email
    this.id = localStorage.getItem("id");
    this.email = localStorage.getItem("email");
    // console.log(this.id);
    // console.log(this.email);
  },
  methods: {
    //    getData() {
    //   let that = this;
    //   let url =
    //     "http://127.0.0.1:8088/test";
    //   that.$axios.get(url).then((res) => {
    //     if (res.data.code == 0) {
    //       that.tableData = res.data.data.records;
    //       that.page.current = res.data.data.current;
    //       that.page.size = res.data.data.size;
    //       that.page.total = res.data.data.total;
    //     }
    //     // console.log(that.tableData.length);
    //   });
    // },

    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        //先验证是否输入了数据
        if (valid) {
          let that = this;
          //数据库中获取数据
          let url = "http://127.0.0.1:8088/user?name=" + that.ruleForm.name+"&&password="+ that.ruleForm.oldpass;
          that.$axios.get(url).then((res) => {
            let i = this.$qs.parse(res.data.data);
            // console.log(i);
            if (i.total == 1) {
              //若旧密码输入正确，则允许修改密码
              this.$axios
                .put("/api/user", {
                  id:this.id,
                  email: this.email,
                  name: that.ruleForm.name,
                  password: that.ruleForm.newpass,
                })
                .then((res) => {
                  if (res.data.msg == "执行成功") {
                    this.$refs.ruleForm.resetFields();
                    this.$confirm("修改成功！现在进入登录页面", "提示", {
                      confirmButtonText: "确定",
                      cancelButtonText: "取消",
                      type: "success",
                      center: true,
                    }).then(() => {
                      this.$message(
                        {
                          type: "info",
                          message: "请重新登录账号!",
                        },
                        this.$router.push("/login")
                      );
                    });
                  }
                })
                .catch((err) => {
                  console.log(err); //错误信息
                });
            } else {
            
              this.$message({
                type: "error",
                message: "旧密码有误，请重新输入!",
              });
            }
          });
        } else {
          //如果没输入数据
          this.$message({
            type: "error",
            message: "输入信息有误，请重新输入!",
          });
        }
      });
    },
    goback() {
      // this.$router.go(-1);
      this.$confirm("是否取消修改?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        center: true,
      })
        .then(() => {
          this.$message(
            {
              type: "info",
              message: "取消修改!",
            },
            this.$router.push("/")
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "继续修改",
          });
        });
    },
    // getData() {
    //   let that = this;
    //   let url =
    //     "http://127.0.0.1:8088/test?name="+that.ruleForm.name;
    //   that.$axios.get(url)
    //   .then((res) => {
    //     const i = this.$qs.parse(res.data.data);
    //     console.log(i.total);
    //   });
    // },
  },
};
</script>
<style scoped>
.box-card {
  width: 480px;
  height: 550px;
  margin: 50px;
  align-self: center;
  line-height: 80px;
  border-radius: 30px 30px 30px 30px;
  position: absolute;
  /* left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto; */
}

.title {
  text-align: center;
}
/* 图片背景样式 */
.background {
  width: 100%;
  height: 100%; /**宽高100%是为了图片铺满屏幕 */
  z-index: -1;
  position: fixed;
  /* filter: alpha(Opacity=85);
  -moz-opacity: 0.85;
  opacity: 0.85; */
}

/* 图片和内容的层叠显示 */
.front {
  z-index: 1;
  /* position: absolute; */
  /* 设置透明度 */
  filter: alpha(Opacity=85); /*兼容ie*/
  -moz-opacity: 0.85;
  opacity: 0.9;
}
#all{
  margin: -8px;
  
}
</style>