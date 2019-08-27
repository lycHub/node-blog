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
  req.on('data', chunk => result += chunk.toString());
  req.on('end', () => cb(result));
}


function serverHandle (req, res){
  res.setHeader('Content-Type', 'application/json');
  const url = req.url;
  req.path = url.split('?')[0];
  req.query = querystring.parse(url.split('?')[1]);

  getPostData(req, function(postData) {
    req.body = JSON.parse(postData);
    const blogData = handleBlogRouter(req, res);
    const userData = handleUserRouter(req, res);
    if (blogData) {
      res.end(JSON.stringify(blogData));
      return;
    }
    if (userData) {
      res.end(JSON.stringify(userData));
      return;
    }

    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('page is not found');
  });



  
}

module.exports = serverHandle;