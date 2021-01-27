const { model, Schema } = require('../utils/mongoose')
const { ObjectID } = require('mongodb')

const schema = new Schema({
  uid: String,
  username: String,
  password: String,
  email: String,
  phone: String,
  createTime: Date,
  updateTime: Date,
  property: Number
});

const User = model('User', schema);

module.exports = {
  async add(item) {
    try {
      const result = await User.create({
        ...item,
        createTime: Date.now(),
        updateTime: Date.now(),
        property: 0
      });
      return result
    } catch (e) {
      console.log('保存失败')
    }
  },
  async remove(id) {
    try {
      const result = await User.updateOne({ '_id': ObjectID(id) }, {
        property: 1,
        updateTime: Date.now(),
      });
      return result
    } catch (e) {
      console.log('删除失败')
    }
  },
  async edit(id, item) {
    try {
      const result = await User.updateOne({ '_id': ObjectID(id) }, {
        ...item,
        updateTime: Date.now()
      });
      return result
    } catch (e) {
      console.log('修改失败')
    }
  },
  async get(id) {
    try {
      const result = await User.findOne({ '_id': ObjectID(id), property: { $ne: 1 } });
      return result
    } catch (e) {
      console.log('查询失败')
    }
  },
  async getWithDel(id) {
    try {
      const result = await User.findById(id);
      return result
    } catch (e) {
      console.log('查询失败')
    }
  },
  async getOneByUsernameAndPassword(username, password) {
    try {
      const result = await User.findOne({ username, password, property: { $ne: 1 } });
      return result
    } catch (e) {
      console.log('查询失败')
    }
  },
  async getOneByUsername(username) {
    try {
      const result = await User.findOne({ username, property: { $ne: 1 } });
      return result
    } catch (e) {
      console.log('查询失败')
    }
  },
}