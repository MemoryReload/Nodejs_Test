const cluster = require('cluster');
const http = require('http');
const os = require('os');

if (cluster.isMaster) {

  var numRequests=0;

  function msgHandler(msg) {
    if (msg.cmd == 'notifyRequest') {
      numRequests++;
    }
  }

  function getOnlineHandler(worker) {
    return function(){
      console.log('worker '+ worker.process.pid + ' is on line');
    }
  }

  setInterval(function () {
    console.log('numRequests = '+ numRequests);
  },1000);

  var numCPUs = os.cpus().length;
  for (var i = 0; i < numCPUs; i++) {
    var worker=cluster.fork();
    worker.on('message',msgHandler);
    worker.on('online',getOnlineHandler(worker));
  }

  // Object.keys(cluster.workers).forEach(function (id) {
  //    cluster.workers[id].on('message',msgHandler);
  //   cluster.workers[id].on('online',getOnlineHandler(cluster.workers[id]));
  // });

} else {
  http.createServer(function (req,res) {
    res.writeHead(200);
    res.end('Hello World \n');
    process.send({cmd:'notifyRequest'});
  }).listen(8080);
}
