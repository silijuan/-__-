/*
* @Author: dell
* @Date:   2017-05-19 16:46:46
* @Last Modified by:   dell
* @Last Modified time: 2017-05-23 13:01:57
*/

'use strict';

//自动化构建项目
var projectData={
	'name':'blog',
	'fileData':[
		{
			'name':'js',
			'type':'dir'
		},{
			'name':'css',
			'type':'dir'
		},{
			'name':'img',
			'type':'dir'
		},{
			'name':'index.html',
			'type':'file',
			'content':''
		}]
};

var fs=require('fs');
if(projectData.name){
	fs.mkdirSync(projectData.name);

	var fileData=projectData.fileData;
	
	if(fileData&&fileData.forEach){
		fileData.forEach(function(f){
            
            f.path=projectData.name+'/'+f.name;
            f.content=f.content||'';
            switch(f.type){
            	case 'dir':
            		fs.mkdirSync(f.path);
            		break;
            	case 'file':
            		fs.writeFileSync(f.path,f.content);
            	default:
            		break;
            }
		})
	}
}