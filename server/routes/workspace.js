const express = require('express')
const router = express.Router()
const recordModel = require('../models/record')


router.post('/addRecord', async function(req, res, next) {
  const { content, period, startTime, completeTime, endTime } = req.body
  if (!content) { res.send({ code: -1, msg: '内容不能为空' }); return; }
  if (!period) { res.send({ code: -1, msg: '周期不能为空' }); return; }
  if (!startTime) { res.send({ code: -1, msg: '开始时间不能为空' }); return; }
  if (!completeTime) { res.send({ code: -1, msg: '完成时间不能为空' }); return; }
  if (!endTime) { res.send({ code: -1, msg: '结束时间不能为空' }); return; }
  const result = await recordModel.add({ content, period, startTime, completeTime, endTime })
  res.send({
    code: 0,
    data: result,
    msg: ''
  });
});

router.post('/removeRecord', async function(req, res, next) {
  const { id } = req.body
  if (!id) { res.send({ code: -1, msg: 'ID不存在' }); return; }
  const result = await recordModel.remove(id)
  res.send({
    code: 0,
    data: result,
    msg: ''
  });
});

router.post('/editRecord', async function(req, res, next) {
  const { id, content } = req.body
  if (!id) { res.send({ code: -1, msg: 'ID不存在' }); return; }
  if (!content) { res.send({ code: -1, msg: '内容不能为空' }); return; }
  const result = await recordModel.edit(id, { content })
  res.send({
    code: 0,
    data: result,
    msg: ''
  });
});

router.get('/getRecord', async function(req, res, next) {
  const { id } = req.query
  if (!id) { res.send({ code: -1, msg: 'ID不存在' }); return; }
  const result = await recordModel.get(id)
  res.send({
    code: 0,
    data: result,
    msg: ''
  });
});

router.get('/getRecordList', async function(req, res, next) {
  const result = await recordModel.getAll()
  res.send({
    code: 0,
    data: result,
    msg: ''
  });
});

module.exports = router;
