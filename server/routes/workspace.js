const express = require('express')
const router = express.Router()
const recordModel = require('../models/record')
const passport = require('passport')


router.post('/addRecord', passport.authenticate('jwt', { session: false }), async function(req, res, next) {
  const { uid } = req.user
  const { content, period, startTime, completeTime, endTime } = req.body
  if (!content) { res.send({ code: -1, msg: '内容不能为空' }); return; }
  if (!period) { res.send({ code: -1, msg: '周期不能为空' }); return; }
  if (!startTime) { res.send({ code: -1, msg: '开始时间不能为空' }); return; }
  if (!completeTime) { res.send({ code: -1, msg: '完成时间不能为空' }); return; }
  if (!endTime) { res.send({ code: -1, msg: '结束时间不能为空' }); return; }
  const result = await recordModel.add({ content, period, startTime, completeTime, endTime }, uid)
  res.send({
    code: 0,
    data: result,
    msg: ''
  });
});

router.post('/removeRecord', passport.authenticate('jwt', { session: false }), async function(req, res, next) {
  const { uid } = req.user
  const { id } = req.body
  if (!id) { res.send({ code: -1, msg: 'ID不存在' }); return; }
  const result = await recordModel.remove(id, uid)
  res.send({
    code: 0,
    data: result,
    msg: ''
  });
});

router.post('/editRecord', passport.authenticate('jwt', { session: false }), async function(req, res, next) {
  const { uid } = req.user
  const { id, content } = req.body
  if (!id) { res.send({ code: -1, msg: 'ID不存在' }); return; }
  if (!content) { res.send({ code: -1, msg: '内容不能为空' }); return; }
  const result = await recordModel.edit(id, { content }, uid)
  res.send({
    code: 0,
    data: result,
    msg: ''
  });
});

router.get('/getRecord', passport.authenticate('jwt', { session: false }), async function(req, res, next) {
  const { id } = req.query
  if (!id) { res.send({ code: -1, msg: 'ID不存在' }); return; }
  const result = await recordModel.get(id)
  res.send({
    code: 0,
    data: result,
    msg: ''
  });
});

router.get('/getRecordList', passport.authenticate('jwt', { session: false }), async function(req, res, next) {
  const { uid } = req.user
  const result = await recordModel.getAll(uid)
  res.send({
    code: 0,
    data: result,
    msg: ''
  });
});

module.exports = router;
