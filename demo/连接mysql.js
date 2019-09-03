const mysql = require('mysql');
const con = mysql.createConnection({
  // host: 'localhost',
  // port: 3306,
  user: 'root',
  password: 'LYC6809915TC',
  database: 'node-blog'
});

con.connect(function (err) {
  if (err) {
    // 如果报错，参考https://blog.csdn.net/zhengbin9/article/details/82729861
    console.error('error connecting: ' + err);
  }
});

// const sql = `update users set realname = '李涵' where username = 'lihan'`;
const sql = `INSERT INTO blogs(title, content, createtime, author) VALUES('博客1', '内容1', '1567409478355', 'Madao')`;
con.query(sql, function (error, results) {
  if (error) throw error;
  console.log('The solution is: ', results);
});

con.end(function(error) {
  if (error) throw error;
  console.log('连接结束');
});