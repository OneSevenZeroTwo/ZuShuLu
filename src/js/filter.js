//指令
;(function(){
	var filter = angular.module('filter',[]);
	// 显示是个字
	filter.filter('ten',function(){
		return function(data){
			return data.slice(0,10)
		}
	})
})();