/*
* @Author: dell
* @Date:   2017-05-25 16:26:10
* @Last Modified by:   dell
* @Last Modified time: 2017-05-25 17:13:51
*/

'use strict';
var http=require('http');
var url=require('url');

var server=http.createServer();

/*var urlStr=url.parse('http://baidu.com/index.html?a=2&&b=1');
console.log(urlStr);*/

server.on('request',function(req,res){
	//console.log(req);
	//console.log(req.url);
	
	var urlStr=url.parse(req.url);
	console.log(urlStr);
	switch(urlStr.pathname){
		case '/':
			//首页
			
			res.writeHead(200,'blog',{
				'Content-Type': 'text/html'
			});
			res.write('<h1>hello,这是首页</h1>');
			res.end();
			break;
		case '/user':
			//用户首页
			res.writeHead(200,'blog',{
				'Content-Type': 'text/html'
			});
			res.write('<h1>hello,这是个人中心</h1>');
			res.end();
			break;
		default :
			//其他
			res.writeHead(404,'blog',{
				'Content-Type': 'text/html'
			});
			res.write('<h1>hello,页面被LEO吃掉了</h1>');
			res.end();
			break;
	}
});
server.listen('8080','localhost');