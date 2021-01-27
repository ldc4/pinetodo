<template>
  <div class="login-page">
    <div class="title">青松土豆</div>
    <div class="login-form-wrap">
      <form class="login-form" action="javascript:;">
        <div class="form-content">
          <input class="login-input" placeholder="用户名" type="text" name="username" autocomplete="off" v-model="username" />
          <input class="login-input" placeholder="密码" type="password" name="password" autocomplete="off" v-model="password" />
          <div v-if="error" class="error-info">{{error}}</div>
          <button @click="handleLoginClick" class="login-button">登陆</button>
        </div>
      </form>
    </div>
    <div class="other">
      <a href="javascript: void(0)" @click="handleRegisterClick" class="register">注册账号</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    handleRegisterClick() {
      this.$router.push({
        path: 'register'
      })
    },
    handleLoginClick() {
      this.$api('login', {
        username: this.username,
        password: this.password
      }).then((response) => {
        const { code, data } = response
        if (code === 0) {
          const { isLogin, userInfo } = data
          if (isLogin) {
            this.$message({
              message: '登陆成功',
              type: 'success'
            })
            this.$store.commit('setUserInfo', userInfo)
            this.$store.commit('login')
            this.$router.push({
              path: '/'
            })
          } else {
            this.error = '用户名或密码错误'
          }
        } else {
          this.error = '登陆失败，请稍后再试'
        }
      })
    }
  }
}
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.title {
  margin: 50px 0 25px;
  font-size: 24px;
}
.form-content {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 180px;
}
.login-input {
  background-color: #FFF;
  border: 1px solid #d6d6d6;
  padding: 9px 10px 10px;
  width: 300px;
  color: #333;
  transition: color .5s,box-shadow .5s,background-color .5s;
  outline: 0;
  box-sizing: border-box;
  border-radius: 4px;
}
.login-button {
    font-size: 18px;
    line-height: 25px;
    height: 40px;
    box-sizing: border-box;
    -webkit-appearance: none;
    padding: 5px 40px 6px;
    background: #4b9e22;
    color: #FFF;
    border: 1px solid #63a044;
    text-shadow: 0 -1px 0 #63a044;
    border-radius: 4px;
    width: 300px;
}
.other {
  margin-top: 30px;
  width: 300px;
}
.register {
  color: #4b9e22;
  text-decoration: none;
}
.error-info {
  padding: 5px;
  text-align: left;
  font-size: 12px;
  color: #e82110;
}
</style>