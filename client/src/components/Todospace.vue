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
      todos: [
        // {
        //   key: 'x',
        //   value: 'sth. to do',
        // }
      ]
    }
  },
  async created() {
    const { code, data } = await this.$api('getTodoList')
    if (code === 0) {
      this.todos = data.map((todo) => {
        return {
          key: todo._id,
          value: todo.content
        }
      }).filter(t => t.value).reverse()
    }
  },
  methods: {
    // 创建todo
    create: async function() {
      if (this.newTodo) {
        const { code, data } = await this.$api('addTodo', { content: this.newTodo })
        if (code === 0) {
          this.todos.unshift({
            key: data._id,
            value: data.content,
          });
          this.newTodo = '';
        }
      }
    },
    // 完成todo
    done: async function(item, index) {
      if (index >= 0 && index < this.todos.length) {
        const { code } = await this.$api('removeTodo', { id: item.key })
        if (code === 0) {
          this.todos.splice(index, 1);
        }
      }
    }
  }
}
</script>

<style scoped>
.todospace {
  min-width: 27em;
  width: 50%;
  float: left;
}
.todospace::after {
  display:block; 
  content:"clear"; 
  clear:both; 
  line-height:0;
  visibility:hidden;
}
</style>
