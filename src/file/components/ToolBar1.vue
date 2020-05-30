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
    <el-button type="primary" plain style=" float: right;margin: -15px 30px;" @click="create">新建</el-button>
    <!-- <el-button type="success" plain style=" float: right;margin: -15px -5px;" >删除选中</el-button> -->
  </div>
    <el-divider><i class="el-icon-folder-opened"></i></el-divider>
  </div>
</template>

<script>
export default {
  // 改名字
  name: 'ToolBar1',
  props: {
    // msg: String
  },
  data () {
    return {
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
    create () {
      // console.log(item)
      // this.$store.commit('POP_route', item)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

h1 {
  margin: 40px 0 0;

}

</style>
