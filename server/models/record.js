const { model, Schema } = require('../utils/mongoose')
const { ObjectID } = require('mongodb');

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
      const { period } = item
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
  async getAllByYear(uid, year) {
    try {
      const yearDate = new Date(`${year}`);
      yearDate.setDate(1);
      yearDate.setMonth(0);
      const yearFirstTime = yearDate.getTime();
      yearDate.setFullYear(yearDate.getFullYear() + 1);
      yearDate.setMonth(0);
      yearDate.setDate(0);
      const yearLastTime = yearDate.getTime();

      const result = await Record.find({
        creator: uid,
        createTime: {
          $lte: yearLastTime,
          $gte: yearFirstTime,
        },
        property: { $ne: 1 }
      });
      return result
    } catch (e) {
      console.log('查询失败')
    }
  }
}

