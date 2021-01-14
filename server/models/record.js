const { model, Schema } = require('../utils/mongoose')
const { ObjectID } = require('mongodb');
const { getWithDel } = require('./todo');

const schema = new Schema({
  content: String,
  period: Number,
  startTime: Number,
  completeTime: Number,
  endTime: Number,
  createTime: Date,
  updateTime: Date,
  creator: String,
  editor: String,
  property: Number,
});

const Record = model('Record', schema);

module.exports = {
  async add(item) {
    try {
      const result = await Record.create({
        ...item,
        createTime: Date.now(),
        updateTime: Date.now(),
        creator: '',
        editor: '',
        property: 0,
      });
      return result
    } catch (e) {
      console.log('保存失败')
    }
  },
  async remove(id) {
    try {
      const result = await Record.update({ '_id': ObjectID(id) }, {
        property: 1,
        updateTime: Date.now(),
        editor: ''
      });
      return result
    } catch (e) {
      console.log('删除失败')
    }
  },
  async edit(id, item) {
    try {
      const result = await Record.update({ '_id': ObjectID(id) }, {
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
      const result = await Record.findOne({ '_id': ObjectID(id), property: { $ne: 1 } });
      return result
    } catch (e) {
      console.log('查询失败')
    }
  },
  async getWithDel(id) {
    try {
      const result = await Record.findById(id);
      return result
    } catch (e) {
      console.log('查询失败')
    }
  },
  async getAll() {
    try {
      const result = await Record.find({
        property: { $ne: 1 }
      });
      return result
    } catch (e) {
      console.log('查询失败')
    }
  },
}

