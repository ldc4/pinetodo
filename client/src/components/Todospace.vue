<template>
  <div class="todospace">
    <BoxLayout>
      <template #header>
        <EnterInput v-model="newTodo" placeholder="添加待办事项" @create="create" />
      </template>
      <template #main>
        <TodoList :data="todos" @click="done" />
      </template>
    </BoxLayout>
  </div>
</template>

<script>
import BoxLayout from './base/BoxLayout.vue'
import TodoList from './bussiness/TodoList.vue'
import EnterInput from './bussiness/EnterInput.vue'

export default {
  name: 'Todospace',
  components: {
    BoxLayout,
    EnterInput,
    TodoList
  },
  props: {
    msg: String
  },
  data: function() {
    return {
      newTodo: '',
      index: 0,       // 新加的索引
      todos: [
        // {
        //   key: 'x',
        //   value: 'sth. to do',
        //   order: 1,
        //   createTime: Date.now(),
        // }
      ]
    }
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
}
</script>

<style scoped>

</style>
