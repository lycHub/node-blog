const env = process.env.NODE_ENV;

let MYSQL_CONF;
let REDIS_CONF;

if (env === 'dev') {
  MYSQL_CONF = {
    user: 'root',
    password: 'LYC6809915TC',
    database: 'node-blog'
  };
  REDIS_CONF = {
    port: 6379,
    host: 'localhost'
  }
}else {
  MYSQL_CONF = {
    user: 'root',
    password: 'LYC6809915TC',
    database: 'node-blog'
  };
  REDIS_CONF = {
    port: 6379,
    host: 'localhost'
  }
}

module.exports = {
  MYSQL_CONF,
  REDIS_CONF
}