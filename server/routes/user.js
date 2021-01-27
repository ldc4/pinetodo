const express = require('express')
const router = express.Router()
const userModel = require('../models/user')
const passport = require('passport')


router.get('/getUserInfo', passport.authenticate('jwt', { session: false }), async function(req, res, next) {
  res.send({
    code: 0,
    data: {
      userInfo: req.user
    },
    msg: 'ok'
  })
})

module.exports = router;