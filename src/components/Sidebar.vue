<template>
  <div style=" height: 100%;" >

    <el-menu

      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      router
      :default-active = "$route.path"
      >
<!-- :default-active = "$route.path" /自动定位到已经点击的标签 -->

      <el-menu-item index="/View/main/mainPage2">
        <i class="el-icon-s-home"></i>
        <span slot="title">平台主页</span>
      </el-menu-item>

      <el-menu-item index="/View/main/fileImport">
        <i class="el-icon-upload2"></i>
        <span slot="title">数据导入</span>
      </el-menu-item>

      <!-- /View/main/fileOperate -->
      <el-menu-item index="/View/main/FileHome/BucketList">
        <i class="el-icon-menu"></i>
        <span slot="title">&#8194;文&#8194;件&#8194;库&#8194;</span>
      </el-menu-item>

       <el-menu-item index="/View/main/fileSearch">
        <i class="el-icon-zoom-in"></i>
        <span slot="title">文件检索</span>
      </el-menu-item>

      <el-menu-item index="/View/main/makeCurve">
        <i class="el-icon-c-scale-to-original"></i>
        <span slot="title">数据分析</span>
      </el-menu-item>

      <!--<el-menu-item index="/View/main/RealTime">
        <i class="el-icon-menu"></i>
        <span slot="title">实时分析</span>
      </el-menu-item> -->

      <el-submenu index="6">

        <template slot="title">
          <i class="el-icon-loading"></i>
          <span>实时分析</span>
        </template>

        <el-menu-item-group>
          <template slot="title">模拟数据</template>

          <el-menu-item index="/View/main/RealTime">燃料补给车数据</el-menu-item>
          <el-menu-item index="1-2" disabled>其他模拟数据</el-menu-item>
        </el-menu-item-group>

      </el-submenu>

      <el-submenu index="2">

        <template slot="title">
          <i class="el-icon-cpu"></i>
          <span>集群服务</span>
        </template>
        <el-menu-item-group>
          <template slot="title"></template>
        <el-menu-item ><a href="http://vm0:50070 " target="_blank">&#32;HADOOP&#32;集群管理</a></el-menu-item>
        <el-menu-item ><a href="http://vm0:5050  " target="_blank">&#32;MESOS&#32;平台管理</a></el-menu-item>
        <el-menu-item ><a href="http://vm0:8080 "  target="_blank">MARATHON&#32;应用管理</a></el-menu-item>
        <el-menu-item ><a href="http://vm0:60010"  target="_blank">&#32;HBASE&#32;集群管理</a></el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <!-- <el-menu-item index="4" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item> -->
    </el-menu>
  </div>

</template>

<script>
export default {
  // 改名字
  name: 'Sideber',
  props: {
    // msg: String
  },
  data () {
    return {

      msg: 'this is MainPage!',
      state: 1

    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
    color: #000000;
    }
</style>
