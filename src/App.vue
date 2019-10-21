<template>
  <div id="app">
    <img src="./assets/logo.png" alt="no-image">
    <div>
      <router-view></router-view>
      <!--    <div>-->
      <!--      <router-link to="/HelloWorld">HelloWorld</router-link>-->
      <!--      <router-link to="/NavMenu">NavMenu</router-link>-->
      <!--    </div>-->
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
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
