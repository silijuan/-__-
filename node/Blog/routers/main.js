/*
* @Author: dell
* @Date:   2017-06-05 15:54:06
* @Last Modified by:   dell
* @Last Modified time: 2017-06-16 14:20:41
*/

'use strict';
var express=require('express');
var router=express.Router();

router.get('/',function(req,res,next){
	//res.send('Main-User');
	console.log('4:'+req.userInfo);
	res.render('main/index.html',{
		userInfo:req.userInfo
	});
	//res.render('main/index'); html后缀可以省略
	
});
module.exports=router;