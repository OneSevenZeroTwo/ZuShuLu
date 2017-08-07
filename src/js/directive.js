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

    directive.directive('xclient', ['$http', function($http) {
        return {
            templateUrl: 'directive/xclient.html',
            link: function(scope, ele, attr) {
                scope.getActive = function() {
                    $http({
                        method: 'get',
                        url: './data/active.json',
                    }).then(function(data) {
                        scope.special = data.data.flist.slice(0, 4);
                        scope.liactive = data.data.olist;
                    })
                };
                scope.getActive()

            }
        }
    }]);

    directive.directive('xmove', ['$interval', function($interval) {
        return {
            templateUrl: 'directive/xmove.html',
            link: function(scope, ele, attr) {
                scope.fl = ele.children().eq(0).children().eq(0);
                // console.log(scope.fl)
                // 限时抢购
                scope.time = new Date();
                scope.time = scope.time.setHours(scope.time.getHours() + 5);
                scope.ss = 1;
                scope.timer = $interval(function() {
                    scope.now = Date.parse(new Date());
                    // 小时
                    scope.hour = Math.floor((scope.time - scope.now) / 1000 / 60 / 60 % 60) + '';
                    if (scope.hour.length == 1) {
                        scope.hour = '0' + scope.hour
                    }
                    // 分钟
                    scope.min = Math.floor((scope.time - scope.now) / 1000 / 60 % 60) + '';
                    if (scope.min.length == 1) {
                        scope.min = '0' + scope.min
                    }
                    // 秒
                    scope.se = Math.floor((scope.time - scope.now) / 1000 % 60) + '';
                    if (scope.se.length == 1) {
                        scope.se = '0' + scope.se
                    }

                    // 毫秒
                    scope.ss++;
                    if (scope.ss == 100) {
                        scope.ss = 1;
                    }
                    scope.ss = scope.ss + '';
                    if (scope.ss.length == 1) {
                        scope.ss = '0' + scope.ss
                    }

                    scope.t1 = scope.hour[0];
                    scope.t2 = scope.hour[1];
                    scope.t3 = scope.min[0];
                    scope.t4 = scope.min[1];
                    scope.t5 = scope.se[0];
                    scope.t6 = scope.se[1];
                    scope.t7 = scope.ss[0];
                    scope.t8 = scope.ss[1];
                }, 10)
                // 移动动画
                scope.ways = null;
                scope.el = ele.children().eq(0).children().eq(1);
                scope.el.on('touchstart', function(data1, eve) {
                    scope.start = data1.changedTouches['0'].pageX;
                    scope.left = scope.el[0].offsetLeft;
                    // console.log(scope.left)
                    scope.el.on('touchmove', function(data2) {
                        scope.end = data2.changedTouches['0'].pageX;
                        scope.way = scope.left + (scope.end - scope.start);
                        if (scope.way <= document.body.offsetWidth - 1000) {
                            scope.way = document.body.offsetWidth - 1000
                        }
                        if (scope.way >= 0) {
                            scope.way = 0
                        }
                        scope.el[0].style.left = scope.way + 'px'
                    })
                })
            }
        }
    }]);

    directive.directive('xpassembly', ['$http', function($http) {
        return {
            templateUrl: 'directive/xpassembly.html',
            link: function(scope, ele, attr) {
                scope.getWell = function() {
                    $http({
                        method: 'get',
                        url: './data/well.json',
                    }).then(function(data) {
                        scope.well1Img = data.data.data['0'].image;
                        scope.well2Img = data.data.data2['0'].image;
                        scope.well3Img = data.data.data3['0'].image;
                        scope.aswell1 = data.data.data['0'].goodsList.slice(0, 12);
                        scope.aswell2 = data.data.data2['0'].goodsList.slice(0, 12);
                        scope.aswell3 = data.data.data3['0'].goodsList.slice(0, 12);
                    })
                };
                scope.getWell();
                // 动画
                scope.tar = ele.children().children();
                scope.ways = null;
                for (let i = 1; i < scope.tar.length - 1; i++) {
                    scope.target = scope.tar.eq(i).children().eq(1).children();
                    scope.target.on('touchstart', function(data1, eve) {
                        scope.start = data1.changedTouches['0'].pageX;
                        scope.left = this.offsetLeft;
                        scope.self =this;
                        scope.self.ontouchmove=function(data2) {
                            scope.end = data2.changedTouches['0'].pageX;
                            scope.way = scope.left + (scope.end - scope.start);
                            if (scope.way <= document.body.offsetWidth - 1000) {
                                scope.way = document.body.offsetWidth - 1000
                            }
                            if (scope.way >= 0) {
                                scope.way = 0
                            }
                            scope.self.style.left = scope.way + 'px'
                        }
                    })

                }
            }
        }
    }]);

    // directive.directive('')


})();