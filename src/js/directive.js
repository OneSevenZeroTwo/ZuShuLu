//组件
;
(function() {
    var directive = angular.module('directive', []);
    directive.directive('xheader', ['$http', function($http) {
        return {
            templateUrl: 'directive/xheader.html',
            link: function(scope, ele, attr) {
                scope.text = '';
                scope.title = '';
                scope.h1 = 'javascript:;';
                scope.baseUrl = './data/'
                scope.showSea = function() {
                    scope.isshowsearch = true;
                    scope.title = '取消';
                };
                scope.showtsea = function() {
                    if (scope.text.length > 0) {
                        scope.isshowtsea = false;
                        scope.title = '搜索';
                        scope.seekmsg()
                    } else {
                        scope.isshowtsea = true;
                        scope.title = '取消';

                    }
                };
                scope.hidetsea = function() {
                    scope.text = '';
                    scope.isshowtsea = true;
                };
                scope.act() {
                    if (scope.title == '取消') {
                        scope.isshowsearch = false;
                    } else if (scope.title == '搜索') {
                        scope.h1 = '#/index/filist/pseek/pop/1/' + scope.text;
                        scope.getfilist('pop')
                    }
                };
                scope.list = [];
                scope.seekmsg() {
                    $http({
                        url: scope.baseUrl + 'goodlist.json',
                        method: 'get',

                    }).then(function(data) {
                        var all = data.data.RECORDS
                        var arr = []
                        console.log(scope.text)
                        for (var i = 0; i < all.length; i++) {
                            if (all[i].title.includes(scope.text)) {
                                // console.log(all[i])
                                arr.push(all[i])
                            }
                        }
                        if (arr.length <= 10) {
                            scope.list = data.data.list;
                            // console.log(scope.searchlist)
                        } else {
                            scope.searchlist = arr.slice(0, 10);
                        }
                    }).then(function(err) {

                    })
                };
                scope.getfilist(sort) {
                    scope.list = [];
                    var title;
                    $http({
                        url: scope.baseUrl + 'goodlist.json',
                        method: 'get',

                    }).then(function(data) {
                        var all = data.data.RECORDS
                        var arr = []
                        for (var i = 0; i < all.length; i++) {
                            if (all[i].sort == this.$route.params.sort) {
                                arr.push(all[i])
                            }
                        }
                        scope.list = scope.list.concat(arr.slice(0, 10));
                    }).then(function(err){
                    	
                    })
                    
                }
            }
        }
    }]);
})();