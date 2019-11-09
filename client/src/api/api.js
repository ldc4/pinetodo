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
  },
  getRecordList: {
    label: '获取记录列表',
    url: '/workspace/getRecordList',
    method: 'get'
  },
  addRecord: {
    label: '添加工作记录',
    url: '/workspace/addRecord',
    method: 'post'
  }
}