<!-- 下方主题游-->
<template>
<el-row>
  <el-col :span="5" v-for="(o, index) in 3" :key="o" :offset="index > 0 ? 1 : 0">
    <el-card :body-style="{ padding: '5px' }" shadow="hover">
      <img :src="pic" class="image">
      <div style="padding: 10px;">
        <p>主题游</p>
        <div class="bottom clearfix">
          <el-button type="success" round class="button">点击前往</el-button>
        </div>
      </div>
    </el-card>
  </el-col>
</el-row>
</template>

<style scoped>
  .bottom {
    margin-top: 13px;
    line-height: 12px;
  }

  .button {
    padding: 0;
    float: right;
    width: 80px;
    height: 30px;
  }

  .image {
    width: 100%;
    display: block;
  }

  .clearfix:before,
  .clearfix:after {
      display: table;
      content: "";
  }
  
  .clearfix:after {
      clear: both
  }
  .el-card{
      background-color: rgb(235, 236, 231);
  }
</style>

<script>
export default {
  data() {
    return {
      pic : require('../assets/pic2.jpg'),
    };
  }
}
</script>