const http =require('http');
const slice = Array.prototype.slice;

class LikeExpress {
  constructor() {
    // 中间件列表
    this.routes = {
      all: [],
      get: [],
      post: []
    }
  }

  register(path) {
    const info = {};
    if (typeof path === 'string') {
      info.path = path;

      // 当前路由注册的所有中间件函数
      info.stack = slice.call(arguments, 1);
    }else {
      info.path = '/';
      info.stack = slice.call(arguments, 0);
    }
    return info;
  }

  get() {
    const info = this.register.apply(this, arguments);
    this.routes.get.push(info);
  }

  post() {
    const info = this.register.apply(this, arguments);
    this.routes.post.push(info);
  }

  use() {
    const info = this.register.apply(this, arguments);
    this.routes.all.push(info);
  }

  listen(...args) {
    const server = http.createServer(this.callback());
    server.listen(...args);
  }
  
  callback() {
    return (req,  res) => {
      res.json = data => {
        res.setHeader('Content-Type', 'application/json');
        res.json(JSON.stringify(data));
      };
      const url = req.url;
      const method = req.method.toLowerCase();

      // 过滤出可用的中间件(匹配method和url)
      const resultList = this.match(method, url);
      this.handle(req, res, resultList);
    }
  }

  // 过滤中间件
  match(method, url) {
    let stack = [];
    if (url === '/favicon.ico') return;
    const curRoutes = [...this.routes.all, ...this.routes[method]];
    curRoutes.forEach(routeInfo => {
      /*
      * 假设url === 'api/get-cookie'，以下路径都能匹配到
      * '/'  '/api'  '/api/get-cookie'
      * */
      if (url.indexOf(routeInfo.path) === 0) {
        stack = stack.concat(routeInfo.stack);
      }
    });
    return stack;
  }

  handle(req, res, stack) {
    console.log('stack', stack);
    const next = () => {
      // 取出第一个中间件

      const middleware = stack.shift();
      // console.log('middleware', middleware);
      if (middleware) {
        middleware(req, res, next);
      }
    };
    next();
  }
}


module.exports = function () {
  return new LikeExpress();
}
