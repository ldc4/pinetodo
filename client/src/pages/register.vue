<template>
  <div class="login-page">
    <div class="title">青松土豆</div>
    <div class="login-form-wrap">
      <form class="login-form" action="javascript:;">
        <div class="form-content">
          <div class="form-item">
            <input :class="{ 'login-input': true, 'has-error': error.username }" placeholder="用户名" type="text" name="username" autocomplete="off" v-model="username" @blur="validateUsername" />
            <div v-if="error.username" class="error-info">{{ error.username }}</div>
          </div>
          <div class="form-item">
            <input :class="{ 'login-input': true, 'has-error': error.password }" placeholder="密码" type="password" name="password" autocomplete="off" v-model="password" @blur="validatePassword"/>
            <div v-if="error.password" class="error-info">{{ error.password }}</div>
          </div>
          <div class="form-item">
            <input :class="{ 'login-input': true, 'has-error': error.email }" placeholder="邮箱" type="text" name="email" autocomplete="off" v-model="email" @blur="validateEmail" />
            <div v-if="error.email" class="error-info">{{ error.email }}</div>
          </div>
          <!-- <div class="form-item">
            <input class="login-input" placeholder="电话" type="text" name="phone" autocomplete="off" v-model="phone" />
          </div> -->
          <button @click="handleLoginClick" class="login-button">注册</button>
        </div>
      </form>
    </div>
    <div class="other">
      已有账号？<a href="javascript: void(0)" @click="handleRegisterClick" class="register">登陆</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Register',
  data() {
    return {
      username: '',
      password: '',
      email: '',
      phone: '',
      error: {
        username: '',
        password: '',
        email: ''
      }
    }
  },
  methods: {
    handleRegisterClick() {
      this.$router.push({
        path: 'login'
      })
    },
    handleLoginClick() {
      // 触发校验
      this.validateUsername()
      this.validatePassword()
      this.validateEmail()

      if (this.username && this.password && this.email) {
        this.$api('register', {
          username: this.username,
          password: this.password,
          email: this.email,
          phone: this.phone,
        }).then((response) => {
          const { code } = response
          if (code === 0) {
            this.$message({
              message: '注册成功',
              type: 'success'
            })
            this.$router.push({
              path: 'login'
            })
          }
        })
      }
    },
    // 校验用户名
    validateUsername() {
      this.error.username = ''
      if (!this.username) {
        this.error.username = '用户名不能为空'
        return
      }
      this.$api('checkUsername', {
        username: this.username
      }).then((response) => {
        const { code, data } = response
        if (code === 0) {
          if (data.isDuplicated) {
            this.error.username = '用户名已存在'
          }
        }
      })
    },
    // 校验密码
    validatePassword() {
      this.error.password = ''
      if (!this.password) {
        this.error.password = '密码不能为空'
        return
      }
      if (this.password.length < 6) {
        this.error.password = '密码至少6位，符号不限'
        return
      }
    },
    // 校验邮箱
    validateEmail() {
      this.error.email = ''
      if (!this.email) {
        this.error.email = '邮箱不能为空'
        return
      }
      const emailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
      if (!emailReg.test(this.email)) {
        this.error.email = '邮箱不合法'
      }
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
  height: 300px;
}
.form-item {
  height: 60px;
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
.login-input.has-error {
  border: 1px solid #e82110;
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