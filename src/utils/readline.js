const path = require('path');
const fs = require('fs');
const readline = require('readline');

const fileName = path.join(__dirname, '../../logs/access.log');

const readStream = fs.createReadStream(fileName);

// 逐行读取
const rl = readline.createInterface({
  input: readStream
});

let chormeNum = 0;

// 总行数
let sum = 0;

// 每读取一行就会触发
rl.on('line', (lineData) => {
  if(lineData) {
    sum++;
  }
  const arr = lineData.split(' -- ');
  if (arr[2] && arr[2].indexOf('Chrome') > 0) {
    chormeNum++;
  }
});

rl.on('close', function () {
  console.log('chorme占比：' + (chormeNum / sum) * 100 + '%');
});