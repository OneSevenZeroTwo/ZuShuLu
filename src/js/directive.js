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
                scope.act = function() {
                    if (scope.title == '取消') {
                        scope.isshowsearch = false;
                    } else if (scope.title == '搜索') {
                        scope.h1 = '#/index/filist/pseek/pop/1/' + scope.text;
                        scope.getfilist('pop')
                    }
                };
                scope.list = [];
                scope.seekmsg = function() {
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
                scope.getfilist = function(sort) {
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
                    }).then(function(err) {

                    })

                }
            }
        }
    }]);

    directive.directive('xswiper', [function() {
        return {
            templateUrl: 'directive/xswiper.html',
            link: function(scope, ele, attr) {
                var swiper = new Swiper('.swiper-container', {
                    pagination: '.swiper-pagination',
                    nextButton: '.swiper-button-next',
                    prevButton: '.swiper-button-prev',
                    paginationClickable: true,
                    //loop:true,
                    spaceBetween: 30,
                    centeredSlides: true,
                    autoplay: 2500,
                    observer: true,
                    autoplayDisableOnInteraction: false
                });
                scope.imgs = [{
                    image: "https://s11.mogucdn.com/mlcdn/c45406/170802_5ke2dgila372491cel6j52i14bikl_750x390.jpg",
                    titel: "盛夏焕新，穿出软萌甜"
                }, {
                    image: "https://s2.mogucdn.com/mlcdn/c45406/170731_0d425k89i1bidh7idkj0cfge32040_750x390.jpg",
                    titel: "子君同款口红 速抢5元优惠券"
                }, {
                    image: "https://s11.mogucdn.com/mlcdn/c45406/170801_2437e9aa5dd30e4dd7ga4fe3hj9c1_750x390.jpg",
                    titel: "全网首发NO.31"
                }, {
                    image: "https://s2.mogucdn.com/mlcdn/c45406/170731_16i1kd6b78il9d15a060i9bek0l03_750x390.jpg",
                    title: "今夏正流行，气质喇叭袖魅力加分"
                }];

            }
        }
    }]);
})();