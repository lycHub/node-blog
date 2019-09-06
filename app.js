const {get, set} = require("./src/db/redis");

const querystring = require('querystring');
const handleBlogRouter = require('./src/router/blog');
const handleUserRouter = require('./src/router/user');
const { access } = require('./src/utils/log');

function getPostData(req, cb) {
  if (req.method !== 'POST') {
    cb({});
    return;
  }
  if (req.headers['content-type'] !== 'application/json') {
    cb({});
    return;
  }
  let result = '';
  req.on('data', chunk => result += chunk);
  req.on('end', () => {
    result = result.toString();
    cb(JSON.parse(result));
  });
}


function serverHandle (req, res){
  // 写日志
  access(`${req.method} -- ${req.url} -- ${req.headers['user-agent']} -- ${Date.now()}`);


  res.setHeader('Content-Type', 'application/json');
  const url = req.url;
  req.path = url.split('?')[0];
  req.query = querystring.parse(url.split('?')[1]);

  // 解析cookie
  req.cookie = {};
  const cookieStr = req.headers.cookie || '';
  cookieStr.split(';').forEach(item=>{
    if (item) {
      const arr=item.split('=');
      const key=arr[0].trim();
      const val =arr[1].trim();
      req.cookie[key]=val;
    }
  });


  // 解析session
  let userId = req.cookie.userid;
  let needSetCookie = false;
  if (!userId) {
    needSetCookie = true;
    userId = Date.now() + '_' + Math.random();
    set(userId, {});    // 设置redis
  }
  req.sessionId = userId;
  get(req.sessionId).then(sessionData => {
    if (sessionData) {
      req.session = sessionData;
    }else {
      set(req.sessionId, {});
      req.session = {};
    }
    console.log('session', req.session);
    getPost();
  });

  function getPost() {
    getPostData(req, function (postData) {
      req.body = postData;
      const blogResult = handleBlogRouter(req, res);
      const userResult = handleUserRouter(req, res);
      if (blogResult) {
        blogResult.then(blogData => {
          if (needSetCookie) {
            res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
          }
          res.end(JSON.stringify(blogData));
        });
        return;
      }

      if (userResult) {
        userResult.then(userData => {
          if (needSetCookie) {
            res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`);
          }
          res.end(JSON.stringify(userData));
        });
        return;
      }

      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('page is not found');
    });
  }


}


// 获取cookie过期时间
function getCookieExpires() {
  const d = new Date();
  d.setTime(d.getTime() + (24 * 60 * 60 * 1000));
  console.log('toGMTString', d.toGMTString());
  return d.toGMTString();
}


module.exports = serverHandle;