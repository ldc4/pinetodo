const { model, Schema } = require('../utils/mongoose')
const { ObjectID } = require('mongodb')

const schema = new Schema({
  content: String,
  createTime: Date,
  updateTime: Date,
  creator: String,
  editor: String,
  status: Number,
  property: Number
});

const Todo = model('Todo', schema);

module.exports = {
  async add(item, uid) {
    try {
      const result = await Todo.create({
        ...item,
        createTime: Date.now(),
        updateTime: Date.now(),
        creator: uid,
        editor: uid,
        status: 1,
        property: 0
      });
      return result
    } catch (e) {
      console.log('保存失败')
    }
  },
  async remove(id, uid) {
    try {
      const result = await Todo.updateOne({ '_id': ObjectID(id) }, {
        property: 1,
        updateTime: Date.now(),
        editor: uid
      });
      return result
    } catch (e) {
      console.log('删除失败')
    }
  },
  async edit(id, item, uid) {
    try {
      const result = await Todo.updateOne({ '_id': ObjectID(id) }, {
        ...item,
        updateTime: Date.now(),
        editor: uid
      });
      return result
    } catch (e) {
      console.log('修改失败')
    }
  },
  async get(id) {
    try {
      const result = await Todo.findOne({ '_id': ObjectID(id), property: { $ne: 1 } });
      return result
    } catch (e) {
      console.log('查询失败')
    }
  },
  async getWithDel(id) {
    try {
      const result = await Todo.findById(id);
      return result
    } catch (e) {
      console.log('查询失败')
    }
  },
  // 获取所有未完成的
  async getAllTodo(uid) {
    try {
      const result = await Todo.find({
        creator: uid,
        status: 1,
        property: { $ne: 1 }
      });
      return result
    } catch (e) {
      console.log('查询未完成的todo失败')
    }
  },
  // 获取所有已完成的
  async getAllCompleted(uid) {
    try {
      const result = await Todo.find({
        creator: uid,
        status: 2,
        property: { $ne: 1 }
      });
      return result
    } catch (e) {
      console.log('查询已完成的todo失败')
    }
  },
  // 完成待办
  async complete(id, uid) {
    try {
      const result = await Todo.updateOne({ '_id': ObjectID(id) }, {
        status: 2,
        updateTime: Date.now(),
        editor: uid
      });
      return result
    } catch (e) {
      console.log('完成待办失败')
    }
  },
  // 撤回待办
  async reset(id, uid) {
    try {
      const result = await Todo.updateOne({ '_id': ObjectID(id) }, {
        status: 1,
        updateTime: Date.now(),
        editor: uid
      });
      return result
    } catch (e) {
      console.log('撤回待办失败')
    }
  }
}

