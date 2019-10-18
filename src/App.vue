<template>
  <div id="app">
    <img src="./assets/logo.png" alt="no-image">
    <el-aside width="200px">
      <navmenu></navmenu>
    </el-aside>
  </div>
</template>

<script>
import NavMenu from '@/components/NavMenu'
export default {
  name: 'App',
  components: {
    'navmenu': NavMenu
  }
}

</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
