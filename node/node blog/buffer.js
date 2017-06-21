/*
* @Author: dell
* @Date:   2017-04-25 17:44:07
* @Last Modified by:   dell
* @Last Modified time: 2017-05-27 11:00:37
*/

'use strict';
/*var bf=new Buffer(5);
//new Buffer(size);创建一个Buffer对象，并为这个对象分配一个大小
//当我们为一个Buffer对象分配空间大小以后，其长度是固定（类似数组一样），不能更改
console.log(bf);
bf[6]=10;
console.log(bf);
bf[2]=10;
console.log(bf);*/

/*var bf=new Buffer([1,2,3]);
console.log(bf);
bf[10]=10;
console.log(bf);
bf[2]=2;
console.log(bf);*/

/*var bf=new Buffer('miaomiao','utf-8');
console.log(bf);
for (var i = 0; i < bf.length; i++) {
	//console.log(bf[i]);//二进制
	//console.log(bf[i].toString(16));//十六进制
	console.log(String.fromCharCode(bf[i]));
};*/

/*var str1='miao';
var bf1=new Buffer(str1);
console.log(bf1);
console.log(str1.length);
console.log(bf1.length);
var str2='妙';
var bf2=new Buffer(str2);
console.log(bf2);
console.log(str2.length);
console.log(bf2.length);*/

/*var str='miao味';
console.log(new Buffer(str));
var bf=new Buffer(8);
//bf.write(str);
//bf.write(string[, offset[, length]][, encoding])
//string 要写入bf的字符串
//offset bf对象里开始写入string的位置，默认0
//length 要写入的字节数，默认bf.length-offset
//encoding string的字符编码，默认utf-8
bf.write(str,6,2);
console.log(bf);*/
/*var bf1=new Buffer(2);
bf1.write(str);
console.log(bf1);*/

/*var bf=new Buffer('miaov');
console.log(bf.toString());
console.log(bf.toString('utf-8',1,3));//不包含结束位
*/
var bf1=new Buffer('妙味');
console.log(bf1);
console.log(bf1.toString('UTF-8',1));
console.log(bf1);
