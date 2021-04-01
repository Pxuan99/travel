<template>
<!-- 导航栏 -->
<div>
  <div>
    <top></top>
  </div>
  <div>
    <h2 style="text-align:center">后台信息管理</h2>
  </div>
  <div style="margin-top:50px">
  <el-row class="tac">
  <el-col :span="4" :offset="2">
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      router
      >
      <el-menu-item index="/user">
        <i class="el-icon-user"></i>
        <span slot="title">用户信息</span>
      </el-menu-item>
      <el-menu-item index="/add">
        <i class="el-icon-circle-plus-outline"></i>
        <span slot="title">添加景点</span>
        </el-menu-item>
        <el-menu-item index="/scenery">
        <i class="el-icon-sunrise"></i>
        <span slot="title">景点信息</span>
      </el-menu-item>
      <el-menu-item index="/ticket" >
        <i class="el-icon-tickets"></i>
        <span slot="title">门票信息</span>
      </el-menu-item>
      
      
      
    </el-menu>
    </el-col>
      <el-col :span="18" >
      <router-view></router-view>
    </el-col>
</el-row>

</div>
<!-- <div>
<router-view></router-view>
</div> -->
</div>
</template>

<script>
import top from '../views/top'

export default {
  components: {
   top
  },
  data() {
    return {};
  },
  methods: {
     
    }
};
</script>

<style scoped>
.el-menu {
  border-right: none;
  height: 700px;
  /* position: fixed; */
  background: #545c64;
}
</style>