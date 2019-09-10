// 这个中间件没有匹配任何路径，所以会在每个请求生效
app.use(function (req, res, next) {
  console.log('Time: %d', Date.now());

  // next会寻找下一个中间件
  next();
});


// 假设访问的是api/blog/list, 下面中间件都会触发

app.use('/api', /****/);
app.use('/api/blog/list', /****/);


// app.use可以传n个回调函数 app.use(path, callback , callback...)
// 这是中间件的另一种写法
// app.use('/path', m1, m2,,,)

function m1() {

}
function m2() {

}