//组件
;
(function() {
    // 头部
    var directive = angular.module('directive', []);
    directive.directive("jheader", ["$http", function($http) {
        return {
            templateUrl: "directive/jheader.html",
            link: function(scope, ele, attr) {
                scope.right_btn = "删除";
                scope.title = "购物车";
                scope.isMaskShow = false;
                scope.headerClick = function() {
                    scope.isMaskShow = true;
                }
            }
        }
    }])
    // 底部
    directive.directive("jfooter", [function() {
        return {
            templateUrl: "directive/jfooter.html",
            link: function(scope, ele, attr) {
                scope.showfoot = function(idx) {
                    scope.isshowfoot = idx;
                }
            }
        }
    }])
    // 遮罩层
    directive.directive("jmask", [function() {
        return {
            templateUrl: "directive/jmask.html",
            link: function(scope, ele, attr) {
                scope.isSure = function() {
                    scope.isMaskShow = false;
                }
                scope.isCancel = function() {
                    scope.isMaskShow = false;
                }
            }
        }
    }])

    directive.directive('xheader', ['$http', '$state', function($http, $state) {
        return {
            templateUrl: 'directive/xheader.html',
            link: function(scope, ele, attr) {
                scope.text = '';
                scope.title = '';
                scope.xh1 = 'javascript:;';
                scope.baseUrl = './data/';
                scope.isshowtsea = true;
                scope.isshowsearch = false;
                scope.showSea = function() {
                    scope.isshowsearch = true;
                    scope.title = '取消';
                };
                scope.showtsea = function() {
                    // console.log('dfs')
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
                    ele.children().children().children().eq(1)[0].focus();
                };
                scope.act = function() {
                    if (scope.title == '取消') {
                        scope.isshowsearch = false;
                    } else if (scope.title == '搜索') {
                        scope.xh1 = '#!/index/filist/pseek/pop/' + scope.text;
                        scope.getfilist('pop')
                    }
                };
                scope.searchlist = [];
                scope.seekmsg = function() {
                    $http({
                        url: scope.baseUrl + 'goodlist.json',
                        method: 'get',

                    }).then(function(data) {
                        scope.all = data.data.RECORDS
                        scope.arr = []
                        for (var i = 0; i < scope.all.length; i++) {
                            if (scope.all[i].title.includes(scope.text)) {
                                // console.log(scope.all[i])
                                scope.arr.push(scope.all[i])
                            }
                        }
                        if (scope.arr.length <= 10) {
                            scope.searchlist = scope.arr;

                        } else {
                            scope.searchlist = scope.arr.slice(0, 10);
                        }
                        // console.log(scope.searchlist)

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
                        scope.all = data.data.RECORDS
                        scope.arr = []
                        for (var i = 0; i < scope.all.length; i++) {
                            if (scope.all[i].sort == $state.sort) {
                                scope.arr.push(scope.all[i])
                            }
                        }
                        scope.list = scope.list.concat(scope.arr.slice(0, 10));
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
                        url: scope.baseUrl + 'active.json',
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
                scope.el.css('width', 1000)
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
                    scope.target[0].style.width = 1360 + 'px'
                    scope.target.on('touchstart', function(data1, eve) {

                        scope.start = data1.changedTouches['0'].pageX;
                        scope.left = this.offsetLeft;
                        scope.self = this;
                        scope.self.ontouchmove = function(data2) {
                            scope.end = data2.changedTouches['0'].pageX;
                            scope.way = scope.left + (scope.end - scope.start);
                            if (scope.way <= document.body.offsetWidth - 1360) {
                                scope.way = document.body.offsetWidth - 1360
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

    directive.directive('xlist', ['$http', '$state', function($http, $state) {
        return {
            templateUrl: 'directive/xlist.html',
            link: function(scope, ele, attr) {
                scope.isshownav = 0;
                scope.isshowmore = false;
                // console.log($state.params)
                scope.shownav = function(num) {
                    scope.plist = [];
                    scope.isshownav = num;
                    scope.getlist(1);

                };
                scope.getlist = function(page) {
                    scope.isshowmore = true;
                    $http({
                        method: 'get',
                        url: scope.baseUrl +
                            'goodlist.json',
                    }).then(function(data) {
                        scope.all = data.data.RECORDS;
                        scope.arr = []
                        if (attr.type == 'home') {
                            scope.h1 = '#!/index/home/list/pop';
                            scope.h2 = '#!/index/home/list/sell';
                            scope.h3 = '#!/index/home/list/new';
                            for (var i = 0; i < scope.all.length; i++) {
                                if (scope.all[i].sort == $state.params.sort) {
                                    scope.arr.push(scope.all[i])
                                }
                            };
                            window.onscroll = function() {
                                if (window.scrollY >= 2490) {
                                    scope.isontop = true;
                                } else {
                                    scope.isontop = false;
                                }
                            }

                        } else if (attr.type == 'sou') {
                            scope.h1 = '#!/index/filist/pseek/pop/' + $state.params.title;
                            scope.h2 = '#!/index/filist/pseek/sell/' + $state.params.title;
                            scope.h3 = '#!/index/filist/pseek/new/' + $state.params.title;
                            for (var i = 0; i < scope.all.length; i++) {
                                if (scope.all[i].sort == $state.params.sort && scope.all[i].title.includes($state.params.title)) {
                                    // console.log()
                                    scope.arr.push(scope.all[i])
                                }
                            };

                        }
                        scope.start = page * 10;
                        scope.end = scope.start + 10;
                        // scope.plist = scope.arr.slice(0, 10);
                        scope.isshowmore = false;
                        if (scope.end < scope.arr.length) {
                            scope.plist = scope.plist.concat(scope.arr.slice(scope.start, scope.end))
                        } else {
                            scope.wasmore = false;
                            scope.isnone = true
                        }
                    });
                };


                if ($state.params.sort == 'pop') {
                    scope.isshownav = 0;
                } else if ($state.params.sort == 'sell') {
                    scope.isshownav = 1;
                } else if ($state.params.sort == 'new') {
                    scope.isshownav = 2;
                }
                scope.shownav(scope.isshownav);

            }
        }
    }]);

    directive.directive('xclist', [function() {
        return {
            templateUrl: './template/route/xclist.html',
            link: function(scope, ele, attr) {
                // console.log(attr, ele)
            }
        }
    }]);

    directive.directive('xfooter', ['$state', function($state) {
        return {
            templateUrl: './directive/xfooter.html',
            link: function(scope, ele, attr) {
                scope.isshowfoot = 1;
                scope.showfoot = function(num) {
                    if (num == 1) {
                        scope.isshowsearch = false;
                    }
                    scope.isshowfoot = num;
                    // if (num == 1) {
                    //     scope = false
                    // }
                    // console.log(this.isshowfoot)
                };
                if ($state.current.url == '/list/:sort') {
                    scope.isshowfoot = 1;

                } else if ($state.current.url == '/category') {
                    scope.isshowfoot = 2;
                } else if ($state.current.url == '/car') {
                    scope.isshowfoot = 3;
                } else if ($state.current.url == '/mycenter') {
                    scope.isshowfoot = 4;
                }

            }
        }
    }]);

    directive.directive('xsearch', [function() {
        return {
            templateUrl: './directive/xsearch.html',
            link: function(scope, ele, attr) {
                scope.isnone = false;
                scope.page = 1;
                window.onscroll = function() {
                    // console.log(document.body.offsetHeight - window.scrollY)
                    if (document.body.offsetHeight - window.scrollY == 587) {
                        scope.page++;
                        console.log(scope.page)
                        scope.getlist(scope.page);
                    }

                }
            }
        }
    }])
    
    //分类1
    directive.directive('xcategory', ['$http', function($http) {
        return {
            templateUrl: 'directive/xcategory.html',
            link: function(scope, ele, attr) {
                scope.getNews = function() {
                    $http({
                        method: 'get',
                        url: './data/sort.json',
                    }).then(function(data) {
//                      console.log(data)
                        scope.rus = data.data.value
//                      console.log(scope.rus)
                    })
                };
               scope.getNews();
                
            }
        }
    }]);
    
    //分类2
    directive.directive('xsubcategory', ['$http', function($http) {
        return {
            templateUrl: 'directive/xsubcategory.html',
            link: function(scope, ele, attr) {
                scope.getChar = function() {
                    $http({
                        method: 'get',
                        url: './data/sort.json',
                    }).then(function(data) {
//                      console.log(data)
                        scope.news = data.data.value[0].list
                        scope.chars = data.data.value[0].flist
//                      console.log(scope.news)
                    })
                };
               scope.getChar();
//             scope.goToDetail = function(pid) {
//					$window.location.href = "#!/subcategory/" + pid
//				}    
            }
        }
    }]);
    
    //列表
    directive.directive('xlisted', ['$http', function($http) {
        return {
            templateUrl: 'directive/xlisted.html',
            link: function(scope, ele, attr) {
                scope.getBuy = function() {
                    $http({
                        method: 'get',
                        url: './data/goodlist.json',
                    }).then(function(data) {
//                      console.log(data)
                        scope.choose = data.data.RECORDS
//                      console.log(scope.choose)
                    })
                };
               scope.getBuy();
                
            }
        }
    }]);

    
    //详情
    directive.directive('xdetail', ['$http', function($http) {
        return {
            templateUrl: 'directive/xdetail.html',
            link: function(scope, ele, attr) {
                scope.getSort = function() {
                    $http({
                        method: 'get',
                        url: './data/goodlist.json',
                    }).then(function(data) {
                       data.data.RECORDS.forEach((item) => {
//                     	console.log(scope.gooding.iid)
                        if (item.iid == scope.$resolve.$stateParams.iid) {
                            scope.gooding = item;
//                          console.log(scope.gooding)
                            scope.carousel = item.carousel.split(",");
                            scope.detailImage = item.imgAll.split(",");
//                          console.log(scope.detailImage)
                        }
                       })
                    })
                };
               scope.getSort();
               var swiper = new Swiper('.swiper-container', {
                      observer: true,
                });
                scope.setChar = function(good){
                	switch(good){
                		  case 1:
                		  document.body.scrollTop = document.querySelector('.panel_a').offsetTop;
                		  break;
                		  case 2:
                		  document.body.scrollTop = document.querySelector('.panel_b').offsetTop;
                		  break;
                		  case 3:
                		  document.body.scrollTop = document.querySelector('.panel_c').offsetTop;
                		  break;
                		  case 4:
                		  document.body.scrollTop = document.querySelector('.panel_d').offsetTop;
                		  break;
                	}
                }
            }
        }
    }]);


})();