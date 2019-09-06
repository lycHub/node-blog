const path = require('path');
const fs = require('fs');

function createWriteStream(fileName) {
  const fullFileName = path.join(__dirname, '../../logs', fileName);
  return fs.createWriteStream(fullFileName, { flags: 'a' });
}

function writeLog(writeStream, log) {
  writeStream.write(log + '\n');
}

const accessWriteStream = createWriteStream('access.log');

// 写访问日志
function access(log) {
  writeLog(accessWriteStream, log);
}

module.exports = { access };