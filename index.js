var connect = require('connect');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var formidable = require('formidable');

var key='this is a secret';

var app = connect()
.use(cookieParser(key))
.use(bodyParser.json())
.use(bodyParser.urlencoded({extended:true}))
.use(function (req,res) {
  //打印设置的cookie
  console.log(req.cookies);
  //对客户端设置cookie
  res.setHeader('Content-Type', 'text/html');
  res.writeHead(200,{
    'Set-Cookie':'name=user;language=en'
  });
  //打印请求的body和files
  console.log(req.body);
  //提取multipart-form
  var form =new formidable.IncomingForm();
  form.uploadDir="/Users/heping/Downloads";
  form.keepExtensions = false;
  form.parse(req,function (error,fields,files) {
    console.log(fields);
    console.log(files);
  });
  res.end('hello\n');
})
.listen(3000);
