import Vue from 'vue';
import './css/style.less';

new Vue({
  el: '#root',
  data: {
    newTodo: null,  // 待录入的新todo
    index: 0,       // 新加的索引
    todos: [
      // {
      //   key: 'x',
      //   value: 'sth. to do',
      //   order: 1,
      //   createTime: Date.now(),
      // }
    ]
  },
  methods: {
    // 创建todo
    create: function() {
      this.todos.unshift({
        key: this.index++,
        value: this.newTodo,
      });
      this.newTodo = '';
    },
    // 完成todo
    done: function(index) {
      if (index >= 0 && index < this.todos.length) {
        this.todos.splice(index, 1);
      }
    }
  }
});
