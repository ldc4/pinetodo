import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    pasteData: ''
  },
  mutations: {
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
