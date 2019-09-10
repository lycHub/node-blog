const mysql = require('mysql');
const { MYSQL_CONF } = require('../config/db');

const con = mysql.createConnection(MYSQL_CONF);

con.connect(function (err) {
  if (err) {
    // 如果报错，参考https://blog.csdn.net/zhengbin9/article/details/82729861
    console.error('error connecting: ' + err);
  }
});

// 执行sql
function exec(sql) {
  return new Promise((resolve, reject) => {
    con.query(sql, (err, result) => {
      if (err) {
        reject(err);
      }else {
        resolve(result);
      }
    });
  });
}

module.exports = {
  exec
}
