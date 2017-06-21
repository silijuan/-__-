/*
* @Author: dell
* @Date:   2017-05-25 15:13:03
* @Last Modified by:   dell
* @Last Modified time: 2017-05-25 16:24:01
*/

'use strict';
//搭建一个http的服务器
//加载一个http模块
var http=require('http');

var server=http.createServer();

server.on('error',function(err){
	console.log(err);
});
server.on('listening',function(){
	console.log('listening...');
});
/*server.on('request',function(){
	console.log('有客户端请求来了。。。')
});*/
server.on('request',function(req,res){
	console.log('有客户端请求来了。。。');
	//console.log(req);
	//res.write('hello');
	res.setHeader('blog', 'bar');
	res.writeHead(200,'blog',{
		'Content-Type': 'text/html'
	});
	res.write('<h1>hello</h1>');
	res.end();
});
server.listen('8080','localhost');

