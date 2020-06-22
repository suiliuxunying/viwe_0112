<template>
  <div class="main">
    <el-collapse v-model="activeNames">
      <el-collapse-item name="1">
         <template slot="title">
          <h4>虚拟节点控制入口：</h4><i class="header-icon el-icon-info"></i>
        </template>
        <el-card shadow="hover" v-for="o in 20" :key="o" class="item">
          <i class="el-icon-copy-document"></i>
          <router-link :to="{path:'/View/main/ositem', query:{id:o,type:'vm'}}"> {{'点击开始控制虚拟节点'+o+''}}</router-link>
        </el-card>
        <div style="height:10px;width:100%;float: left;"></div>
      </el-collapse-item>
      <el-collapse-item name="2">
        <template slot="title">
          <h4>物理节点控制入口：</h4><i class="header-icon el-icon-info"></i>
        </template>
        <el-card shadow="hover" v-for="o in 10" :key="o" class="item">
          <i class="el-icon-s-platform"></i>
           <router-link :to="{path:'/View/main/ositem', query:{id:o,type:'node'}}">{{'点击开始控制物理节点'+o+''}}</router-link>
        </el-card>
         <div style="height:10px;width: 100%;float: left;"></div>
      </el-collapse-item>
      <!-- <el-collapse-item title="效率 Efficiency" name="3">
      </el-collapse-item> -->
    </el-collapse>
   <!-- <IFrame style="width:100%; height: 100vh;"/> -->
  </div>
</template>
<script>
// import IFrame from '@/IFrame/IFrame.vue'
export default {
  name: 'OSPage',
  // components: { IFrame },
  data () {
    return {
      activeNames: ['2']
    }
  },
  mounted () {
    this.$store.state.iframe.iframeUrl = 'http://marathonlb.com:10005/vnc.html?path=websockify/?token=vm1'
  }
}
</script>
<style scoped>
.item {
    margin: 20px 0 0px 1.5%;
    float: left;
    width: 23%;
}
h4{
  margin-left: 20px;
}
</style>
