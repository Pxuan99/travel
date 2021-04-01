<!-- 添加景点信息 -->
<template>
  <div>
    <el-row>
      <el-col :span="15">
        <el-form ref="form" :model="form" label-width="80px">
          <el-form-item label="景点标题">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="景点描述">
            <el-input type="textarea" v-model="form.desc"></el-input>
          </el-form-item>
          <el-form-item label="景点地址">
            <el-input type="textarea" v-model="form.addr"></el-input>
          </el-form-item>
          <el-form-item label="门票">
            <el-switch
              v-model="value"
              active-text="需要门票"
              inactive-text="免费"
            >
            </el-switch>
          </el-form-item>
          <div v-if="value">
            <el-form-item label="门票价格">
              <el-input v-model="form.price"></el-input>
            </el-form-item>
          </div>
          <el-form-item label="景点图片">
            <el-upload
              action="/api/up/upload"
              :limit=1
              list-type="picture-card"
              :on-success="findUrl"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              accept=".jpg,.png"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm()">添加</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: "",
      value: false,
      dialogImageUrl: "",
      dialogVisible: false,
      form: {
        name: "",
        desc: "",
        addr: "",
        price: "",
        picUrl:"",
      },
    };
  },

  methods: {
    submitForm() {
      let that = this;
      this.$axios
        .post("/api/spot", {
          spotName: that.form.name,
          spotBody: that.form.desc,
          spotAddress: that.form.addr,
          ticketPrice: that.form.price,
          isticket: that.value,
          spotPic:that.form.picUrl
        })
        .then((res) => {
          if (res.data.msg == "执行成功") {
            this.$refs.form.resetFields();
            that.$message({
              type: "success",
              message: "添加成功!",
            });
          }
        });
    },

    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    findUrl(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      let url = res.body;
      this.form.picUrl = url
      // console.log(file);
      // console.log(this.form.picUrl);
    },
   
  },
};
</script>

<style scoped>

#pic {
  border: 2px dashed #409eff;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

</style>