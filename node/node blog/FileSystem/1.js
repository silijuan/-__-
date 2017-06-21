/*
* @Author: dell
* @Date:   2017-05-19 15:51:10
* @Last Modified by:   dell
* @Last Modified time: 2017-05-19 17:34:24
*/

'use strict';
/*var fs=require('fs');
//打开文件
fs.open('1.txt','r',function(err,fd){
	console.log(err);
	console.log(fd);
});
console.log('ok');
*/

var fs=require('fs');
var fd=fs.openSync('1.txt','r');
console.log('ok');
console.log(fd);