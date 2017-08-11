//指令
;(function(){
	var filters = angular.module('filter',[]);
 	filters.filter("subStr",function(){
 		return function(val){
 			return val.slice();
 		}
 	})
})();