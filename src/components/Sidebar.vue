<template>
  <div style=" height: 100%;" >

    <el-menu

      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      router
      :default-active = "$route.path"
      >
      <el-menu-item index="/View/main/MainPage">主页</el-menu-item>

      <el-menu-item index="/View/main/RealTime">实时数据</el-menu-item>

      <el-menu-item index="/View/main/makeCurve">曲线绘制</el-menu-item>

      <el-submenu index="1">

        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数据分析</span>
        </template>

        <el-menu-item index="/View/main/RealTime/">实时日志收集</el-menu-item>

        <el-menu-item-group>
          <template slot="title">本地数据处理</template>

          <el-menu-item index="/View/main/makeCurve/">曲线绘制</el-menu-item>

          <el-menu-item index="1-2">数据预测</el-menu-item>

        </el-menu-item-group>

        <el-menu-item-group title="">
          <template slot="title">其他</template>
          <el-menu-item index="MainPage/">去掉"/"</el-menu-item>

        </el-menu-item-group>

      </el-submenu>

      <el-menu-item index="/View/main/FileHome/BucketList">
        <i class="el-icon-menu"></i>
        <span slot="title">文件服务</span>
      </el-menu-item>

      <el-submenu index="2">

        <template slot="title">
          <i class="el-icon-location"></i>
          <span>集群服务</span>
        </template>

        <el-menu-item ><a href="http://vm0:50070" target="_blank">hadoop</a></el-menu-item>
        <el-menu-item ><a href="http://vm0:5050" target="_blank">mesos</a></el-menu-item>
        <el-menu-item ><a href="http://vm0:8080" target="_blank">marathon</a></el-menu-item>
        <el-menu-item ><a href="http://vm0:60010" target="_blank">hbase</a></el-menu-item>

      </el-submenu>

      <el-menu-item index="4" disabled>
        <i class="el-icon-document"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="5">
        <i class="el-icon-setting"></i>
        <span slot="title">导航四</span>
      </el-menu-item>
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

</style>
