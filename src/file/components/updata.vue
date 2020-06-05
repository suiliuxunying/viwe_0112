<template>

  <div style="">

    <div style="margin: 3vh 10vw;">
      <el-input placeholder="请输入文件所在目录" v-model="dir">
        <template slot="prepend">/</template>
      </el-input>
    </div>

    <el-upload

      style=" margin :0 10vw"

      class="upload-demo"
      multiple
      :action="imageAction"
      :data="uploadData"
      name="multipartfiles"
      with-credentials
      show-file-list
      :limit="limit"

      :on-exceed = "onExceed"
      ref="upload"

      :on-preview="handlePreview"
      :on-remove="handleRemove"

      :before-upload="beforeUpload"
      :before-remove="beforeRemove"
      :on-error="uploadError"
      :on-success="uploadSuccess"
      :on-change="onChange"
      :auto-upload="false"
      :file-list="fileList"
    >
    <el-button slot="trigger"  type="primary">选取文件</el-button>
    <el-button style="margin-left: 10px;" type="success" @click="submitUpload">上传到服务器</el-button>
    <div class="el-upload__tip" slot="tip">支持各种文件格式 最多一次上传两个文件</div>
    <div class="el-upload__tip" slot="tip" style="color: red;">{{message.error}}</div>
    </el-upload>

  </div>
</template>

<script>
export default {
  name: 'updata',
  data () {
    return {
      dir: '/a/',
      limit: 2,
      imageAction: 'http://localhost:9090/house/save',
      imagsName: [],
      fileList: [
        {
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }
      ],
      uploadData: {},
      message: { error: '' }
    }
  },
  methods: {
    // 当设置了取消自动上传的时候，调用此方法开始上传
    submitUpload () {
      this.$refs.upload.submit()
    },

    handleRemove (file, fileList) {
      console.log('删除')
      console.log(file, fileList)
    },
    //      预览
    handlePreview (file) {
      console.log('预览')
      console.log(file)
    },
    //      超数量
    onExceed (files, fileList) {
      this.message.error = ('提示：只能一次上传' + this.$data.limit + '个文件！')
    },
    //     上传前
    beforeUpload (file) {
      console.log('上传前')
      console.log(file)
      this.message.error = ('文件类型为：' + file.type)
    },
    uploadSuccess (response, file, fileList) {
      //        this.fileIds = response.fileIds;
      console.log('上传图片成功')
      console.log(response, file, fileList)
      // this.$data.imagsName.push(response)
      // console.log(this.$data.imagsName)
      // this.putimagsname() !!!
    },
    beforeRemove () {},
    onChange () {},
    uploadError (response, file, fileList) {
      this.message.error = ('上传失败！')
      console.log('上传失败')
      console.log(response, file, fileList)
    },
    putimagsname () {
      console.log('putimagsname')
      this.$emit('getImagsName', this.$data.imagsName)
      //        this.$emit("submit",this.$data.form);
    }
  }
}
</script>

<style scoped>
</style>
