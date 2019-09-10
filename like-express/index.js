const expLike = require('./like-express');

const app = expLike();

app.use(function (req, res, next) {
  console.log('1请求开始', req.method, req.url);
  next();
});

app.use(function (req, res, next) {
  console.log('2请求');
  req.cookie = { userId: 'abc' };
  next();
});

app.get('/api', function (req, res, next) {
  console.log('3get /api');
  next();
});

app.get('/api/get-cookie', loginCheck, function (req, res, next) {
  console.log('4setTimeout请求');
  next();
});

function loginCheck (req, res, next) {
  setTimeout(() => {
    console.log('loginCheck');
    next();
  })
}

app.listen(4200, function () {
  console.log('listen to 4200');
});
