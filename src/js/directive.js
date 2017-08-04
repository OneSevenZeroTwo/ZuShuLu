//组件
;(function(){
	// 头部
	var directive = angular.module('directive',[]);
	directive.directive("jheader",["$http",function($http){
 		return	{
 			templateUrl:"directive/jheader.html",
 			link:function(scope,ele,attr){
 				scope.right_btn = "删除";
 				scope.title = "购物车";
				scope.isMaskShow = false;
 				scope.headerClick = function(){
 					scope.isMaskShow = true;
 				}
 			}
 		}
	}])
	// 底部
	directive.directive("jfooter",[function(){
 		return	{
 			templateUrl:"directive/jfooter.html",
 			link:function(scope,ele,attr){
 				scope.showfoot = function(idx){
 					scope.isshowfoot = idx;
 				}
 			}
 		}
	}])
	// 遮罩层
	directive.directive("jmask",[function(){
 		return	{
 			templateUrl:"directive/jmask.html",
 			link:function(scope,ele,attr){
 				scope.isSure = function(){
 					scope.isMaskShow = false;
 				}
 				scope.isCancel = function(){
 					scope.isMaskShow = false;
 				}
 			}
 		}
	}])

})();