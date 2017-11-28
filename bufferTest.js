var buf=new Buffer(256);
var len=buf.write("\u00bd + \u00bc = \u00be");
console.log(len+' bytes: '+buf.toString('utf8',0,len));

var str="node.js";
buf=new Buffer(str.length);
for (var i = 0; i < str.length; i++) {
  buf[i] = str.charCodeAt(i);
}
console.log('buffer: '+buf+" toString: "+buf.toString('utf8'));

var buf1= new Buffer(26);
var buf2= new Buffer(26);
for (var i = 0; i < buf1.length; i++) {
  buf1[i]='a'.charCodeAt(0)+i;
  buf2[i]='!'.charCodeAt(0);
}
buf1.copy(buf2,0,18,26);
console.log('buf1: '+buf1.toString('ascii')+' buf2: '+buf2.toString('ascii'));
