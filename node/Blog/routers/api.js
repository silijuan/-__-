/*
* @Author: dell
* @Date:   2017-06-05 15:53:58
* @Last Modified by:   dell
* @Last Modified time: 2017-06-16 16:10:57
*/

'use strict';
var express=require('express');
var router=express.Router();
var User=require('../models/User');//通过模型类操作数据库(返回的是一个构造函数)

//统一返回格式
var responseData;
router.use(function(req,res,next){
	responseData={
		//初始化，没有错误时返回0
		code:0,
		message:''
	};
	next();
})

//用户注册
/*注册逻辑
1.用户名不能为空
2.密码不能为空
3.两次密码输入必须一致

需要数据库操作
1.用户名是否已经被注册了  ---数据库查询
2.
*/
router.post('/user/register',function(req,res,next){
	//console.log(req.body);//获取到前端post提交过来的数据
	var username=req.body.username;
	var password=req.body.password;
	var repassword=req.body.repassword;

	//用户名是否为空
	if(username==''){
		responseData.code=1;
		responseData.message='用户名不能为空';
		res.json(responseData);//会把数据（responseData这个对象）转化为json格式返回前端
		return;
	}
	//密码不能为空
	if(password==''){
		responseData.code=2;
		responseData.message='密码不能为空';
		res.json(responseData);
		return;
	}
	//两次输入密码必须一致
	if(password!=repassword){
		responseData.code=3;
		responseData.message='两次输入密码必须一致';
		res.json(responseData);
		return;
	}

	//用户名是否已经被注册了，如果数据库中已经存在和我们要注册的用户同名的数据，表示该用户名已经被注册了
	User.findOne({
		username:username
	}).then(function(userInfo){
		console.log(userInfo);//为null时，表示数据库不存在同名的数据
		if(userInfo){
			//表示数据库中存在同名数据
			responseData.code=4;
			responseData.message='用户名已经被注册';
			res.json(responseData);
			return;
		}

		//保存用户注册的信息到数据库中
		var user=new User({
			username:username,
			password:password
		});
		return user.save();
	}).then(function(newUserInfo){
		console.log('6:'+newUserInfo);
		responseData.message='注册成功';
		res.json(responseData);
	});


});


//登录
router.post('/user/login',function(req,res,next){
	//console.log(req.body);//获取到前端post提交过来的数据
	var username=req.body.username;
	var password=req.body.password;	

	if(username==''||password==''){
		responseData.code=1;
		responseData.message='用户名或密码不能为空';
		res.json(responseData);//会把数据（responseData这个对象）转化为json格式返回前端
		return;
	}

	//查询数据库中相同用户名和密码的记录是否存在，如果存在则登录成功	
	User.findOne({
		username:username,
		password:password
	}).then(function(userInfo){
		console.log('5:'+userInfo);
		/*例如这种形式
		{ _id: 539085aa8abcc1a838389be2,
		username: 'slj',
		password: '123'
		__v: 0 }*/	

		if(!userInfo){			
			responseData.code=2;
			responseData.message='用户名或密码错误';
			res.json(responseData);
			return;
		}
		//用户名和密码都是正确的
		responseData.message='登录成功';
		//用户信息
		responseData.userInfo={
			_id:userInfo._id,
			username:userInfo.username
		};
		req.cookies.set('userInfo',JSON.stringify({
			_id:userInfo._id,
			username:userInfo.username
		}));
		res.json(responseData); //返回给前端
		return;	
	});

//退出
router.get('/user/logout',function(req,res,next){
	req.cookies.set('userInfo',null);
	//responseData.message='退出';
	res.json(responseData);
	
})

});

module.exports=router;