const crypto = require('crypto');
const fs = require('fs');
var fileName= process.argv[2];
if (fileName == undefined) {
  console.log('A file path is needed!');
  return;
}

var shaSum=crypto.createHash('sha1');
var inputStream= fs.ReadStream(fileName);
inputStream.on('data',function (d) {
  shaSum.update(d);
});

inputStream.on('end',function () {
var shaString=shaSum.digest('hex');
console.log(fileName+' sha1 checkSum is : '+shaString);
})
