const { loginCheck } = require('../controller/user');
const { SuccessModel, ErrorModel } = require('../model/resModel');
function handleUserRouter (req,res) {
  const { method } = req;
  const path = req.path;

  // 路由
  if (method === 'POST' && path === '/api/user/login') {
    const { username, password } = req.body;
    return loginCheck(username, password).then(data => {
      return data.username ? new SuccessModel() : new ErrorModel('登录失败');
    });
  }
}

module.exports = handleUserRouter;