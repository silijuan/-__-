/*
* @Author: dell
* @Date:   2017-04-25 17:22:06
* @Last Modified by:   dell
* @Last Modified time: 2017-04-25 17:39:02
*/

'use strict';
/*process.stdin.resume();
process.stdin.on('data',function(chunk){
	console.log('用户输入了：'+chunk);
});*/

var a;
var b;
process.stdout.write('请输入a的值:');
process.stdin.on('data',function(chunk){
	if(!a){
		a=Number(chunk);
		process.stdout.write('请输入b的值:');
	}else{
		b=Number(chunk);
		process.stdout.write('结果是:'+a+b);
	}
});
