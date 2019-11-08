export default {
  getTodoList: {
    label: '获取待办列表',
    url: '/todospace/getTodoList',
    method: 'get'
  },
  addTodo: {
    label: '添加待办事项',
    url: '/todospace/addTodo',
    method: 'post'
  },
  removeTodo: {
    label: '完成待办事项',
    url: '/todospace/removeTodo',
    method: 'post'
  }
}