/*
* @Author: dell
* @Date:   2017-06-05 15:53:17
* @Last Modified by:   dell
* @Last Modified time: 2017-06-20 14:57:30
*/

'use strict';
var express=require('express');
var router=express.Router();
var User=require('../models/User');
var Category=require('../models/Category')

router.use(function(req,res,next){
	console.log('9:'+req.userInfo.isAdmin);
	
	if(!req.userInfo.isAdmin){
		//如果当前用户非管理员
		res.send('对不起，只有管理员才可以进入后台管理页面');
		return;
	}
	next();
})

//首页
router.get('/',function(req,res,next){
	//res.send('后台管理首页');
	res.render('admin/index',{
		userInfo:req.userInfo
	});
})

//用户管理
router.get('/user',function(req,res,next){
	//res.send('用户管理页面');
	
	//从数据库读取所有的用户数据(操作数据库)
	//limit(Number)----> 限制获取的数据条数
	//skip(Number)----> 忽略数据的条数
	/*假如每页显示4条 limit ->4
	第1页：1-4条 skip(0)  0--->(当前页-1)*limit
	第2页：5-8条 skip(4)  4--->(当前页-1)*limit
	第3页：9-12条 skip(8) 8--->(当前页-1)*limit
	*/

	var page=Number(req.query.page||1);//当前页,现在假设当前页为第一页，也可以换成2，3，...
	/*GET /search?q=tobi+ferret
	req.query.q
	=> "tobi ferret"*/
	var limit=4;
	
	var pages=0;
	//需要对页数进行控制
	//req.query.page 我们接收到的这个page值是不允许小于1，大于它的总页数的，
	
	//参考 mongoose文档 http://www.nodeclass.com/api/mongoose.html
	User.count().then(function(count){
		console.log(count);
		//计算总页数
		pages=Math.ceil(count/limit);//向上取整，3.5页即4页
		console.log(pages);
		//控制页数
		page=Math.min(page,pages);//取值不能超过pages总页数
		page=Math.max(page,1);//取值不能小于1
		console.log(page);
		var skip=(page-1)*limit;
		User.find().limit(limit).skip(skip).then(function(users){
			console.log(users);
			res.render('admin/user_index.html',{
				userInfo:req.userInfo,
				users:users,
				//将users用户记录传递给模板user_index.html
				//传递给模板user_index.html  count,limit,pages,page数据
				count:count,
				limit:limit,
				pages:pages,
				page:page
			});
		})
	})      //--->  http://www.nodeclass.com/api/mongoose.html#model-js	
})

//博客分类管理
//分类首页
router.get('/category',function(req,res,next){
	//res.send('博客分类管理首页');		
			res.render('admin/category_index.html',{
				userInfo:req.userInfo,				
			});	
})
//分类的添加
router.get('/category/add',function(req,res,next){
	//res.send('博客分类的添加');	
			res.render('admin/category_add.html',{
				userInfo:req.userInfo,
			});	
})
//分类的保存（表单的提交数据 post）
router.post('/category/add',function(req,res,next){
	//res.send('博客分类的添加');	
			res.render('admin/category_add.html',{
				userInfo:req.userInfo,				
			});
})

module.exports=router;