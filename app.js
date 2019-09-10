var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const fs = require('fs');
var indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const blogRouter = require('./routes/blog');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

if (process.env.NODE_ENV === 'dev') {
  app.use(logger('dev'));
}else {
  const logFileName = path.join(__dirname, 'logs', 'access.log');
  const writeStream = fs.createWriteStream(logFileName, { flags: 'a' });
  app.use(logger('combined', {
    stream: writeStream   // 默认是直接写入控制台
  }));
}

app.use(express.json());

const client = require('./db/redis');
const sessionStore = new RedisStore({ client });

app.use(session({
  secret: 'Madao_2019_',

  // 设置cookie
  cookie: {
    // path: '/',
    // httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  },
  store: sessionStore
}));

// 解析表单提交的数据
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

// 这里定义的是根路由
app.use('/', indexRouter);

app.use('/api/blog', blogRouter);
app.use('/api/user', userRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'dev' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
