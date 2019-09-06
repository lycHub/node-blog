const redis = require('redis');
const { REDIS_CONF } = require('../config/db');

const client = redis.createClient(REDIS_CONF.port, REDIS_CONF.host);

client.on('error', function (err) {
  console.error(err);
});


function set(key, val) {
  if (typeof val === 'object') {
    val = JSON.stringify(val);
  }
  client.set(key, val, redis.print);
}

function get(key) {
  return new Promise((resolve, reject) => {
    client.get(key, function (err, val) {
      if (err) {
        reject(err);
      }else if(val == null) {
        resolve(null);
      }else {
        // 兼容JSON.parse
        try {
          resolve(JSON.parse(val));
        }catch (error) {
          resolve(val);
        }
      }
      // client.quit();
    });
  });
}

module.exports = { get, set };
