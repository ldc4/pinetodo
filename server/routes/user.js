const express = require('express')
const router = express.Router()
const userModel = require('../models/user')
const passport = require('passport')


router.get('/getUserInfo', passport.authenticate('jwt', { session: false }), async function(req, res, next) {
  const {
    uid,
    username,
    email,
    phone
  } = req.user
  res.send({
    code: 0,
    data: {
      userInfo: {
        uid,
        username,
        email,
        phone
      }
    },
    msg: 'ok'
  })
})

module.exports = router;