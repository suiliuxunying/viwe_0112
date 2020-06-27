<template>
  <div class="main">

     <el-card :body-style="{ padding: '0px' }" shadow="hover" v-for="item in ClusterList" :key="item.name" class="item" >
      <img :src="item.path" class="image">
      <div style="padding: 14px;">
        <div class="bottom clearfix">
          <el-button type="text" class="button">
            <router-link :to="{path:'/View/main/clusteritem', query:{port:item.port,type:item.host}}">
              {{'点击打开  '+ item.name +'  管理界面'}}
            </router-link>
          </el-button>
        </div>
      </div>
    </el-card>

    <!-- <el-card shadow="hover" v-for="o in 10" :key="o" class="item">
      <i class="el-icon-s-platform"></i>
      <router-link :to="{path:'/View/main/ositem', query:{id:o,type:'node'}}">{{'点击开始控制物理节点'+o+''}}</router-link>
     </el-card> -->

  </div>
</template>
<script>
// import IFrame from '@/IFrame/IFrame.vue'
export default {
  name: 'ClusterPage',
  // components: { IFrame },
  data () {
    return {
      ClusterList: [
        { host: 'mesos', port: '5050', name: 'MESOS', path: require('../assets/cluster/mesos.png') },
        { host: 'marathon', port: '8080', name: 'MARATHON', path: require('../assets/cluster/marathon.png') },
        { host: 'marathonlb.com', port: '9090/haproxy?stats', name: 'MBL', path: require('../assets/cluster/marathonlb.png') },
        { host: 'hadoop', port: '50070', name: 'HADOOP', path: require('../assets/cluster/hadoop.png') },
        { host: 'hbase', port: '60010', name: 'HBASE', path: require('../assets/cluster/hbase.png') }

      ]
    }
  },
  mounted () {

  }
}
</script>
<style scoped>
.item {
    margin:10px 20px;
}
img {
border-style: ridge;
    width: 100%;
    height: 150px;
    border: 2px solid;
    border-color: #3e444e69;
}
</style>
