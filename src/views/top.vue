<template>
<!-- 左上角图片 -->
  <div>
    <div >
      <a href="/">
      <img :src="imgSrc"
           width="30%"
           height="50%"
           alt="" >
     </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
            imgSrc: require("../assets/zhongshan.png"),
           };
  },
};
</script>