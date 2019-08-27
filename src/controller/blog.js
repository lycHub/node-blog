function getList(author, keyword) {
  console.log('author :', author);
  console.log('keyword :', keyword);
  return [
    {
      id: 1,
      title: '博客1',
      content: '内容1',
      author: 'zhangsan',
      createTime: Date.now()
    },
    {
      id: 2,
      title: '博客2',
      content: '内容2',
      author: 'lisi',
      createTime: 1566873198520
    }
  ]
}


function getDetail(id) {
  return {
    id: 1,
    title: '博客1',
    content: '内容1',
    author: 'zhangsan',
    createTime: Date.now()
  }
}


function newBlog(blogData = {}) {
  console.log('new Bolg data :', blogData);
  return {
    id: 3
  }
}

function updateBlog(blogData = {}) {
  console.log('updateBlog data :', blogData);
  return true;
}

function delBlog(id) {
  console.log('delBlog :', id);
  return true;
}

module.exports = {
  getList,
  getDetail,
  newBlog,
  updateBlog,
  delBlog
}