import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'

Vue.use(Vuex)

const defaultUserInfo = {
  uid: '',
  username: '离线',
  email: '',
  phone: ''
}

export default new Vuex.Store({
  state: {
    hasLogin: false,
    userInfo: _.cloneDeep(defaultUserInfo),
    userInfoLoading: false,
    pasteData: '',
    timePeriod: 3000
  },
  mutations: {
    login(state) {
      state.hasLogin = true
    },
    logout(state) {
      state.hasLogin = false
      state.userInfo = _.cloneDeep(defaultUserInfo)
    },
    setUserInfo(state, payload = {}) {
      state.userInfo = Object.assign({}, state.userInfo, payload)
    },
    setUserInfoLoading(state, payload) {
      state.userInfoLoading = payload
    },
    pasteTodo2Work(state, payload) {
      state.pasteData = payload
    },
    clearPastData(state) {
      state.pasteData = ''
    }
  },
  actions: {
  },
  modules: {
  }
})
