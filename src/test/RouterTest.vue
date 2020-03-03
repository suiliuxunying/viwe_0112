<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="test(Data)">routertest</button>
     <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
  </div>
</template>

<script>
export default {
  // 改名字
  name: 'tmp',
  props: {
    // msg: String
  },
  data () {
    return {

      msg: 'rutertest',
      state: 1

    }
  },
  methods: {
    test (data) {
      this.$router.push({ path: '/View/MainPage' })
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
