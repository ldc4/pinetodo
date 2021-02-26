import Vue from 'vue'
import Vuex from 'vuex'
import _ from 'lodash'
import { api } from '../plugins/api'

Vue.use(Vuex)

const defaultUserInfo = {
  uid: '',
  username: '离线',
  email: '',
  phone: ''
}

const defaultSetting = {
  period: 3000,
  interval: 600,
}

export default new Vuex.Store({
  state: {
    hasLogin: false,
    userInfo: _.cloneDeep(defaultUserInfo),
    userInfoLoading: false,
    setting: _.cloneDeep(defaultSetting),
    settingLoading: false,
    pasteData: ''
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
    setSetting(state, payload = {}) {
      state.setting = Object.assign({}, state.setting, payload)
    },
    setSettingLoading(state, payload) {
      state.settingLoading = payload
    },
    pasteTodo2Work(state, payload) {
      state.pasteData = payload
    },
    clearPastData(state) {
      state.pasteData = ''
    }
  },
  actions: {
    async getUserInfo({ state, commit }) {
      const { isLogin } = state
      if (!isLogin) {
        commit('setUserInfoLoading', true)
        api('getUserInfo').then((response) => {
          const { code, data } = response
          if (code === 0) {
            const { userInfo } = data
            commit('setUserInfo', userInfo)
            commit('login')
          }
        }).finally(() => {
          commit('setUserInfoLoading', false)
        })
      }
    },
    async getSetting({ commit }) {
      commit('setSettingLoading', true)
      api('getSetting').then((response) => {
        const { code, data } = response
        if (code === 0) {
          commit('setSetting', data)
        }
      }).finally(() => {
        commit('setSettingLoading', false)
      })
    }
  },
  modules: {
  }
})
