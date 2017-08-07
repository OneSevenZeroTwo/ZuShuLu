//路由
;
(function() {
    var route = angular.module('route', []);
    route.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when("", "/index/home/list/pop/1");
        $stateProvider.state('index', {
                url: '/index',
                templateUrl: './template/index.html'
            }).state('index.home', {
                url: '/home',
                templateUrl: './template/route/home.html'
            }).state('index.home.list', {
                url: '/list/:sort/:page',
                templateUrl: ''
            }).state('index.category', {
                url: '/category',
                templateUrl: ''
            }).state('index.filist', {
                url: '/filist',
                templateUrl: ''
            }).state('index.filist.pseek', {
                url: '/pseek/:sort/:page/:title',
                templateUrl: ''
            })

            .state('subCategory', {
                url: '/subCategory/:pid',
                templateUrl: '',
            })

            .state('login', {
                url: '/login',
                templateUrl: '',
            })

            .state('car', {
                url: '/car',
                templateUrl: './template/car.html',
            }).state('address', {
                url: '/address',
                templateUrl: './template/address.html',
            }).state('addaddr', {
                url: '/addaddr',
                templateUrl: './template/addaddr.html',
            })

            .state('reg', {
                url: '/reg',
                templateUrl: '',
            }).state('reg.step1', {
                url: '/step1',
                templateUrl: '',
            }).state('reg.step2', {
                url: '/step2/:phone',
                templateUrl: '',
            })

            .state('mycenter', {
                url: '/mycenter',
                templateUrl: '',
            })
            .state('mycollect', {
                url: '/mycollect',
                templateUrl: '',
            })

            .state('listed', {
                url: '/listed/:pcid',
                templateUrl: '',
            })

            .state('detail', {
                url: '/detail/:iid',
                templateUrl: '',
            })
            
            .state('listing', {
                url: '/listing/:pcid',
                templateUrl: '',
            })
    })
})();