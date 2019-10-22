<template>
  <div class="page-module login-container">
    <div class="login-panel" @keyup.enter="onSubmit">
      <div class="head-text align_center">
        <p>SIMPLE TPS</p>
      </div>
      <el-form class="login-form" size="medium" ref="form">
        <el-form-item prop="username">
          <el-input placeholder="please enter the trader id：" autofocus=""  v-model.number="loginForm.tId" />
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="please enter the password：" v-model="loginForm.tPwd" />
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

export default {
  data () {
    return {
      loginForm: {
        tId: '',
        tPwd: ''
      }
    }
  },
  methods: {
    ...mapMutations(['setToken']),
    login () {
      let _this = this
      if (this.loginForm.tId === 0 || this.loginForm.tPwd === '') {
        alert('Input cannot be empty')
      } else {
        console.log(_this.loginForm)
        this.$axios.post(`/tps/trader-login`, _this.loginForm).then(res => {
          let token = res.data.body.token
          console.log(res.data)
          if (token !== null) {
            _this.$message.success('Log In Successfully')
            _this.token = token
            _this.setToken({token: _this.token})
            // _this.$router.push({path: '/trader'})

            let storage = window.localStorage
            alert(storage.getItem('token'))

            if (this.$store.state.token) {
              this.$router.push('/trader')
              console.log(this.$store.state.token.token)
            } else {
              this.$router.replace('/login')
            }
          } else {
            let mes = res.data.message
            _this.$message.error(mes)
          }
        }).catch(function (err) {
          console.log(err)
          _this.$message.error('Error！！')
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
