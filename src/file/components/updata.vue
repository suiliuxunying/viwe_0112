<template>

  <div style="">

    <div style="margin: 3vh 10vw;">
      <el-input placeholder="请输入文件所在目录" v-model="uploadData.key">
        <template slot="prepend">以"/"开头结尾</template>
      </el-input>
    </div>

    <el-upload

      style=" margin :0 10vw"

      class="upload-demo"
      multiple
      :action="action"
      :headers='headers'
      :data="uploadData"
      name="content"
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
import { getToken } from '@/utils/auth'
import { getFileType, loadingRun } from '../../utils/utils'
export default {
  name: 'updata',
  data () {
    return {
      dir: '/a/',
      limit: 2,
      action: 'http://localhost:9080/hos/v1/object',
      headers: {
        // 'Content-Type': 'application/json',
        token: getToken()
      },
      imagsName: [],
      fileList: [
      ],
      uploadData: {
        bucket: '',
        key: '/',
        mediaType: ''
        // content:'' 这应该是文件内容 放在<el-upload>属性里
      },
      message: { error: '' },
      loadingInstance: null

    }
  },
  mounted () {
    // 获取bucket名字

  },
  methods: {
    // 当设置了取消自动上传的时候，调用此方法开始上传
    submitUpload () {
      this.getBucketName()
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
      this.message.error = ('提示：暂时限制只能一次上传' + this.$data.limit + '个文件！')
    },
    //     上传前
    beforeUpload (file) {
      console.log('上传前')
      console.log(file)
      // 设置文件上传需要的参数
      this.uploadData.key += file.name
      this.uploadData.mediaType = getFileType(file.name)
      this.message.error = ('文件类型为：' + file.type)
      this.loadingInstance = loadingRun('数据疯狂上传中...')
    },
    uploadSuccess (response, file, fileList) {
      this.loadingInstance.close()

      console.log('上传成功')
      console.log(response, file, fileList)
    },
    beforeRemove () {},
    onChange () {},
    uploadError (response, file, fileList) {
      this.message.error = ('上传失败！' + response)
      console.log('上传失败')
      this.loadingInstance.close()
      console.log(response, file, fileList)
    },
    putimagsname () {
      console.log('putimagsname')
      this.$emit('getImagsName', this.$data.imagsName)
      //        this.$emit("submit",this.$data.form);
    },
    getBucketName () {
      this.uploadData.bucket = this.$store.getters.routes[0].name
      console.log('this.uploadData')
      console.log(this.uploadData)
    }
  }
}
</script>

<style scoped>
</style>
