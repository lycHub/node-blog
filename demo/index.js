const fs = require('fs');
const path = require('path');

const fileName = path.resolve(__dirname, 'log.txt');

/*fs.readFile(fileName, (err, data) => {
  if (err) {
    console.error(err);
  }else {
    // data是二进制类型
    console.log(data.toString());
  }
});*/

fs.writeFile(fileName, '追加的内容', {
  flag: 'a',
  encoding: 'utf-8'
}, err => {
  if (err) {
    console.error(err);
  }else {
    console.log('写入成功');
  }
});