/*
* @Author: dell
* @Date:   2017-06-02 14:30:18
* @Last Modified by:   dell
* @Last Modified time: 2017-06-16 15:50:24
*/

'use strict';
//应用程序的启动（入口）文件

var express=require('express');
var swig=require('swig');
var mongoose=require('mongoose');
//加载body-parser中间件，用来处理post提交过来的数据(bodyParser中间件用来解析http请求体)
var bodyParser=require('body-parser');
//加载cookies模块
var Cookies=require('cookies');

var User=require('./models/User');

//创建app应用===>node 中http.createServer();
var app=express();


//利用express托管静态文件
//通过 Express 内置的 express.static 可以方便地托管静态文件，例如图片、CSS、JavaScript 文件等。
//将静态资源文件所在的目录作为参数传递给 express.static 中间件就可以提供静态资源文件的访问了
app.use('/public',express.static(__dirname+'/public'));//当用户访问的url以public开始，那么直接返回对应dirname+'public'下的文件

//配置应用模板
//定义当前应用所使用的模板引擎，使用swig.renderFile方法解析后缀为html的文件
//第一个参数：模板引擎的名称，同时也是模板文件的后缀;第二个参数表示用于解析处理模板内容的方法
app.engine('html',swig.renderFile);

//设置模板文件存放的目录,第一个参数必须是views，第二个参数是目录（这个目录设置的是当前app.js同目录下的views目录）
app.set('views','./views');

//注册所使用的模板引擎，第一个参数必须是view engine，第二个参数和app.engine()中定义的第一个参数（模板引擎的名称）一致
app.set('view engine','html');

//在开发过程中，需要取消模板缓存
swig.setDefaults({cache:false})
//为了性能上，使用模板引擎需要注意：第一次读取文件后，会保存到内存（缓存）中，
//当再次访问同样的路径，用同样的模板引擎时，会从已经被解析的内存中解析应用,所以不重启应用时，从缓存中读取的文件没有发生变化，
//当设置cache为false时就不会这样子了

//bodyParser设置
//bodyParser.urlencoded 模块用于解析req.body的数据，解析成功后覆盖原来的req.body，如果解析失败则为 {}
app.use(bodyParser.urlencoded({extended:true}))//bodyParser.urlencoded则是用来解析我们通常的form表单提交的数据

//设置cookie
//中间件
app.use(function(req,res,next){
	req.cookies=new Cookies(req,res);

	//解析登录用户的cookie信息
	req.userInfo={};
	console.log('0:'+req.cookies.get('userInfo'));
	if(req.cookies.get('userInfo')){
		try{
			req.userInfo=JSON.parse(req.cookies.get('userInfo'));
			
			//获取当前登录用户的类型，是否是管理员
			User.findById(req.userInfo._id).then(function(userInfo){
				req.userInfo.isAdmin=Boolean(userInfo.isAdmin);
				console.log('+++++:'+req.userInfo.isAdmin);
				next();
			})
		}catch(e){
			next();
		}
	}else{
		next();
	}
	console.log('1:'+req.userInfo.isAdmin);
	console.log('2:'+req.cookies.get('userInfo'));
	console.log('3:'+typeof(req.cookies.get('userInfo')));
	
})

/*app.get('/',function(req,res,next){
	//res.send('<h1>欢迎登陆我的博客</h1>');

	//读取view目录下的指定文件，解析并返回给客户端，
	//第一个参数表示模板的文件，相对于views目录 views/index.html
	//第二个参数表示传递给模板使用的数据
	res.render('index');
});*/

//根据不同的功能划分模块
app.use('/admin',require('./routers/admin'));
app.use('/api',require('./routers/api'));
app.use('/',require('./routers/main'));

mongoose.connect('mongodb://localhost:27018/blog',function(err){
	if(err){
		console.log(err+'数据库连接失败');
	}else{
		console.log('数据库连接成功');
		//监听http请求
		app.listen(8081);
	}
})



    