const { model, Schema } = require('../utils/mongoose')
const { ObjectID } = require('mongodb')

const schema = new Schema({
  content: String,
  createTime: Date,
  updateTime: Date,
  creator: String,
  editor: String,
});

const Todo = model('Todo', schema);

module.exports = {
  async add(item) {
    try {
      const result = await Todo.create({
        ...item,
        createTime: Date.now(),
        updateTime: Date.now(),
        creator: '',
        editor: ''
      });
      return result
    } catch (e) {
      console.log('保存失败')
    }
  },
  async remove(id) {
    try {
      const result = await Todo.remove({ '_id': ObjectID(id) });
      return result
    } catch (e) {
      console.log('删除失败')
    }
  },
  async edit(id, item) {
    try {
      const result = await Todo.update({ '_id': ObjectID(id) }, {
        ...item,
        updateTime: Date.now(),
        editor: ''
      });
      return result
    } catch (e) {
      console.log('修改失败')
    }
  },
  async get(id) {
    try {
      const result = await Todo.findById(id);
      return result
    } catch (e) {
      console.log('查询失败')
    }
  },
  async getAll() {
    try {
      const result = await Todo.find({});
      return result
    } catch (e) {
      console.log('查询失败')
    }
  },
}
