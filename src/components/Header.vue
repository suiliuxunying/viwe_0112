<template>
  <!--template下只能放一个组件-->
  <div class="hander">
    <el-menu router  :default-active = "$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="/View/main/MainPage" style="font-size: 20px;margin-right:0px;" >🕋  装备作战数据分析平台</el-menu-item>
      <el-menu-item index="/View/main/RealTime" >数据分析</el-menu-item>
      <el-menu-item index="/View/main/makeCurve">数据预测</el-menu-item>
      <!--<el-menu-item index="3">小区</el-menu-item>-->
      <!--<el-menu-item index="4">成交</el-menu-item>-->
      <el-menu-item index="/View/main/FileHome">文件服务</el-menu-item>

      <el-menu-item  index="user"  style="float:right;">
        <el-button type="text" @click="userTo">👨‍{{userData.avatar}}的主页</el-button>
      </el-menu-item>

      <!--disabled-->
      <!--<el-menu-item index="User"  style="float:right;"-->
      <!--&gt;用户中心</el-menu-item>-->
      <!--<div style="height:100%;float:right;">新增服务1</div>-->
      <el-submenu index="7" style="float:right;">
        <template slot="title">更多服务</template>
        <el-menu-item index="2-1">关于我们</el-menu-item>
        <el-menu-item index="2-2">意见反馈</el-menu-item>
        <el-menu-item index="2-3">联系我们</el-menu-item>
        <el-submenu index="2-4">
          <template slot="title" >新增服务</template>
          <el-menu-item index="2-4-1">服务1</el-menu-item>
          <el-menu-item index="2-4-2">服务2</el-menu-item>
          <el-menu-item index="2-4-3">服务3</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
    <div class="line"></div>
  </div>
</template>

<script>
export default {
  // props:['userData','userState'],
  name: 'Header',
  data () {
    return {
      state: false, // 0:未登录 1：登录
      activeIndex: 'MainPageMain',
      userData: {},
      userState: 1
    }
  },
  watch: {
    userState: function (val, oldVal) {
      console.log('handerGetUser:')
      console.log(val)
      if (val === 1) {
        this.$data.state = true
        this.$data.activeIndex = 'MainPageMain'
      } else if (val === 0) {
        this.$data.state = false
        this.$data.activeIndex = 'Login'
      }
    }
  },
  methods: {
    handleSelect (key, keyPath) {
      //        console.log(" keyPath key,:");
      //        console.log(keyPath);
      //        console.log(key);
      this.$data.activeIndex = key
    },
    userTo () {
      //        this.$emit('',this)
    }
  }
}
</script>
