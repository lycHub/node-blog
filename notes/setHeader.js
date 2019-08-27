function serverHandle (req, res){
  res.setHeader('Content-Type', 'application/json');
  const resData = {
    name: 'Madao',
    site: 'immoc'
  }

  /* 
    这里res.end参数是string | buffer
    因为setHeader是application/json
    所以浏览器返回前会把resData在转成json
  */
  res.end(JSON.stringify(resData));
}

module.exports = serverHandle;