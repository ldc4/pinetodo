const express = require('express')
const router = express.Router()
const userModel = require('../models/user')
const snowflake = require('../utils/snowflake')
const crypto = require('../utils/crypto')
const jsonwebtoken = require('jsonwebtoken')
const authConfig = require('../config/auth.json')

router.post('/login', async function(req, res, next) {
  const { username, password } = req.body
  const hashPassword = crypto.getHashPassword(password)
  const result = await userModel.getOneByUsernameAndPassword(username, hashPassword)
  if (result) {
    const rule = {
      id: result.id,
      username
    }
    jsonwebtoken.sign(rule, authConfig.secretKey, { expiresIn: 3600 }, (err, token) => {
      if (err) {
        res.send({
          code: -1,
          msg: '生成token错误'
        })
        return
      }
      // 设置cookie
      res.cookie('jwt-token', token, { expires: new Date(Date.now() + 8 * 3600 * 1000), httpOnly: true })
      res.send({
        code: 0,
        data: {
          isLogin: true,
          userInfo: {
            uid: result.uid,
            username: result.username,
            email: result.email,
            phone: result.phone,
          }
        },
      })
    })
  } else {
    res.send({
      code: 0,
      data: {
        isLogin: false
      },
      msg: 'ok'
    })
  }
})

router.post('/register', async function(req, res, next) {
  const { username, password, email, phone } = req.body
  // 参数校验
  if (!username) { res.send({ code: -1, msg: '用户名不能为空' }); return; }
  if (!password) { res.send({ code: -1, msg: '密码不能为空' }); return; }

  // 重名校验
  const findResult = await userModel.getOneByUsername(username)
  if (findResult) { res.send({ code: -1, msg: '用户名已存在' }); return; }

  const uid = snowflake.nextId()
  const hashPassword = crypto.getHashPassword(password)
  const addResult = await userModel.add({
    uid,
    username,
    password: hashPassword,
    email,
    phone
  })
  console.log(addResult)
  res.send({
    code: 0,
    msg: 'ok'
  })
});

router.get('/checkUsername', async function(req, res, next) {
  const { username } = req.query
  const result = await userModel.getOneByUsername(username)
  const isDuplicated = !!result
  res.send({
    code: 0,
    data: {
      isDuplicated
    },
    msg: 'ok'
  })
})


module.exports = router;
