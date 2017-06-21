/*
* @Author: dell
* @Date:   2017-05-25 17:16:53
* @Last Modified by:   dell
* @Last Modified time: 2017-05-27 15:34:29
*/

'use strict';
var fs=require('fs');
var http=require('http');
var url=require('url');
var querystring = require('querystring');
var htmlDir=__dirname+'/html/';

var server=http.createServer();
server.on('request',function(req,res){
	var urlStr=url.parse(req.url);
	switch(urlStr.pathname){
		case '/':
			//首页
			sendData(htmlDir+'index.html',req,res);			
			break;
		case '/user':
			//用户首页
			//console.log(res);
			sendData(htmlDir+'user.html',req,res);	
			break;
		case '/login':
			//登陆页
			sendData(htmlDir+'login.html',req,res);	
			break;
		case '/login/check':
			//请求页
			// console.log(req.method);
			console.log(urlStr);
			console.log(querystring.parse(urlStr.query));//parse() 将querystring反序列为一个对象
			//当为post请求时，post发送的数据会被写入缓存区，需要通过request的data时间和end事件来进行数据拼接处理
			if(req.method.toUpperCase()=='POST'){
				var str='';
				req.on('data',function(chunk){
				 	str+=chunk;
				});
				req.on('end',function(){
					console.log(str);
					console.log(querystring.parse(str);
				})
			}
			break;
		default :
			//其他
			sendData(htmlDir+'error.html',req,res);	
			break;
	}
});

function sendData(file,req,res){
	fs.readFile(file,function(err,data){
		if(err){
			res.writeHead(404,'blog',{
				'Content-Type': 'text/html'
			});
			res.write('<h1>hello,页面被LEO吃掉了</h1>');
			res.end();
		}else{
			//console.log(data.toString('utf-8'))
			res.writeHead(200,'blog',{
				'Content-Type': 'text/html'
			});
			res.write( data);
			res.end();
		}
	})
}
server.listen('8080','localhost');
