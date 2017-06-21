/*
* @Author: dell
* @Date:   2017-05-23 13:03:50
* @Last Modified by:   dell
* @Last Modified time: 2017-05-25 15:04:10
*/

'use strict';
//项目自行化----压缩，编译，自动合并

var fs=require('fs');
var filedir='./blog/source';

fs.watch(filedir,function(ev,file){
	//console.log(ev+'/'+file);
	fs.readdir(filedir,function(err,dataList){
		var arr=[];
		dataList.forEach(function(f){
			var info=fs.statSync(filedir+'/'+f);
			//console.log(info);
			//console.log('==================');
			if(info.mode==33206){
				arr.push(filedir+'/'+f);
			}
		});
		console.log(arr);
		var content='';
		arr.forEach(function(f){
			var c=fs.readFileSync(f);
			content+=c.toString()+'\n';
		});
		console.log(content);
		fs.writeFile('./blog/js/index.js',content);  //合并
	})
	
})
