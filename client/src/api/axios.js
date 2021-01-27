import axios from 'axios'
import config from './config'
import router from '../router/index'
import store from '../store/index'

const axiosInstance = axios.create(config)

axiosInstance.interceptors.request.use(function (config) {
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

axiosInstance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {
  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  if (error.response.status === 401) {
    store.commit('logout')
    router.push({
      path: '/login'
    })
  }
  return Promise.reject(error);
});


export default axiosInstance