const express = require('express');
const router = express.Router();
const settingModel = require('../models/setting');
const passport = require('passport');

router.get('/getSetting', passport.authenticate('jwt', { session: false }), async function(req, res, next) {
  const { id } = req.user;
  const result = await settingModel.getByUid(id);
  res.send({
    code: 0,
    data: result,
    msg: 'ok'
  });
});

router.post('/saveSetting', passport.authenticate('jwt', { session: false }), async function(req, res, next) {
  const { id: uid } = req.user;
  const { period = 3000 } = req.body;
  const oldSetting = await settingModel.getByUid(uid);

  let newSetting = {
    uid,
    period
  };

  if (oldSetting) {
    const { _id } = oldSetting
    await settingModel.edit(_id, newSetting, uid)
  } else {
    await settingModel.add(newSetting, uid)
  }

  res.send({
    code: 0,
    msg: 'ok'
  })
});

module.exports = router;