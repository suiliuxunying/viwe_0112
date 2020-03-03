<template>
 <div class="hello">
     <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
    <h1>{{ msg }}</h1>
    <el-button @click="test(Data)">AxiosPackageTest</el-button>
    <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  // 改名字
  name: 'AxiosPackageTest',
  props: {
    // msg: String
  },
  data () {
    return {
      msg: 'AxiosPackageTest',
      Data: {
        msg: 'ww',
        state: 1
      }
    }
  },
  methods: {
    test (Data) {
      console.log(Data)
      const _this = this// 很重要！！
      login(Data).then(response => {
        _this.msg = response
      }).catch(error => {
        _this.msg = error
      })
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
