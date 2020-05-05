<template>
  <div style=" height: 100%;" >

    <el-menu

      default-active="MainPage"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      router
      >
      <el-menu-item index="MainPage">主页</el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>数据分析</span>
        </template>
        <el-menu-item index="RealTime">实时数据</el-menu-item>
        <el-menu-item-group>
          <template slot="title">本地数据</template>
          <el-menu-item index="makeCurve">曲线绘制</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="MainPage">主页</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">选项4</template>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="3">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
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
