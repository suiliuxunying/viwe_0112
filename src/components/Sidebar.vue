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

      <el-menu-item index="/View/main/MainPage3">
        <i class="el-icon-s-home"></i>
        <span slot="title">数据分析平台主页</span>
      </el-menu-item>

      <!-- /View/main/fileOperate -->
      <el-submenu index="6">

        <template slot="title">
          <i class="el-icon-menu"></i>
          <span>异构数据存储模块</span>
        </template>
         <el-menu-item index="/View/main/fileSearch">
        <i class="el-icon-zoom-in"></i>
        <span slot="title">文件检索</span>
      </el-menu-item>
        <el-menu-item-group>
          <el-menu-item index="/View/main/FileHome/BucketList">
            <i class="el-icon-files"></i>
            文件库列表</el-menu-item>
          <el-menu-item index="/View/main/FileHome/File" disabled>
            <i class="el-icon-document-copy"></i>
            &#8194;&#8194;文件子表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <!-- <el-menu-item index="/View/main/makeCurve">
        <i class="el-icon-c-scale-to-original"></i>
        <span slot="title">数据分析</span>
      </el-menu-item> -->

      <!--<el-menu-item index="/View/main/RealTime">
        <i class="el-icon-menu"></i>
        <span slot="title">实时分析</span>
      </el-menu-item> -->

      <el-submenu index="9">

        <template slot="title">
          <i class="el-icon-cpu"></i>
          <span>数据挖掘分析模块</span>
        </template>
         <el-menu-item-group>
          <template slot="title">
             <i class="el-icon-cpu"></i>
            离线数据处理
          </template>
          <el-menu-item index="/View/main/fileImport">
            <!-- <i class="el-icon-upload2"></i> -->
            <span slot="title">
              离线数据导入</span>
           </el-menu-item>
          <el-menu-item index="/View/main/makeCurve">补给车日志分析</el-menu-item>
          <el-menu-item index="2-2" disabled>其他离线模拟数据</el-menu-item>
          <!-- <el-menu-item index="2-32" disabled>。。。。。。。。。</el-menu-item> -->
        </el-menu-item-group>

        <el-menu-item-group>
          <template slot="title">
             <i class="el-icon-loading"></i>
            实时数据处理</template>
          <el-menu-item index="/View/main/RealTime">燃料补给车数据</el-menu-item>
          <el-menu-item index="1-2" disabled>其他模拟数据</el-menu-item>
        </el-menu-item-group>

      </el-submenu>

      <el-submenu index="2">

        <template slot="title">
          <i class="el-icon-c-scale-to-original"></i>
          <span>集群配置管理模块</span>
        </template>
          <el-menu-item index="/View/main/clusterpage">
            <!-- <i class="el-icon-c-scale-to-original"></i> -->
              <span slot="title">集群控制主页</span>
          </el-menu-item>
          <el-menu-item index="/View/main/clusteritem" disabled>
            <!-- <i class="el-icon-set-up"></i> -->
              <span >集群控制子页</span>
          </el-menu-item>
        <!-- <el-menu-item-group>
      <template slot="title"></template>
        <el-menu-item ><a href="http://hadoop:50070 " target="_blank">&#32;HADOOP&#32;集群管理</a></el-menu-item>
        <el-menu-item ><a href="http://mesos:5050  " target="_blank">&#32;MESOS&#32;平台管理</a></el-menu-item>
        <el-menu-item ><a href="http://marathon:8080 "  target="_blank">MARATHON&#32;应用管理</a></el-menu-item>
        <el-menu-item ><a href="http://hbase:60010"  target="_blank">&#32;HBASE&#32;集群管理</a></el-menu-item>
        <el-menu-item ><a href="http://marathonlb.com:9090/haproxy?stats"  target="_blank">&#32;MLB&#32;应用状态</a></el-menu-item>
        </el-menu-item-group> -->
      </el-submenu>

      <el-submenu index="3">

        <template slot="title">
          <i class="el-icon-monitor"></i>
        <span slot="title">操作系统控制模块</span>
        </template>
          <el-menu-item index="/View/main/ospage">
            <!-- <i class="el-icon-c-scale-to-original"></i> -->
              <span slot="title">节点选择页</span>
          </el-menu-item>
          <el-menu-item index="/View/main/ositem" disabled>
            <!-- <i class="el-icon-set-up"></i> -->
              <span >操作系统控制页</span>
          </el-menu-item>
      </el-submenu>

      <!-- <el-menu-item index="/View/main/ospage">
        <i class="el-icon-monitor"></i>
        <span slot="title">操作系统控制模块</span>
      </el-menu-item> -->

       <el-menu-item index="/View/main/vmpage">
        <i class="el-icon-set-up"></i>
        <span slot="title">虚拟节点管理模块</span>
      </el-menu-item>
     <el-menu-item index="/View/main/user" >
        <i class="el-icon-document"></i>
        <span slot="title">安全访问控制模块</span>
      </el-menu-item>
       <!--
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
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
a {
    color: #000000;
    }
  .el-menu-item.is-disabled {
    opacity: 1;
    cursor: not-allowed;
    background: 0 0!important;
}
</style>
