//组件
;
(function() {
	var directive = angular.module('directive', []);

	// 头部
	directive.directive("jheader", ["$http", function($http) {
		return {
			templateUrl: "directive/jheader.html",
			link: function(scope, ele, attr) {
				//console.log(scope.$resolve.$$state.url.sourcePath,ele);
				scope.isMaskShow = false;
				switch(scope.$resolve.$$state.url.sourcePath) {
					case "/car":
						scope.right_btn = "删除";
						scope.title = "购物车";
						scope.headerClick = function() {
							scope.isMaskShow = true;
							scope.AreYouSure = "确定要删除选中商品吗";
							scope.isSure = function() {
								scope.isMaskShow = false;
								scope.carList.forEach((item, index) => {
									scope.carList.splice(index, 1);
								})
							}
						}
						break;
					case "/order":
						scope.right_btn = "订单确认";
						scope.title = "我的订单";
						scope.headerClick = function() {
							window.location.href = "#!/mycenter";
						}
						break;
					case "/address":
						scope.right_btn = "新增";
						scope.title = "收货地址";
						scope.headerClick = function() {
							window.location.href = "#!/addaddress";
						}
						break;
					case "/addaddress":
						scope.right_btn = "保存";
						scope.title = "收货地址";
						scope.headerClick = function() {
							window.location.href = "#!/address";
						}
						break;
				}
			}
		}
	}])

	// 购物车列表
	directive.directive("jcarlist", ["$http", "$timeout", function($http, $timeout) {
		return {
			templateUrl: "directive/jcarlist.html",
			link: function(scope, ele, attr) {
				scope.baseUrl = "./data/";
				scope.isPrompt = false;

				scope.carList = null;
				if(document.cookie.split("=")[1]) {
					$http({
						method: "GET",
						url: scope.baseUrl + "carlist.json"
					}).then((res) => {
						scope.carList = res.data.data;

						// 选中项 数组长度
						scope.isCheck = scope.carList.map((item) => {
							return item.id;
						})
						scope.len = scope.carList.length;

						scope.total(scope.carList);
						if(scope.carList.length > 0) {
							scope.carListNone = true;
							scope.carListShow = true;
						} else {
							scope.carListNone = false;
						}
					})
				} else {
					scope.isMaskShow = true;
					scope.AreYouSure = "非常抱歉，您还未登陆，请先登录后查看";
					scope.isSure = function() {
						scope.isMaskShow = false;
						window.location.href = "#!/mycenter";
					}
					scope.isCancel = function() {
						scope.isMaskShow = false;
						window.location.href = "#!/index";
					}
				}

				// 收起/显示列表
				scope.isCarListShow = function() {
					scope.carListShow = !scope.carListShow;
				}

				// 选项（初始为选中状态）
				scope.isallcheck = true;
				scope.isChecked = true;
				scope.isCheck = [];

				// 单选/多选
				scope.ischecked = function(lid, isChecked) {
					// console.log("个选",isChecked, scope.len)
					if(isChecked) {
						// 如果选中，把该项加入数组
						scope.isCheck.splice(0, 0, lid);

						if(scope.isCheck.length == scope.len) {
							scope.isChecked = true;
						} else {
							scope.isChecked = false;
						}

						// 如果选中项长度 == 列表长度，则勾选全选
						if(scope.isCheck.length == scope.carList.length) {
							scope.isallcheck = true;
						} else {
							scope.isallcheck = false;
						}
					} else {
						// 如果有一个不选，则取消勾选全选
						scope.isallcheck = false;
						//取消选中,从数组中删除该项
						scope.isCheck.forEach((item, idx) => {
							if(lid == item) {
								scope.isCheck.splice(idx, 1);
							}
						});
					}
				}

				// 全选/全不选
				scope.selected = function() {
					// 如果全选,则全部为选中状态,往数组里添加选中项。如果全不选则清空数组
					scope.isallcheck = !scope.isallcheck;
					// console.log("全选",scope.isallcheck);
					if(scope.isallcheck) {
						scope.isCheck = scope.carList.map((item) => {
							return item.id;
						});
					} else {
						scope.isCheck = [];
					}
				}

				// 监听选中项，计算数量、价格
				scope.$watch("isCheck", function(newVal, oldVal, scope) {

					// 点击全选，所有id会加入到选中项数组
					// 如果选中项数组中有当前id，就为选中状态
					scope.checkeds = function(id) {
						return newVal.indexOf(id) != -1;
					}
					// 运行计算函数
					scope.total(newVal);
				}, true)

				// 计算总价/总数
				scope.total = function(isCheck) {
					scope.totalPrice = 0;
					scope.totalNum = 0;
					isCheck.forEach((item) => {
						scope.carList.forEach((data) => {
							if(item == data.id) {
								scope.totalPrice += data.price * data.num;
								scope.totalNum += data.num;
							}
						})
					})
					return {
						totalPrice: scope.totalPrice,
						totalNum: scope.totalNum,
					}
				}

				//去订单页
				scope.toPayment = function() {
					window.location.href = "#!/order";
				}

				// 删除单个商品
				scope.delList = true;
				scope.isDelList = function(index) {
					scope.isMaskShow = true;
					scope.AreYouSure = "确定要删除该商品吗";
					scope.isSure = function() {
						scope.isMaskShow = false;
						scope.carList.splice(index, 1);
						scope.isCheck = scope.carList.map((item) => {
							return item.id;
						});
					}
					scope.isCancel = function() {
						scope.isMaskShow = false;
						return false;
					}
				}

				// 数量+/-
				scope.changeNum = function(index, yorn) {
					if(yorn == 1) {
						scope.carList[index].num++;
						if(scope.carList[index].num > 100) {
							scope.carList[index].num = 100;
							scope.promptCont = "商品数量不能大于100"
							scope.promptShow();
						}
						scope.total(scope.isCheck);
					} else if(yorn == -1) {
						scope.carList[index].num--;
						if(scope.carList[index].num < 1) {
							scope.carList[index].num = 1;
							scope.promptCont = "商品数量不能小于1"
							scope.promptShow();
						}
						scope.total(scope.isCheck);
					}
				}

				// 提示信息
				scope.promptShow = function() {
					scope.isPrompt = true;
					clearTimeout(timeout);
					var timeout = $timeout(function() {
						scope.isPrompt = false;
					}, 1500);
				}
			}
		}
	}])

	// 订单页
	directive.directive("jorder", ["$http", function($http) {
		return {
			templateUrl: "directive/jorder.html",
			link: function(scope, ele, attr) {
				scope.isDate = new Date();
				scope.hasAddresss = false;
				scope.baseUrl = "./data/";

				// 提交订单
				scope.tj = function() {
					// 在此页面停留不足5s可以跳转支付，5s之后不能提交，返回购物车页
					scope.s = Date.parse(new Date()) - Date.parse(scope.isDate);
					if(scope.s < 5000) {
						console.log("666")
					} else {
						scope.isMaskShow = true;
						scope.AreYouSure = "非常抱歉，您的下单信息已失效，请重新返回商品详情页或购物车再次下单";
						scope.isSure = function() {
							scope.isMaskShow = false;
							window.location.href = "#!/car";
						}
						scope.isCancel = function() {
							scope.isMaskShow = false;
							window.location.href = "#!/car";
						}
					}
				}

				// 进入页面判断是否登录
				if(document.cookie.split("=")[1]) {
					$http({
						method: "GET",
						url: scope.baseUrl + "carlist.json"
					}).then((res) => {
						scope.orderList = res.data.data;
						//console.log(scope.orderList)

						// 计算总价
						scope.totalPrice = 0
						scope.orderList.map((item) => {
							scope.totalPrice += item.price * item.num;
						})
					})
				} else {
					scope.isMaskShow = true;
					scope.AreYouSure = "非常抱歉，您还未登陆，请先登录后查看";
					scope.isSure = function() {
						scope.isMaskShow = false;
						window.location.href = "#!/mycenter";
					}
					scope.isCancel = function() {
						scope.isMaskShow = false;
						window.location.href = "#!/index";
					}
				}

				// 收货地址
				$http({
					method: "GET",
					url: scope.baseUrl + "addresslist.json"
				}).then((res) => {
					scope.addrLists = res.data.data;
					if(scope.addrLists.length < 0) {
						scope.hasAddresss = false;
					} else {
						scope.hasAddresss = true;
						scope.addrLists.forEach((item) => {
							if(item.isDefault == 1) {
								scope.addrList = item;
							}
						})
					}
				})

				// 收货地址列表
				scope.toAddress = function() {
					window.location.href = "#!/address";
				}
			}
		}
	}])

	// 地址列表
	directive.directive("jaddress", ["$http", function($http) {
		return {
			templateUrl: "directive/jaddress.html",
			link: function(scope, ele, attr) {
				scope.baseUrl = "./data/";

				// 进入页面判断是否登录
				if(document.cookie.split("=")[1]) {
					$http({
						method: "GET",
						url: scope.baseUrl + "addresslist.json"
					}).then((res) => {
						scope.addressList = res.data.data;
						//console.log(scope.addressList)
					})
				} else {
					scope.isMaskShow = true;
					scope.AreYouSure = "非常抱歉，您还未登陆，请先登录后查看";
					scope.isSure = function() {
						scope.isMaskShow = false;
						window.location.href = "#!/mycenter";
					}
					scope.isCancel = function() {
						scope.isMaskShow = false;
						window.location.href = "#!/index";
					}
				}

				// 点击修改地址
				scope.modthis = function(id) {
					scope.addrId = id;
				}
			}
		}
	}])

	// 添加地址
	directive.directive("jaddaddress", ["$http", "$state", function($http, $state) {
		return {
			templateUrl: "directive/jaddaddress.html",
			link: function(scope, ele, attr) {
				scope.baseUrl = "./data/";
				scope.isAddrBtnShow = false;

				scope.isPidShow = true;
				scope.isCidShow = true;
				scope.isDidShow = true;

				// 进入页面判断是否登录
				if(document.cookie.split("=")[1]) {

					scope.citylist = [];
					// 获取城市列表
					$http({
						method: "GET",
						url: scope.baseUrl + "city.json"
					}).then((res) => {
						scope.citylist = res.data.result.location;
						// 获取省
						scope.province = scope.citylist[0];
					})

					// 根据省 获取市
					scope.$watch("addressPid", function(newVal, oldVal, scope) {
						console.log(newVal);
						if(newVal != 0 && newVal != "" && newVal != undefined) {
							scope.city = scope.citylist[newVal];
						}
					}, true)
					// 根据市 获取县区
					scope.$watch("addressCid", function(newVal, oldVal, scope) {
						console.log(newVal);
						if(newVal != 0 && newVal != "" && newVal != undefined) {
							scope.area = scope.citylist[newVal];
						}
					}, true)
					// 如果输入框有值，隐藏提示信息
					scope.selectChangeP = function() {
						scope.isPidShow = false;
					}
					scope.selectChangeC = function() {
						scope.isCidShow = false;
					}
					scope.selectChangeD = function() {
						scope.isDidShow = false;
					}

					console.log("scope", scope.addrId);
					// 是否为修改
					if(scope.addrId) {
						console.log(666)
						scope.isAddrBtnShow = true;
						$http({
							method: "GET",
							url: scope.baseUrl + "addresslist.json"
						}).then((res) => {
							scope.addressList = res.data.data;
							scope.addressList.forEach((item) => {
								if(item.id == scope.addrId) {
									console.log(item)
									scope.addressUser = item.addressUser;
									scope.addressPhone = item.addressPhone;
									scope.addressPid = scope.province[item.addressPid];
									scope.addressCid = scope.city[item.addressCid];
									scope.addressDid = scope.area[item.addressDid];
									scope.addressPname = item.addressPname;
									scope.addressCname = item.addressCname;
									scope.addressDname = item.addressDname;
									scope.addressStreet = item.addressStreet;
									scope.addressPostcode = item.addressPostcode;
									scope.isDefault = item.isDefault;
									window.sessionStorage.setItem("addrId", "");
								}
							})
						})

					} else {
						scope.isAddrBtnShow = false;
					}
				} else {
					scope.isMaskShow = true;
					scope.AreYouSure = "非常抱歉，您还未登陆，请先登录后查看";
					scope.isSure = function() {
						scope.isMaskShow = false;
						window.location.href = "#!/mycenter";
					}
					scope.isCancel = function() {
						scope.isMaskShow = false;
						window.location.href = "#!/index";
					}
				}

				// 是否为默认
				scope.isuncheck = function() {
					scope.isDefault = !scope.isDefault;
				}

			}
		}
	}])

	// 遮罩层
	directive.directive("jmask", [function() {
		return {
			templateUrl: "directive/jmask.html",
			link: function(scope, ele, attr) {
				scope.sure = "确定";
				scope.cancel = "取消";
				console.log("用户ID:", document.cookie.split("=")[1]);
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

	// 首页头部
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
					if(scope.text.length > 0) {
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
					if(scope.title == '取消') {
						scope.isshowsearch = false;
					} else if(scope.title == '搜索') {
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
						for(var i = 0; i < all.length; i++) {
							if(all[i].title.includes(scope.text)) {
								// console.log(all[i])
								arr.push(all[i])
							}
						}
						if(arr.length <= 10) {
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
						for(var i = 0; i < all.length; i++) {
							if(all[i].sort == this.$route.params.sort) {
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