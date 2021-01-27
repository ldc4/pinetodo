export default {
  login: {
    label: '登陆',
    url: '/auth/login',
    method: 'post'
  },
  register: {
    label: '注册',
    url: '/auth/register',
    method: 'post'
  },
  checkUsername: {
    label: '检查用户名',
    url: '/auth/checkUsername',
    method: 'get'
  },
  getUserInfo: {
    label: '获取用户信息',
    url: '/user/getUserInfo',
    method: 'get'
  },
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
  editTodo: {
    label: '编辑待办事项',
    url: '/todospace/editTodo',
    method: 'post'
  },
  completeTodo: {
    label: '完成待办事项',
    url: '/todospace/completeTodo',
    method: 'post'
  },
  removeTodo: {
    label: '删除待办事项',
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
  },
  editRecord: {
    label: '编辑工作记录',
    url: '/workspace/editRecord',
    method: 'post'
  },
  removeRecord: {
    label: '删除工作记录',
    url: '/workspace/removeRecord',
    method: 'post'
  }
}