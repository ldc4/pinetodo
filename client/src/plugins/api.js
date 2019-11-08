import _ from 'lodash'
import axios from '../api/axios'
import apiConfig from '../api/api'


export default {
  install(Vue) {
    Vue.prototype.$api = function(apiName, data = {}) {
      // 1. 检查接口是否提供
      const keys = Object.keys(apiConfig)
      if (keys.indexOf(apiName) === -1) {
        return Promise.reject({ message: `接口${apiName}不存在` })
      }
      // 2. 构造请求配置
      const config = _.extend({}, apiConfig[apiName])
      if (data instanceof Object) {
        const method = config.method ? config.method.toUpperCase() : 'GET'
        if (['PUT', 'POST', 'PATCH'].indexOf(method) !== -1) {
          config.data = _.extend({}, config.data || {}, data || {})
        } else {
          config.params = _.extend({}, config.params || {}, data || {})
        }
      }
      // 3. 发起请求，规范响应
      return axios.request(config).then((response) => {
        return response.data
      })
    }
  }
}