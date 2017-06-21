/*
* @Author: dell
* @Date:   2017-06-07 14:28:36
* @Last Modified by:   dell
* @Last Modified time: 2017-06-16 14:10:06
*/

'use strict';
$(function(){
	var loginBox=$('#loginBox');
	var registerBox=$('#registerBox');
	var userInfo=$('#userInfo');

	//点击注册，切换到注册页
	loginBox.find('a.colMint').click(function(){
		registerBox.show();
		loginBox.hide();
	});

	//点击登录，切换到登录页
	registerBox.find('a.colMint').click(function(){
		registerBox.hide();
		loginBox.show();
	});

	//注册
	registerBox.find('button').click(function() {		
		//通过ajax提交
		$.ajax({
			type:'post',
			//ajax默认提交方式是get
			url:'/api/user/register',
			data:{
				username:registerBox.find('[name="username"]').val(),
				password:registerBox.find('[name="password"]').val(),
				repassword:registerBox.find('[name="repassword"]').val(),
			},
			dataType:'json',
			success:function(res){
				console.log(res);
				registerBox.find('.colWarning').html(res.message);
				if(!res.code){
					//code 为0 理解？
					//注册成功
					setTimeout(function(){
						registerBox.hide();
						loginBox.show();
					}, 1000)
				}

			}
		})
	});

	//登录
	loginBox.find('button').click(function() {		
		//通过ajax提交
		$.ajax({
			type:'post',
			//ajax默认提交方式是get
			url:'/api/user/login',
			data:{
				username:loginBox.find('[name="username"]').val(),
				password:loginBox.find('[name="password"]').val(),				
			},
			dataType:'json',
			success:function(res){
				console.log(res);
				loginBox.find('.colWarning').html(res.message);
				if(!res.code){
					
					//登录成功
					/*setTimeout(function(){						
						loginBox.hide();
						userInfo.show();

						//显示登录用户的信息
						userInfo.find('.username').html(res.userInfo.username);
						userInfo.find('.info').html('你好，欢迎光临我的博客');
					}, 1000)*/
					window.location.reload();
				}

			}
		})
	});


	//退出
	$('#logout').click(function(){
		
		$.ajax({	

			//ajax默认提交方式是get
			url:'/api/user/logout',			
			
			success:function(res){
				if(!res.code){									
					window.location.reload();
				}
			}
		})
	})
})