const dns = require('dns');
var domainName = process.argv[2];
if (domainName == undefined) {
  console.log('please enter your domain name to look up !');
  return;
}
dns.resolve4(domainName,function (err,results) {
  if (err) {
    console.log(err);
    return;
  }
  results.forEach(function (address) {
    console.log('IP: '+address+'\n');
  });
})
