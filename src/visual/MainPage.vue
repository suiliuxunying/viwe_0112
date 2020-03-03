<template>
 <div class="page">
    <h1>{{ msg }}</h1>
    <button @click="test(Data)">main</button>
  </div>
</template>

<script>
export default {
  // 改名字
  name: 'MainPage',
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
