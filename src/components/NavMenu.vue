<template>
  <div>
    <div class="containerWrapper">
      <div class="sidebarWrapper">
        <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="collapseStatus">
          <el-menu-item index="0">
            <i class="el-icon-menu"></i>
            <span slot="title">Trader WorkStation</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-price-tag"></i>
              <span slot="title">Trader Leg</span>
            </template>
            <el-menu-item-group title="Leg Detail">
<!--              change into matched and pending-->
              <el-menu-item index="/inputForm" @click="goTo('/inputForm')">Matched Lag</el-menu-item>
              <el-menu-item index="/trader"  @click="goTo('/trader')">Pending Leg</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </div>
      <div class="contentWrapper">
        <div class="mainHeader">
          <!--nav collapse control-->
          <span><i class="el-icon-s-fold" @click="handleFold()"></i></span>
          <div class="userCenter">
            <el-dropdown trigger="hover">
              <el-link :underline="false" class="username">Hello, Trader</el-link>
              <el-avatar :size="40" :src="avaUrl"></el-avatar>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="logout()">
                  LOG OUT
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <div class="mainContent">
          <router-view />
        </div>
      </div>
    </div>

  </div>

</template>



<script>
  export default {
    name: 'MavMenu',
    data () {
      return {
        isCollapse: false,
        collapseStatus: false,
        avaUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
      }
    },
    methods: {
      handleOpen (key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose (key, keyPath) {
        console.log(key, keyPath)
      },
      handleFold () {
        this.collapseStatus = !this.collapseStatus
      },
      goTo (path) {
        this.$router.replace(path)
      },
      logout(){
        this.$store.commit('delToken')
        this.$router.replace({
          path: '/login',
          query: {redirect: this.$router.currentRoute.fullPath}
        })
      }

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .containerWrapper{
    display: flex;
    flex-direction: row;
  }
  .sidebarWrapper{
    min-height: 100vh;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 250px;
    height: 100%;
  }
  .el-menu--collapse{
    height: 100%;
  }
  .indexPage .el-aside{
    width: 300px;
    overflow-x: hidden;
    overflow-y: hidden;
  }
  .contentWrapper{
    flex: 1;
    min-height: 100vh;
  }
  .mainHeader{
    height: 56px;
    padding: 0 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .mainContent{
    padding: 0 10px;
    background: #F0F2F5;
    height: 100%;
  }
  .userCenter{
    display: flex;
    align-items: center;
  }
  .userCenter .username{
    margin-right: 15px;
  }
</style>






