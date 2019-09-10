const { getList, getDetail, newBlog, updateBlog, delBlog } = require('../controller/blog');
const { SuccessModel, ErrorModel } = require('../model/resModel');

const express = require('express');
const router = express.Router({
  caseSensitive: true
});


router.get('/list', function(req, res, next) {
  console.log('get list');
  const { author, keyword } = req.query;
  return getList(author, keyword).then(listData => {
    res.json(new SuccessModel(listData));
  });
});

router.get('/detail', function(req, res, next) {
  return getDetail(req.query.id).then(data => res.json(new SuccessModel(data)));
});

router.post('/detail', function(req, res, next) {
  return getDetail(req.query.id).then(data => res.json(new SuccessModel(data)));
});

module.exports = router;
