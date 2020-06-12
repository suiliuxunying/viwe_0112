<template>
  <div id="app">
    <router-view   />
    <!-- <router-view  style="min-height:800px;" /> -->
    <!-- <footer>为了确定页面是否正常加载 开发结束记得删</footer> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'app',
  components: {
    // HelloWorld
  },
  // 解决刷新后 vuex stete清空的问题
  created () {
    // 在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('messageStore', JSON.stringify(this.$store.state))
    })

    // 在页面加载时读取localStorage里的状态信息
    localStorage.getItem('messageStore') && this.$store.replaceState(Object.assign(this.$store.state, JSON.parse(localStorage.getItem('messageStore'))))
  }
}
</script>

<style>
body{
  margin: 0;
}
#app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  min-width: 1070px;
}
</style>
