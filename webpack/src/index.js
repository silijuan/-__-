/*
* @Author: dell
* @Date:   2017-05-26 12:50:12
* @Last Modified by:   dell
* @Last Modified time: 2017-05-26 13:00:49
*/

'use strict';
import _ from 'lodash'
function component(){
	var element=document.createElement('div');
	element.innerHTML=_.join(['hello','world'],',');
	return element;
}
document.body.appendChild(component());