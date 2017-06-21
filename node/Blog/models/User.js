/*
* @Author: dell
* @Date:   2017-06-06 10:13:31
* @Last Modified by:   dell
* @Last Modified time: 2017-06-08 15:09:14
*/

'use strict';
var mongoose=require('mongoose');
var usersSchema=require('../schemas/users');

module.exports=mongoose.model('User',usersSchema);//将该schema发布为Model（返回UserModel）
/*
Schema ： 一种以文件形式存储的数据库模型骨架，不具备数据库的操作能力

Model ： 由Schema发布生成的模型，具有抽象属性和行为的数据库操作对

Entity ： 由Model创建的实体，他的操作也会影响数据库

Schema、Model、Entity的关系请牢记，Schema生成Model，Model创造Entity，
Model和Entity都可对数据库操作造成影响，
但Model比Entity更具操作性。
*/