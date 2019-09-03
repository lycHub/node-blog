const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');

function getPostData(req, cb) {
  let result = '';
  if (req.method !== 'POST') {
    result = {};
  }
  if (req.headers['content-type'] !== 'application/json') {
    result = {};
  }
  req.on('data', chunk => result += chunk);
  req.on('end', () => {
    result = result.toString() || {};
    cb(JSON.parse(result));
  });
}


function serverHandle (req, res){
  res.setHeader('Content-Type', 'application/json');
  const url = req.url;
  req.path = url.split('?')[0];
  req.query = querystring.parse(url.split('?')[1]);
  getPostData(req, function (postData) {
    req.body = postData;
    const blogResult = handleBlogRouter(req, res);
    const userResult = handleUserRouter(req, res);
    if (blogResult) {
      blogResult.then(blogData => {
        res.end(JSON.stringify(blogData));
      });
      return;
    }

    if (userResult) {
      userResult.then(userData => {
        res.end(JSON.stringify(userData));
      });
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('page is not found');
  });
}

module.exports = serverHandle;