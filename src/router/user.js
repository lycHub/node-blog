const { set } =  require("../db/redis");

const { login } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');

function handleUserRouter (req, res) {
  const { method } = req;
  const path = req.path;

  // 路由
  if (method === 'POST' && path === '/api/user/login') {
    const { username, password } = req.body;
    return login(username, password).then(data => {
      if (data.username) {
        req.session.username = data.username;
        req.session.realname = data.realname;
        set(req.sessionId, req.session);
        return new SuccessModel();
      }else {
        return new ErrorModel('登录失败');
      }
    });
  }
}

module.exports = handleUserRouter;