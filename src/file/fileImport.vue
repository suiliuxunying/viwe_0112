<template>
<div>
  <h2>导入数据：</h2>
  <h4>(主要用于将位于本地的数据文件传入到HBase数据库，便于后续进行数据分析)</h4>
      <el-form :inline="true" :model="uploadData" class="demo-form-inline">
        <el-form-item label="文件库">
          <el-select v-model="uploadData.bucket" placeholder="选择导入的文件库">
            <el-option
                v-for="item in bucketList"
                :key="item.bucketId"
                :value="item.bucketName">
              </el-option>
          </el-select>
        </el-form-item>
         <el-form-item label="目录">
           <el-select
           wide="100"
              v-model="dir"
              filterable
              allow-create
              default-first-option
              placeholder="支持自定义输入">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary"  @click="submitUpload">导入</el-button>
        </el-form-item>
    </el-form>
 <el-card style="min-height: 32ch;">
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
    <div class="el-upload__tip" slot="tip">支持各种文件格式 最多一次上传5个文件</div>
    <div class="el-upload__tip" slot="tip" style="color:#000555;">{{message.error}}</div>
    </el-upload>
</el-card>
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose">
  <span>{{dialogMessage}}</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false ;$router.go(0)">确 定</el-button>
  </span>
</el-dialog>
</div>
</template>

<script>
import { getToken } from '@/utils/auth'
import { getFileType, loadingRun } from '@/utils/utils'
// import { serviceIP1 } from '@/utils/iconfig'
export default {
  // 改名字
  name: 'fileImport',
  props: {
    // msg: String
  },
  data () {
    return {
      // 目录接收值
      dir: '',
      limit: 5,
      action: 'http://' + 'localhost:9080' + '/hos/v1/object',
      headers: {
        // 'Content-Type': 'application/json',
        token: getToken()
      },
      imagsName: [],
      fileList: [
      ],
      uploadData: {
        bucket: '',
        key: '',
        mediaType: ''
      },
      message: { error: '' },
      // 转转转
      loadingInstance: null,
      options: [{
        value: '/',
        label: '/ (根目录,有助于性能）'
      }, {
        value: '/data/',
        label: '/data/ (存分析数据推荐目录)'
      }],
      bucketList: [{
        creator: '小明',
        bucketId: '1',
        createTime: '2016-05-02',
        bucketName: '王小虎',
        detail: '上海市普陀区金沙江路 1518 弄'
      }],
      dialogVisible: false, // dialogWindows
      dialogMessage: ''
    }
  },
  mounted () {
    this.$store.dispatch('getBucket')
      .then(() => {
        this.bucketList = this.$store.getters.bucketList
        // console.log(this.$store.getters)
      })
      .catch(error => {
        console.log(error)
      })
  },
  methods: {
    // 当设置了取消自动上传的时候，调用此方法开始上传
    submitUpload () {
      if (this.uploadData.bucket !== '' && this.dir !== '') {
        this.$refs.upload.submit()
      } else {
        console.log(this.$data)
        this.dialogMessage = '您没有选择完整信息。'
        this.dialogVisible = true
      }
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
      if (this.uploadData.bucket !== '' && this.dir !== '') {
        this.uploadData.key = this.dir + file.name
        this.uploadData.mediaType = getFileType(file.name)
        this.message.error = ('文件类型为：' + file.type)
        this.loadingInstance = loadingRun('数据疯狂上传中...')
      }
    },
    uploadSuccess (response, file, fileList) {
      this.loadingInstance.close()
      this.message.error = ('上传成功!')
      console.log('上传成功')
      console.log(response, file, fileList)
      this.dialogMessage = '文件上传成功，可以在文件库中查看。'
      this.dialogVisible = true
    },
    beforeRemove () {},
    onChange () {},
    uploadError (response, file, fileList) {
      this.message.error = ('上传失败！' + response)
      console.log('上传失败')
      this.loadingInstance.close()
      console.log(response, file, fileList)
      this.dialogMessage = '文件上传失败，请确认您有所上传文件的操作权限。'
      this.dialogVisible = true
    },
    // 对话框X
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    }
  },
  watch: {
    // isBucketDir: function (val, oldVal) {
    //   console.log(val + oldVal)
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-select__caret .el-input__icon .el-icon-arrow-up{
    margin: 0ch;
  }
  h2{
    margin: 30px;
  }
  h4{
    margin-bottom: 30px;
  }
</style>
