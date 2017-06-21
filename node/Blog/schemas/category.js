/*
* @Author: dell
* @Date:   2017-06-20 14:51:48
* @Last Modified by:   dell
* @Last Modified time: 2017-06-20 14:52:53
*/

'use strict';
var mongoose=require('mongoose');

//分类的表结构
module.exports=new mongoose.Schema({
	name:String //分类名称
	
});