<template>
  <div class="todospace">
    <BoxLayout>
      <template #header>
        <EnterInput v-model="newTodo" placeholder="添加待办事项" @enter="create" />
      </template>
      <template #main>
        <TodoList
          :data="todos"
          @select="done"
          @click="paste"
          @remove="remove"
          @edit="edit"
        />
      </template>
    </BoxLayout>
  </div>
</template>

<script>
import BoxLayout from './base/BoxLayout.vue'
import TodoList from './bussiness/TodoList.vue'
import EnterInput from './bussiness/EnterInput.vue'
import { mapMutations } from 'vuex'

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
    ...mapMutations(['pasteTodo2Work']),
    // 创建todo
    async create() {
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
    async done(item, index) {
      if (index >= 0 && index < this.todos.length) {
        const { code } = await this.$api('completeTodo', { id: item.key })
        if (code === 0) {
          this.todos.splice(index, 1);
        }
      }
    },
    // 复制到工作空间
    paste(item) {
      this.pasteTodo2Work(item.value)
    },
    async remove(item, index) {
      if (index >= 0 && index < this.todos.length) {
        const { code } = await this.$api('removeTodo', { id: item.key })
        if (code === 0) {
          this.todos.splice(index, 1);
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      }
    },
    async edit(item, index) {
      if (index >= 0 && index < this.todos.length) {
        const { code } = await this.$api('editTodo', { id: item.key, content: item.value })
        if (code === 0) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
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
