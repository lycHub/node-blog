const {genPassword} = require("../utils/cryp");

const { exec } = require('../db/mysql');
function login(username, password) {
  const sql = `select username, realname from users where username = '${username}' and password = '${genPassword(password)}'`;
  return exec(sql).then(rows => {
    return rows[0] || {};
  });
}

module.exports = { login };