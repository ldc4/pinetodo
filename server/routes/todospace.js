const express = require('express')
const router = express.Router()
const todoModel = require('../models/todo')
const passport = require('passport')


router.post('/addTodo', passport.authenticate('jwt', { session: false }), async function(req, res, next) {
  const { uid } = req.user
  const { content } = req.body
  if (!content) { res.send({ code: -1, msg: '内容不能为空' }); return; }
  const result = await todoModel.add({ content }, uid)
  res.send({
    code: 0,
    data: result,
    msg: ''
  });
});

router.post('/completeTodo', passport.authenticate('jwt', { session: false }), async function(req, res, next) {
  const { uid } = req.user
  const { id } = req.body
  if (!id) { res.send({ code: -1, msg: 'ID不存在' }); return; }
  const result = await todoModel.complete(id, uid)
  res.send({
    code: 0,
    data: result,
    msg: ''
  });
});

router.post('/removeTodo', passport.authenticate('jwt', { session: false }), async function(req, res, next) {
  const { uid } = req.user
  const { id } = req.body
  if (!id) { res.send({ code: -1, msg: 'ID不存在' }); return; }
  const result = await todoModel.remove(id, uid)
  res.send({
    code: 0,
    data: result,
    msg: ''
  });
});

router.post('/editTodo', passport.authenticate('jwt', { session: false }), async function(req, res, next) {
  const { uid } = req.user
  const { id, content } = req.body
  if (!id) { res.send({ code: -1, msg: 'ID不存在' }); return; }
  if (!content) { res.send({ code: -1, msg: '内容不能为空' }); return; }
  const result = await todoModel.edit(id, { content }, uid)
  res.send({
    code: 0,
    data: result,
    msg: ''
  });
});

router.get('/getTodo', passport.authenticate('jwt', { session: false }), async function(req, res, next) {
  const { id } = req.query
  if (!id) { res.send({ code: -1, msg: 'ID不存在' }); return; }
  const result = await todoModel.get(id)
  res.send({
    code: 0,
    data: result,
    msg: ''
  });
});

router.get('/getTodoList', passport.authenticate('jwt', { session: false }), async function(req, res, next) {
  const { uid } = req.user
  const result = await todoModel.getAllTodo(uid)
  res.send({
    code: 0,
    data: result,
    msg: ''
  });
});

module.exports = router;
