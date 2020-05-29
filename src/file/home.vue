<template>
  <div style="display: flex;width: 100%; height: 100%;">
    <div style="height: 100%;">
    </div>
    <div style="flex: 1; background: #fff; display: flex; flex-direction: column;">

      <tool-bar/>

      <div class="checkAll">
        <Checkbox size="large" :value="checkAll" @on-change="checkAllHandle">全选</Checkbox>
        <span>已选中{{checkedLen}}个文件/文件夹</span>
      </div>

      <Container/>

    </div>
  </div>
</template>

<script>
import ToolBar from './components/toolBar'
import Container from './components/Container1'
import { Checkbox } from 'iview'

export default {
  name: 'home',
  components: {
    Container,
    ToolBar,
    Checkbox
  },
  computed: {
    checkAll () {
      return this.$store.state.file.checkAll
    },
    checkedLen () {
      return this.$store.state.file.checkedBuffer.length
    }
  },
  methods: {
    checkAllHandle () {
      this.$store.commit('changeCheckedAll')
    }
  },
  created () {
    this.$store.commit('changeCurrentListBuffer')
  }
}
</script>

<style>
.checkAll {
  color: #020202;
  text-align: left;
  width: 100%;
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
  border-bottom: 1px solid rgb(230, 231, 236);
}
.content {
  height: 94vh;
  min-height: 650px;
}
</style>
