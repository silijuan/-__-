/*
* @Author: dell
* @Date:   2017-06-20 14:53:38
* @Last Modified by:   dell
* @Last Modified time: 2017-06-20 14:55:00
*/

'use strict';
var mongoose=require('mongoose');
var categorySchema=require('../schemas/category');

module.exports=mongoose.model('Category',categorySchema);