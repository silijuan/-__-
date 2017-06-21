/*
* @Author: dell
* @Date:   2017-06-05 16:30:22
* @Last Modified by:   dell
* @Last Modified time: 2017-06-12 11:48:30
*/

'use strict';
var mongoose=require('mongoose');

//用户的表结构
module.exports=new mongoose.Schema({
	username:String,
	password:String,
	//是否是管理员
	isAdmin:{
		type:Boolean,
		default:false
	}
});//返回UserSchema