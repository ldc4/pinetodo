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
  async add(item, uid) {
    try {
      const { period, completeTime, startTime } = item
      let property = 0
      if (period <= 0) {
        property = 2  // 2代表补单
      }
      const result = await Record.create({
        ...item,
        createTime: Date.now(),
        updateTime: Date.now(),
        creator: uid,
        editor: uid,
        property,
      });
      return result
    } catch (e) {
      console.log('保存失败')
    }
  },
  async remove(id, uid) {
    try {
      const result = await Record.updateOne({ '_id': ObjectID(id) }, {
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
      const result = await Record.updateOne({ '_id': ObjectID(id) }, {
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
  async getAll(uid) {
    try {
      const result = await Record.find({
        creator: uid,
        property: { $ne: 1 }
      });
      return result
    } catch (e) {
      console.log('查询失败')
    }
  },
}

