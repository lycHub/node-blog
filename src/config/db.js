const env = process.env.NODE_ENV;

let MYSQL_CONF;

if (env === 'dev') {
  MYSQL_CONF = {
    user: 'root',
    password: 'LYC6809915TC',
    database: 'node-blog'
  }
}else {
  MYSQL_CONF = {
    user: 'root',
    password: 'LYC6809915TC',
    database: 'node-blog'
  }
}

module.exports = {
  MYSQL_CONF
}