const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');

var input= process.argv[2];
var output= process.argv[3];

if (input==undefined || !fs.existsSync(input)) {
  console.log('Input file does not exist!');
  return ;
}

if (output==undefined) {
   output=process.cwd()+'/girls';
}

if (!fs.existsSync(output)) {
   fs.mkdirSync(output);
}

fs.readFile(input, function (err,data) {
  var source = JSON.parse(data);
  source.i.map(function (item) {
    var fileUrl=url.parse(item.url);
    var filePath= output+'/'+path.basename(fileUrl.pathname)+'.jpeg';
    console.log('filePath: '+filePath);
    downloadItem(item.url,filePath);
  });
});

function downloadItem(urlStr,filePath) {
  http.get(urlStr, (res) => {
    const { statusCode } = res;
    let error;
    if (statusCode !== 200) {
      error = new Error(`Request Failed.\n` +
                        `Status Code: ${statusCode}`);
    }
    if (error) {
      console.error(error.message);
      // consume response data to free up memory
      res.resume();
      return;
    }
    var writeStream=fs.createWriteStream(filePath);
    res.pipe(writeStream).on('error', (err) => {
    console.error(err);
    });
  });
}
