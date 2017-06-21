//var React=require('react');
var React=require('react-addons');
var jasmineReact=require('jasmine-react-helpers');
var TestUtils=React.addons.TestUtils;
var Card=require('./Card.jsx');  //如果require的不是node的模块时，需要前面加上./等路径标识（本地文件）

//http://www.cnblogs.com/zhcncn/p/4330112.html   JavaScript单元测试框架-Jasmine
describe('Card component',function(){
	it('should exist',function(){
		var card=TestUtils.renderIntoDocument(<Card></Card>);
		expect(React.findDOMNode(card).textContent).toContain('hello world')
	});
	
})
