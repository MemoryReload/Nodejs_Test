 const net=require('net');
 var server=net.createServer(function(socket){
 console.log('some client connected!');
 socket.on('connect',function(){
  console.log('client ready');
});
socket.on('data',function(data){
 socket.write(data);
});
socket.on('end',function(){
socket.end();
});
 });
 var port=3000;
 if (process.env.NODE_ENV==='production') {
   port=80;
 }
 server.listen(port,function(){
 console.log('Server is listenning on '+port+'!');
});
