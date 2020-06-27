<template>
  <div class="main">
   <IFrame style="width:100%; height: 100vh;"/>
  </div>
</template>
<script>
import IFrame from '@/IFrame/IFrame.vue'
export default {
  name: 'VMPage',
  components: { IFrame },
  data () {
    return {

    }
  },
  beforeCreate () {
    // this.$store.state.iframe.iframeUrl = 'http://marathonlb.com:10005/vnc.html?path=websockify/?token=' + this.$route.query.type + ('' + this.$route.query.id - 1)
    this.$store.commit('setIFrameUrl', 'http://maas:5240')
  }
}
</script>
