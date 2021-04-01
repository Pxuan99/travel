 <template>
  <!-- 首页 -->
  <div>
    <!-- <div>{{ username }}</div> -->
    <!-- 头部 -->
    <div>
      <div class="top">
        <a href="/">
          <img :src="imgSrc" width="30%" height="50%" alt="" />
        </a>
      </div>
      <div class="top" id="welcome">
        <div v-if="loginout()">
          <h3 class="top">欢迎,请</h3>
          <el-button :plain="true" @click="login" type="info" round
            >登录</el-button
          >
          <h3 class="top" id="login"></h3>
          <h3 class="top">无账号？</h3>
          <el-button :plain="true" @click="register" type="info" round
            >点击注册</el-button
          >
        </div>
        <div v-else>
          <h3 class="top" id="logout">欢迎回来，{{ username }}</h3>
          <el-button :plain="true" @click="logout" type="info" round
            >登出</el-button
          >
          <el-button :plain="true" @click="changepassword" type="info" round
            >修改密码</el-button
          >
        </div>
      </div>
    </div>
    <!-- 搜索框 -->
    <div>
      <el-row>
        <el-col :offset="8" :span="8">
          <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="景点查询">
              <el-input
                v-model="formInline.search"
                placeholder="请输入旅游景点"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="search">查询</el-button>
              <el-button type="primary" @click="searchAll">查询全部</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      background-color="#58ACFA"
      text-color="#fff"
      active-text-color="#F6CECE"
    >
      <el-menu-item index="1" @click="main">首页</el-menu-item>
      <el-menu-item index="2" @click="TravelRecommend">旅游推荐</el-menu-item>
      <el-menu-item index="3" @click="Myticket" v-if="check()"
        >我的门票</el-menu-item
      >
      <el-menu-item index="4" @click="admin" v-if="this.username == 'admin'"
        >后台管理</el-menu-item
      >
    </el-menu>
    <div>
      <!-- 切换时间4000  -->
      <el-carousel :interval="4000" type="card">
        <el-carousel-item v-for="url in urls" :key="url">
          <!-- <h3 class="medium">{{ item }}</h3> -->
          <el-image style="height: 100%" :src="url"></el-image>
        </el-carousel-item>
      </el-carousel>
    </div>

    <div>
      <el-container>
        <el-header>
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="热门" name="first"
              ><el-main><recommend> </recommend></el-main
            ></el-tab-pane>
            
            <el-tab-pane label="简介" name="third"
              ><el-main><introduction></introduction></el-main
            ></el-tab-pane>
          </el-tabs>
        </el-header>
      </el-container>
    </div>
  </div>
</template>

<script>
import recommend from "../views/recommend";

import introduction from "../views/introduction";

export default {
  components: {
    recommend,
    
    introduction,
  },
  data() {
    return {
      username: "",
      activeName: "first",
      imgSrc: require("../assets/zhongshan.png"),
      activeIndex: "1",
      urls: [
        "http://localhost:8088/pic/sunzhongshan.jpg",
        "http://localhost:8088/pic/xiaolanjuzhan.jpg",
        "http://localhost:8088/pic/zimaling.jpg",
        "http://localhost:8088/pic/xingzhong.jpg",
        "http://localhost:8088/pic/xingzhongguangchang.jpg",
        "http://localhost:8088/pic/zhongshanlu.jpg"
      ],
      formInline: {
        search: "",
      },
    };
  },
  //   beforeCreate() {
  //   let username = localStorage.getItem("name");
  //   console.log(username);
  // },
  mounted() {
    this.username = localStorage.getItem("username");
    // this.email = localStorage.getItem("email");
    // console.log(this.email);
    this.loginout();
    this.check();
    // this.getData()
  },
  methods: {
    loginout() {
      //未登录则显示
      let username = localStorage.getItem("username");
      if (username == "" || username == null) {
        return true;
      } else {
        return false;
      }
    },
    check() {
      //未登录则不显示
      let username = localStorage.getItem("username");
      if (username == "" || username == null) {
        return false;
      } else {
        return true;
      }
    },
    logout() {
      //登出功能
      localStorage.clear();
      window.location.href = "/";
    },
    login() {
      this.$router.push("/login");
    },
    register() {
      this.$router.push("/register");
    },
    changepassword() {
      this.$router.push("/changepassword");
    },
    main() {
      // this.$router.push("/");
      window.location.href = "/";
    },
    TravelRecommend() {
      this.$router.push("/TravelRecommend");
    },
    Myticket() {
      this.$router.push("/Myticket");
    },
    search() {
      
      this.$router.push({ path: "/search", query: { spotAddress: this.formInline.search } });
    },
    searchAll() {
      this.$router.push("/searchAll");
    },
    admin() {
      this.$router.push("/admin");
    },
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClick(tab, event) {
      console.log(tab, event);
    },
    // getData() {
    //   let that = this;
    //   let url =
    //     "http://127.0.0.1:8088/spot";
    //   that.$axios.get(url).then((res) => {
    //     console.log(res.data.data.records);
    //   });
    // },
  },
};
</script>

<style scoped>
.el-menu-item {
  padding: 0px 150px 0px 150px;
  /*font-size: 3px; */
}
#travel {
  padding: 0px 165px 0px 153px;
}
.el-carousel {
  height: auto;
}
.el-carousel__item el-image {
  color: #475669;
  opacity: 0.5;
  line-height: 100%;
  margin: 0;
}
.top {
  display: inline;
}
#welcome {
  float: right;
  padding-top: 20px;
  padding-right: 30px;
}
#login {
  padding-right: 20px;
}
#logout {
  padding-right: 20px;
}
.el-header {
  background-color: #85e4b4;
  color: #333;
  /* text-align: center; */
  line-height: 60px;
}
.el-main {
  background-color: #b0eeee;
  /* color: rgba(250, 9, 9, 0.623); */
  /* text-align: center; */
  /* line-height: 160px; */
}
.sub {
  width: 400px;
}
/* body > .el-container {
    margin-bottom: 40px;
  } */
</style>