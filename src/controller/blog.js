const { exec } = require('../db/mysql');
function getList(author, keyword) {
  // 1 = 1 是个占位的手段，如果author、keyword都不存在，那么xx where order xx将会报错
  let sql = `select * from blogs where 1 = 1 `;
  if (author) {
    sql += `and author = '${author}' `;
  }
  if (keyword) {
    sql += `and title like '%${keyword}%' `;
  }
  sql += 'order by createtime desc';
  return exec(sql);
}


function getDetail(id) {
  const sql = `select * from blogs where id = '${id}'`;
  return exec(sql).then(rows => rows[0]);
}


function newBlog(blogData = {}) {
  console.log('new Bolg data :', blogData);
  const { title, content, author = 'Madao' } = blogData;
  const createtime = Date.now();
  const sql = `
    insert into blogs (title, content, createtime, author)
    values ('${title}', '${content}', ${createtime}, '${author}')
  `;

  return exec(sql).then(insertResult => {
    // console.log('insertResult', insertResult);
    return {
      id: insertResult.insertId
    }
  });
}

function updateBlog(blogData = {}) {
  const { id, title, content } = blogData;
  console.log('updateBlog data :', blogData);
  const sql = `update blogs set title = '${title}', content = '${content}' where id = ${id}`;
  return exec(sql).then(updateResult => updateResult.affectedRows > 0);
}

function delBlog(blogData = {}) {
  const { id, author = 'Madao' } = blogData;
  const sql = `delete from blogs where id = ${id} and author = '${author}'`;
  return exec(sql).then(updateResult => updateResult.affectedRows > 0);
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}