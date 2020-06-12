<template>
 <div class="page" style=" height: 100%;" >
    <Header/>
    <div class="container">
        <el-row :gutter="20" style="margin-left: 0px; margin-right: 0px;">
            <el-col :span="5"><div class="left grid-content bg-purple">

                <Sideber style=" height: 100%;"/>

            </div></el-col>
            <el-col :span="19" ><div class="right grid-content bg-purple">
                 <router-view style=" height: 100%;"/>
            </div>
            </el-col>
        </el-row>
    </div>

  </div>
</template>

<script>
import Header from './Header'
import Sideber from '../components/Sidebar'
export default {
  // 改名字
  name: 'Main',
  props: {
    // msg: String
  },
  components: {
    Header,
    Sideber
  },
  data () {
    return {
      activeIndex: '1',
      activeIndex2: '1',
      msg: 'this is MainPage!',
      state: 1

    }
  },
  methods: {
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/* 顶部导航栏靠右 */
.el-menu--horizontal>.el-menu-item {
    float: right;
}
.el-menu--horizontal>.el-submenu {
    float: right;
}
.right {
  margin: 10px auto 10px auto;
}
/* 顶部导航栏边距 */
.el-menu--horizontal {
    border-right: solid 20px #fff0;
    border-left: solid 20px #fff0;
}
.el-menu--horizontal>.titel {
    color: #09abe1;
    float: left;
    font-size: 19px;
    font-family: serif;
    line-height: 60px;
    margin-left: 25px;
    letter-spacing:3px;
    border-bottom-color: transparent;
    font-weight: 600;
}
</style>
