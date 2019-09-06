const redis = require('redis');

const client = redis.createClient(6379, 'localhost');

client.on('error', function (err) {
  console.error(err);
});

// redis.prints在设置完成后会打印是否ok
client.set('hello', 'This is a value', redis.print);

client.get('hello',function (err, val) {
  if (err) {
    throw err;
  }else {
    console.log('val', val);
  }
  client.quit();
});
