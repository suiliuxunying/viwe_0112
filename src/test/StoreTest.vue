<template>
 <div class="hello">
     <h1>{{storeGetter}}</h1>
    <h1>{{StoreName}}</h1>
    <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
  </div>
</template>

<script>
export default {
  // 改名字
  name: 'StoreTest',
  props: {
    // msg: String
  },
  data () {
    return {
      Data: {
        msg: '1',
        state: 1
      }
    }
  },
  computed: {
    StoreName () {
      return this.$store.state.test.name
    },
    storeGetter () {
      return this.$store.getters.nameString
    }
  },
  mounted () {
    console.log(this.$store)
  },
  methods: {
    test (data) {
      alert('submit!')
      console.log(data)
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
