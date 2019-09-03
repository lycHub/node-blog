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
      // req.body.author = 'Madao';
      return newBlog(req.body).then(data => new SuccessModel(data));
    }else if (path === '/api/blog/update') {
      const result = updateBlog(req.body);
      return result ? new SuccessModel(result) : new ErrorModel('更新失败');
    }else if (path === '/api/blog/del') {
      const result = delBlog(req.body.id);
      return result ? new SuccessModel(result) : new ErrorModel('删除失败');
    }
  }
}


module.exports = handleBlogRouter;