<!-- 旅游热门推荐 -->
<template>
  <div>
    <div>
    <top></top>
    </div>
    <!-- 景点搜索 -->
    <div>
      <el-row>
        <el-col :offset="9" :span="7">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="景点查询">
          <el-input v-model="formInline.search" placeholder="请输入旅游景点"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" >查询</el-button>
        </el-form-item>
        </el-form>
        </el-col>
      </el-row>
    </div>
  <!-- 热门景点 -->
  <div>
   <el-row>
    <el-col :offset="3" :span="18">
    <el-card class="box-card" id="head">
      <div slot="header" > <!-- 头部 -->
        <div > 
          <h2><i class="el-icon-magic-stick" s></i> 热门景点推荐</h2> 
        </div>
        <div > 
        </div>
      </div>
        <!-- 主体 -->
      <div> 
      <recommend> </recommend>
      </div>
    </el-card>
    </el-col>
   </el-row>
  </div>
  </div>
</template>

<script>
import top from '../views/top'
import recommend from '../views/recommend'

export default {
  components:{
    top,
    recommend,
  },
  data() {
    return {
      formInline: {
          search: '',
          
        }
    };
  },
   methods: {
      onSubmit() {
      this.$router.push({ path: "/search", query: { spotAddress: this.formInline.search } });
    },
    }
};
</script>

<style scoped>
 /* .box-card {
    width: 480px;
  } */
  h2{
    color: rgb(235, 34, 34);
  }
  #head{
    background-color: rgb(253, 244, 230);
  }
</style>