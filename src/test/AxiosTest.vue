<template>
 <div class="hello">
    <h1>{{ msg }}</h1>
    <el-button @click="test(Data)">Axios</el-button>
     <el-divider><i class="el-icon-mobile-phone"></i></el-divider>
  </div>
</template>

<script>
import Axios from 'axios'
export default {
  // 改名字
  name: 'AxiosTest',
  props: {
    // msg: String
  },
  data () {
    return {
      msg: 'Axios',
      Data: {
        type: 'sucses',
        data: {
          userId: '1'
        }
      }
    }
  },
  methods: {
    test (Data) {
      console.log(Data)
      const _this = this// 很重要！！
      Axios({
        method: 'post',
        baseURL: '/api',
        url: '/test',
        data: Data
      })
        .then(function (response) {
          console.log(response)
          //   这样修改data()中的数据
          _this.msg = response
        })
        .catch(function (error) {
          console.log('error:')
          console.log(error)
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
