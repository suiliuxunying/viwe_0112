<template>
 <div class="hello">
    <h1>{{ msg }}</h1>
    <button @click="test(Data)"></button>
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
      Data: {
        msg: '',
        state: 1
      }
    }
  },
  methods: {
    test (data) {
      alert('submit!')
      console.log(data)
    }
  },
  watch: {
    isBucketDir: function (val, oldVal) {
      console.log(val + oldVal)
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
