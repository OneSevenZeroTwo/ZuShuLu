//指令
;(function(){
	var service = angular.module('filter',[]);
	service.filter("html", ["$sce", function($sce) {
		return function(input) {
			return $sce.trustAsHtml(input);
		}
	}]);
	
	service.filter("wang", [function() {
		return function(input) {
			return input.split('=')[1].split('&')[0]
			
		}
	}])
    
    service.filter("yang", [function() {
		return function(input) {
			return input.split('=')[1].split('&')[0]
			
		}
	}])
    
    service.filter("hang", [function() {
		return function(input) {
			return input.split('=')[1].split('&')[0]
			
		}
	}])
})();