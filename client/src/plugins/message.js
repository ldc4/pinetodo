import Message from '../components/base/Message.vue';

export default {
  install(Vue) {
    const MessageConstructor = Vue.extend(Message);
    let messageInstance;
    let message = function(options = {}) {
      messageInstance = new MessageConstructor({
        data: options,
      });
      document.body.appendChild(messageInstance.$mount().$el);
    }
    Vue.prototype.$message = message
  }
}