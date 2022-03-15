<template>
  <header class="header">
    <div class="name">
      <h1>青松土豆</h1>
    </div>
    <div class="year">
      <YearPicker />
    </div>
    <div class="user">
      <div v-if="!userInfoLoading">
        <div v-if="!hasLogin" class="login">
          <a class="login-button" @click="handleLogin">登陆</a>
        </div>
        <div v-else class="userinfo" ref="userinfo">
          <div class="username" @click="handleUsernameClick">
            <span>{{userInfo.username}}</span>
            <div class="dropdown-icon">
              <DropdownIcon></DropdownIcon>
            </div>
          </div>
          <ul v-if="showDropdown" class="dropdown">
            <!-- <li class="dropdown-item">个人信息</li> -->
            <li class="dropdown-item" @click="handleSetting">设置</li>
            <li class="dropdown-item" @click="handleLogout">登出</li>
          </ul>
        </div>
      </div>
      <LoadingIcon class="loading" v-else></LoadingIcon>
    </div>
    <SettingDialog :visible.sync="showDialog"></SettingDialog>
  </header>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import LoadingIcon from './icon/LoadingIcon'
import DropdownIcon from './icon/DropdownIcon'
import SettingDialog from './bussiness/SettingDialog.vue'
import YearPicker from './bussiness/YearPicker.vue'


export default {
  name: 'Header',
  props: {
    msg: String
  },
  components: {
    LoadingIcon,
    DropdownIcon,
    SettingDialog,
    YearPicker,
  },
  data() {
    return {
      showDropdown: false,
      showDialog: false,
    }
  },
  computed: {
    ...mapState([
      'hasLogin',
      'userInfo',
      'userInfoLoading'
    ])
  },
  created() {
    this.getUserInfo()
    this.getSetting()
  },
  mounted() {
    window.addEventListener("click", this.handleWindowClick);
  },
  beforeDestroy() {
    window.removeEventListener('click', this.handleWindowClick);
  },
  methods: {
    ...mapActions([
      'getUserInfo',
      'getSetting'
    ]),
    handleLogin() {
      this.$router.push({
        path: '/login'
      })
    },
    handleLogout() {
      this.$store.commit('logout')
      this.$router.push({
        path: '/login'
      })
    },
    handleUsernameClick() {
      this.showDropdown = !this.showDropdown
    },
    handleWindowClick(e) {
      if (this.$refs['userinfo'] && e.target) {
        if (!this.$refs['userinfo'].contains(e.target)) {
          this.showDropdown = false
        }
      }
    },
    handleSetting() {
      this.showDropdown = false
      this.showDialog = true
    }
  }
}
</script>

<style scoped>
.header {
  height: 48px;
  font-size: 14px;
  box-shadow: #FFF 0 1px 0;
  width: auto;
  max-width: 960px;
  margin: 0 auto 20px;
  border-bottom: 1px solid #DDD;
}
.name {
  font-size: 22px;
  line-height: 48px;
  font-weight: 700;
  float: left;
  margin: 0;
}
.year {
  float: left;
  margin-left: 5px;
  line-height: 48px;
  display: flex;
  align-items: center;
}
.user {
  float: right;
  height: 48px;
  display: flex;
  align-items: center;
}
.login {
  display: flex;
}
.login-button {
	position: relative;
	z-index: 0;
	width: 50px;
	height: 30px;
  line-height: 1.5;
	border-radius: 8px;
	overflow: hidden;
  padding: 5px;
  cursor: pointer;
}
.login-button::before {
  content: '';
  position: absolute;
  z-index: -2;
  left: -50%;
  top: -50%;
  width: 200%;
  height: 200%;
  background-color: #399953;
  background-repeat: no-repeat;
  background-size: 50% 50%, 50% 50%;
  background-position: 0 0, 100% 0, 100% 100%, 0 100%;
  background-image: linear-gradient(#fbb300, #fbb300), linear-gradient(#399953, #399953), linear-gradient(#d53e33, #d53e33), linear-gradient(#377af5, #377af5);
  animation: rotate 4s linear infinite;
}
.login-button::after {
  content: '';
  position: absolute;
  z-index: -1;
  left: 3px;
  top: 3px;
  width: calc(100% - 6px);
  height: calc(100% - 6px);
  background: white;
  border-radius: 5px;
}
@keyframes rotate {
	100% {
		transform: rotate(1turn);
	}
}
.userinfo {
  position: relative;
  margin-right: 10px;
  margin-top: 20px;
  padding-bottom: 20px;
}
.loading {
  margin-right: 10px;
}
.dropdown {
  position: absolute;
  top: 20px;
  right: 0;
  min-width: 100px;
  text-align: left;
  z-index: 99999;
  padding: 5px 0;
  margin: 2px 0 0;
  list-style: none;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 2px;
  box-shadow: 0 2px 4px rgba(0,0,0,.175);
}
.dropdown .dropdown-item {
  padding: 5px 10px;
  cursor: pointer;
}
.dropdown .dropdown-item:hover {
  background: #f4f4f4;
}
.dropdown-icon {
  height: 16px;
  width: 16px;
}
.username {
  display: flex;
  cursor: pointer;
  align-items: center;
}
</style>
