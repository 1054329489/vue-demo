<template>
  <div class="page-module login-container">
    <div class="login-panel" @keyup.enter="onSubmit">
      <div class="head-text align_center">
        <p>SIMPLE TPS</p>
      </div>
      <el-form class="login-form" size="medium" ref="form">
        <el-form-item prop="username">
          <el-input placeholder="请输入账户名：" autofocus=""  v-model="loginForm.username" />
          <!--  -->
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="请输入账户密码：" v-model="loginForm.password" />
          <!--   -->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="login-btn" icon="el-icon-check" @click="login"  />
          <!-- :loading="submitLoad" -->
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
// import asios from 'asios';

export default {
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      }
    }
  },

  methods: {
    ...mapMutations(['changeLogin']),
    login () {
      let _this = this
      if (this.loginForm.username === '' || this.loginForm.password === '') {
        alert('账号或密码不能为空')
      } else {
        this.$ajax({
          method: 'post',
          url: '/user/login',
          data: _this.loginForm
        }).then(res => {
          console.log(res.data)
          _this.userToken = 'Bearer ' + res.data.data.body.token
          // 将用户token保存到vuex中
          _this.changeLogin({ Authorization: _this.userToken })
          _this.$router.push('/home')
          alert('登陆成功')
        }).catch(error => {
          alert('账号或密码错误')
          console.log(error)
        })
      }
    }
  }
}
</script>

<style>
  .login-container {
    min-height: 100vh;
    align-items: center;
    background-image: url(./images/login_body.jpg);
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display:flex;
    justify-content:center;

  }
  .login-panel {
    padding: 25px 15px;
    width: 350px;
    border-radius: 3px;
    margin:0 auto;
    text-align:center;
    background-color:rgba(255, 255, 255, 0.781);
  }
  .head-text {
    margin-bottom: 25px;
  }
  .login-btn{
    width: 75%;
  }

</style>
