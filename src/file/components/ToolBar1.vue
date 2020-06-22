<template>
 <div class="hello">
  <el-divider><i class="el-icon-folder-opened"></i></el-divider>
  <div class="contain" style="    height: 10px;">
      <el-breadcrumb separator-class="el-icon-arrow-right" style=" float: left;" >
      <el-breadcrumb-item replace  :to="{ path: '/View/main/FileHome/BucketList'}">文件库</el-breadcrumb-item>
      <el-breadcrumb-item   replace  v-for="(item) in $store.getters.routes"
       :to="{ path: item.path+'?'+'bucket='+item.query.bucket+'&dir='+item.query.dir}" :key="item.name">{{item.name}}</el-breadcrumb-item>
      <!-- <el-breadcrumb-item replace  :to="{ path: '0'}"></el-breadcrumb-item> -->
    </el-breadcrumb>
    <el-button v-if="this.$store.getters.isBucketDir"  type="primary" plain style=" float: right;margin: -15px 30px;" @click="dialogFormVisible1 = true">新建文件库</el-button>
    <el-button v-else  type="primary" plain style=" float: right; margin: -15px 0px;" @click="dialogFormVisible2 = true">上传文件</el-button>

    <!-- <el-button type="success" plain style=" float: right;margin: -15px -5px;" >删除选中</el-button> -->
  </div>
    <el-divider><i class="el-icon-folder-opened"></i></el-divider>
<!-- 对话框 -->
<!-- bucket  Form -->
    <el-dialog title="新建文件库（bucket）" :visible.sync="dialogFormVisible1" >
      <el-form :model="createBucket">
        <el-form-item label="bucket名称" :label-width="formLabelWidth">
          <el-input clearable  v-model="createBucket.bucket" autocomplete="on"></el-input>
        </el-form-item>
        <el-form-item label="bucket备注" :label-width="formLabelWidth">
         <el-input clearable  v-model="createBucket.detail" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="createBucketM()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- file  Form -->
    <el-dialog title="上传文件" :visible.sync="dialogFormVisible2" >

        <updata  @getImagsName="getImagsName"></updata>

      <div slot="footer" class="dialog-footer">

        <el-button @click="dialogFormVisible2 = false ;$router.go(0)">关 闭</el-button>

      </div>
    </el-dialog>
  </div>
</template>

<script>
import { loadingRun } from '../../utils/utils'
import updata from './updata'
export default {
  // 改名字
  name: 'ToolBar1',
  props: {
    // msg: String
  },
  components: { updata },
  data () {
    return {
      // 新建按钮选择显示
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      createBucket: {
        bucket: 'bucketName',
        detail: '这是一个简单的bucket'
      },
      formLabelWidth: '120px',
      Data: {
        bucket: '',
        routes: [
          {
            name: '文件库',
            id: 'root',
            path: '/view/filehome'
          }
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
    createBucketM () {
      // console.log('新建bucket：' + this.createBucket)
      // 确定后 转圈圈
      const loadingInstance = loadingRun('数据库疯狂响应中...')
      // 以服务的方式调用的 Loading 需要异步关闭
      this.$store.dispatch('createBucket', this.createBucket)
        .then((message) => {
          setTimeout(() => {
            loadingInstance.close()
          }, 2000)
          // 更新页面
          this.$router.go(0)
        })
        .catch(error => {
          this.$notify({
            title: '提示',
            message: '新建文件库出错。' + error
          })
          console.log(error)
          loadingInstance.close()
        })
    },
    getImagsName (imagsName) {
      this.$data.form.imagsName = imagsName
    //   console.log('this.$data.form.imagsName')
    //   console.log(this.$data.form.imagsName)
    },
    upLode () {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1 {
  margin: 40px 0 0;

}

</style>
