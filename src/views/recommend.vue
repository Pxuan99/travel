<!--下方热门-->
<template>
  <el-row>
    <el-col :span="5" :offset="1">
      <div>
        <el-card :body-style="{ padding: '5px' }" shadow="hover">
          <div>
            <img :src="spotId1" class="image" />
            <div style="padding: 5px">
              <p>孙中山故居</p>
              <div class="bottom clearfix">
                <el-button type="success " round class="button" @click="detail1"
                  >点击前往</el-button
                >
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </el-col>
    <el-col :span="5" :offset="1">
      <div>
        <el-card :body-style="{ padding: '5px' }" shadow="hover">
          <div>
            <img :src="spotId2" class="image" />
            <div style="padding: 5px">
              <p>小榄菊花会</p>
              <div class="bottom clearfix">
                <el-button type="success " round class="button" @click="detail2"
                  >点击前往</el-button
                >
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </el-col>
    <el-col :span="5" :offset="1">
      <div>
        <el-card :body-style="{ padding: '5px' }" shadow="hover">
          <div>
            <img :src="spotId3" class="image" />
            <div style="padding: 5px">
              <p>脆肉皖文化节</p>
              <div class="bottom clearfix">
                <el-button type="success " round class="button" @click="detail3"
                  >点击前往</el-button
                >
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </el-col>
    <el-col :span="5" :offset="1">
      <div>
        <el-card :body-style="{ padding: '5px' }" shadow="hover">
          <div>
            <img :src="spotId4" class="image" />
            <div style="padding: 5px">
              <p>五桂山</p>
              <div class="bottom clearfix">
                <el-button type="success " round class="button" @click="detail4"
                  >点击前往</el-button
                >
              </div>
            </div>
          </div>
        </el-card>
      </div>
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
  height: 200px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
.el-card {
  background-color: rgb(235, 236, 231);
  /* height: 400px; */
}

</style>

<script>
export default {
  data() {
    return {
      pic:
        "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg",
      spotName: [],
      spotId1:'http://localhost:8088/pic/sunzhongshan.jpg',
      spotId2:'http://localhost:8088/pic/ju.jpg',
      spotId3:'http://localhost:8088/pic/dongsheng.jpg',
      spotId4:'http://localhost:8088/pic/wuguishan.jpg',
    };
  },
  mounted() {
    // this.getData();
  },
  methods: {
    detail1() {
      this.$router.push({ path: '/detailSearch', query: { spotId:1}});
    },
    detail2() {
     this.$router.push({ path: '/detailSearch', query: { spotId:2}});
    },
    detail3() {
      this.$router.push({ path: '/detailSearch', query: { spotId:3}});
    },
    detail4() {
      this.$router.push({ path: '/detailSearch', query: { spotId:4}});
    },
    // getData() {
    //   let that = this;
    //   let url = "http://127.0.0.1:8088/spot";
    //   that.$axios.get(url).then((res) => {
    //     for (let i = 0; i < 4; i++) {
    //       // console.log(res.data.data.records[i].spotName);
    //       that.spotName = res.data.data.records[i].spotName;
    //     }
    //   });
    // },
  },
};
</script>