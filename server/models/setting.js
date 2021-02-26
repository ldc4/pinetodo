const { model, Schema } = require('../utils/mongoose');
const { ObjectID } = require('mongodb');

const schema = new Schema({
  uid: String,
  period: Number,
  interval: Number,
  createTime: Date,
  updateTime: Date,
  creator: String,
  editor: String,
});

const Setting = model('Setting', schema);

module.exports = {
  async add(item, uid) {
    try {
      const result = await Setting.create({
        ...item,
        createTime: Date.now(),
        updateTime: Date.now(),
        creator: uid,
        editor: uid,
      });
      return result
    } catch (e) {
      console.log('保存失败', e)
    }
  },
  async edit(id, item, uid) {
    try {
      const result = await Setting.updateOne({ '_id': ObjectID(id) }, {
        ...item,
        updateTime: Date.now(),
        editor: uid
      });
      return result
    } catch (e) {
      console.log('修改失败')
    }
  },
  async getByUid(uid) {
    try {
      const result = await Setting.findOne({ uid });
      return result
    } catch (e) {
      console.log('查询失败')
    }
  }
}