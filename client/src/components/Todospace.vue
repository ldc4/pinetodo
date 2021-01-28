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
          @remove="removeTodo"
          @edit="editTodo"
        />
        <div class="divider" @click="handleClickDivider">
          <span>查看已办事项</span>
          <DropdownIcon></DropdownIcon>
        </div>
        <DoneList
          v-if="showDoneList"
          :data="dones"
          @select="reset"
          @click="paste"
          @remove="removeDone"
          @edit="editDone"
        ></DoneList>
      </template>
    </BoxLayout>
  </div>
</template>

<script>
import BoxLayout from './base/BoxLayout.vue'
import TodoList from './bussiness/TodoList.vue'
import DoneList from './bussiness/DoneList.vue'
import EnterInput from './bussiness/EnterInput.vue'
import { mapMutations } from 'vuex'
import DropdownIcon from './icon/DropdownIcon.vue'

export default {
  name: 'Todospace',
  components: {
    BoxLayout,
    EnterInput,
    TodoList,
    DoneList,
    DropdownIcon
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
      ],
      dones: [],
      showDoneList: false
    }
  },
  async created() {
    const result = await Promise.all([
      this.$api('getTodoList'),
      this.$api('getDoneList')
    ])
    const { code: code0, data: data0 } = result[0]
    if (code0 === 0) {
      this.todos = data0.map((todo) => {
        return {
          key: todo._id,
          value: todo.content
        }
      }).filter(t => t.value).reverse()
    }
    const { code: code1, data: data1 } = result[1]
    if (code1 === 0) {
      this.dones = data1.map((done) => {
        return {
          key: done._id,
          value: done.content,
          checked: true
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
          const deleteArr = this.todos.splice(index, 1);
          deleteArr.forEach((item) => {
            this.dones.unshift({
              ...item,
              checked: true
            })
          })
        }
      }
    },
    // 撤回todo
    async reset(item, index) {
      if (index >= 0 && index < this.todos.length) {
        const { code } = await this.$api('resetTodo', { id: item.key })
        if (code === 0) {
          const deleteArr = this.dones.splice(index, 1);
          deleteArr.forEach((item) => {
            this.todos.unshift({
              ...item,
              checked: false
            })
          })
        }
      }
    },
    // 复制到工作空间
    paste(item) {
      this.pasteTodo2Work(item.value)
    },
    async removeTodo(item, index) {
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
    async editTodo(item, index) {
      if (index >= 0 && index < this.todos.length) {
        const { code } = await this.$api('editTodo', { id: item.key, content: item.value })
        if (code === 0) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        }
      }
    },
    async removeDone(item, index) {
      if (index >= 0 && index < this.dones.length) {
        const { code } = await this.$api('removeTodo', { id: item.key })
        if (code === 0) {
          this.dones.splice(index, 1);
          this.$message({
            message: '删除成功',
            type: 'success'
          })
        }
      }
    },
    async editDone(item, index) {
      if (index >= 0 && index < this.dones.length) {
        const { code } = await this.$api('editTodo', { id: item.key, content: item.value })
        if (code === 0) {
          this.$message({
            message: '修改成功',
            type: 'success'
          })
        }
      }
    },
    handleClickDivider() {
      this.showDoneList = !this.showDoneList
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
.divider {
  padding: 5px 0;
  font-size: 14px;
  color: #999;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}
.divider:hover {
  background: #F9F9F9;
}
</style>
