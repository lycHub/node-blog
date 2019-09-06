const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');

function handleBlogRouter (req, res) {
  const { method } = req;
  const path = req.path;
  const id = req.query.id;

  // 路由
  if (method === 'GET') {
    if (path === '/api/blog/list') {
      const { author, keyword } = req.query;
      return getList(author, keyword).then(listData => new SuccessModel(listData));
    }else if (path === '/api/blog/detail') {
      return getDetail(id).then(data => new SuccessModel(data));
    }
    
  }else if (method === 'POST') {
    if (path === '/api/blog/new') {
      const loginCheckRes = loginCheck(req);
      if (loginCheckRes) {
        return loginCheckRes;
      }
      req.body.author = req.session.username;
      return newBlog(req.body).then(data => new SuccessModel(data));
    }else if (path === '/api/blog/update') {
      const loginCheckRes = loginCheck(req);
      if (loginCheckRes) {
        return loginCheckRes;
      }
      return updateBlog(req.body).then(res => {
        if (res) {
          return new SuccessModel();
        } else {
          return new ErrorModel('更新失败');
        }
      });
    }else if (path === '/api/blog/del') {
      const loginCheckRes = loginCheck(req);
      if (loginCheckRes) {
        return loginCheckRes;
      }
      req.body.author = req.session.username;
      return delBlog(req.body).then(res => {
        if (res) {
          return new SuccessModel();
        } else {
          return new ErrorModel('删除失败');
        }
      });
    }
  }
}


// 登录验证
function loginCheck(req) {
  if (!req.session.username) {
    return Promise.resolve(new ErrorModel('未登录'));
  }
}


module.exports = handleBlogRouter;