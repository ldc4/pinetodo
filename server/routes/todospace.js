const express = require('express')
const router = express.Router()
const todoModel = require('../models/todo')


router.post('/addTodo', async function(req, res, next) {
  const { content } = req.body
  if (!content) { res.send({ code: -1, msg: '内容不能为空' }) }
  const result = await todoModel.add(content)
  res.send({
    code: 0,
    data: result,
    msg: ''
  });
});

router.post('/removeTodo', async function(req, res, next) {
  const { id } = req.body
  if (!id) { res.send({ code: -1, msg: 'ID不存在' }) }
  const result = await todoModel.remove(id)
  res.send({
    code: 0,
    data: result,
    msg: ''
  });
});

router.post('/editTodo', async function(req, res, next) {
  const { id, content } = req.body
  if (!id) { res.send({ code: -1, msg: 'ID不存在' }) }
  if (!content) { res.send({ code: -1, msg: '内容不能为空' }) }
  const result = await todoModel.edit(id, content)
  res.send({
    code: 0,
    data: result,
    msg: ''
  });
});

router.get('/getTodo', async function(req, res, next) {
  const { id } = req.query
  if (!id) { res.send({ code: -1, msg: 'ID不存在' }) }
  const result = await todoModel.get(id)
  res.send({
    code: 0,
    data: result,
    msg: ''
  });
});

router.get('/getTodoList', async function(req, res, next) {
  const result = await todoModel.getAll()
  res.send({
    code: 0,
    data: result,
    msg: ''
  });
});

module.exports = router;
