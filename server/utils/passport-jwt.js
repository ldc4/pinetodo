const Strategy = require('passport-jwt').Strategy
const User = require('../models/user')
const authConfig = require('../config/auth.json')


// jwt解析配置
const options = {}
options.jwtFromRequest = function(req) {
    let token = null;
    if (req && req.cookies) {
        token = req.cookies['jwt-token'];
    }
    return token;
};
options.secretOrKey = authConfig.secretKey

module.exports = passport => {
    /**
     * @jwt_payload 请求得到的内容
     * @done 表示策略结束,返回信息
     */
    passport.use(new Strategy(options, (jwt_payload, done) => {
        User.get(jwt_payload.id).then(user => {
            if (user) {
                return done(null, user)
            }
            return done(null, false)
        }).catch(err => {
            console.log(err)
        })
    }))
}