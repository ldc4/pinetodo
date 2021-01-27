const crypto = require('crypto')

module.exports = {
  getHashPassword: function(password) {
    return crypto
      .createHmac('sha256', 'pinetodo')
      .update(password)
      .digest('hex')
  }
}