/***
所有url 全局变量
***/
// 登录 url
var baseUrl = '/authority/';
var accountUrl = '/account/';
var loginUrl = '/account/user/login';
var logoutUrl = '/account/user/logout';
// 用户信息
var userInfoUrl = '/account/user/basic';
var permissionUrl =  '/admin/admin/permission';


var indexPageUrl = '/main/index';
// admin
var adminUrl = '/admin/admin/';
// ===== 业务 ====

//============消息总线2.0===============
  //===MQ Broker管理===
var messageAllURL='/homer';
  //===消费者管理===


/* Metronic App */
var MetronicApp = angular.module("MetronicApp", [
    "ui.router",
    "ui.bootstrap",
    "oc.lazyLoad",
    "ngSanitize",
    "ngResource",
    "ngCookies",
    "frapontillo.bootstrap-switch"
]);

/* 常量定义 */
MetronicApp.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
});

MetronicApp.constant('USER_ROLES', {
  all: '*',
  admin: 'admin',
  editor: 'editor',
  guest: 'guest'
})

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
MetronicApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

/********************************************
 BEGIN: BREAKING CHANGE in AngularS v1.3.x:
*********************************************/
/**
```javascript
angular.module('myModule').config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);
**/

//AngularJS v1.3.x workaround for old style controller declarition in HTML
MetronicApp.config(['$controllerProvider', function($controllerProvider) {
  // this option might be handy for migrating old apps, but please don't use it
  // in new ones!
  $controllerProvider.allowGlobals();
}]);

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
*********************************************/

MetronicApp.factory('lostToken', ['$q', '$injector', '$location', '$cookieStore', 'MySessionService', function($q, $injector, $location, $cookieStore, MySessionService ) {
    var lostToken = {
        responseError: function(response) {
            // token has expired
            if (response.status == 401){

                var $http = $injector.get('$http');
                var deferred = $q.defer();

                // Create a new session (recover the session)
                // We use login method that logs the user in using the current credentials and
                // returns a promise
                console.log("报错代码: "+response.status);
                MySessionService.destroy();
                $location.path('/index');

                // When the session recovered, make the same backend call again and chain the request
                return deferred.promise.then(function() {
                    return $http(response.config);
                });
            }
            return $q.reject(response);
        }
    };
    return lostToken;
}]);

// 如果有任何 HTTP 请求， 就让 LOGO 执行动画
// 用 $rootScope.mmmyHttpRquestCount 控制
MetronicApp.factory('requrestWather', ['$rootScope', '$q', '$injector', 'AUTH_EVENTS', 'MySessionService', '$location',
function($rootScope, $q, $injector, AUTH_EVENTS, MySessionService, $location) {
    $rootScope.mmmyHttpRquestCount = 0;
    var requrestWather = {
        request: function(config) {
            var deferred = $q.defer();
            $rootScope.mmmyHttpRquestCount++;
            deferred.resolve(config);
            return deferred.promise;
        },
        response: function(resp) {
            var deferred = $q.defer();
            $rootScope.mmmyHttpRquestCount--;
            deferred.resolve(resp);
            return deferred.promise;
        },
        requestError: function(reqErr) {
            $rootScope.mmmyHttpRquestCount--;
            return reqErr;
        },
        responseError: function(resErr) {
            $rootScope.mmmyHttpRquestCount--;
            return $q.reject(resErr);
        }
    }

    return requrestWather;
}]);

MetronicApp.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('lostToken');
    $httpProvider.interceptors.push('requrestWather');

    if( !$httpProvider.defaults.headers.get ) {
        console.log('---3');
        $httpProvider.defaults.headers.get = {};
    } else {
        // 禁用 IE AJAX 请求缓存
        console.log('---1');
        $httpProvider.defaults.headers.get['If-Modified-Since'] = 'Mon, 26 Jul 1997 05:00:00 GMT';
        $httpProvider.defaults.headers.get['Cache-Control'] = 'no-cache';
        $httpProvider.defaults.headers.get['Pragma'] = 'no-cache';
    }
}]);

/* Setup global settings */
MetronicApp.factory('settings', ['$rootScope', function($rootScope) {
    // supported languages
    var settings = {
        layout: {
            pageSidebarClosed: false, // sidebar menu state
            pageContentWhite: true, // set page content layout
            pageBodySolid: false, // solid body color state
            pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
        },
        imagePath: './img',
        siteTitle: '消息总线'
    };

    $rootScope.settings = settings;

    return settings;
}]);

/* Setup App Main Controller */
MetronicApp.controller('AppController', ['$scope', '$rootScope', 'USER_ROLES', 'MyAuthService','AUTH_EVENTS' ,'$window', '$location', 'ModalService', function($scope, $rootScope, USER_ROLES, MyAuthService, AUTH_EVENTS, $window, $location, ModalService) {
    $scope.userRoles = USER_ROLES;
    $scope.isAuthorized = MyAuthService.isAuthorized;
    $scope.currentPage = 1;
    $scope.pageCount = 10;

    $scope.setCurrentUser = function (user) {
      $scope.currentUser = user;
    };

    $scope.setBreadcrumb = function (breadcrumb) {
      $scope.breadcrumb = breadcrumb;
    };

    $scope.logout = function() {
        ModalService.confirm({body:"确定要退出了嘛？"}, function() {
            MyAuthService.logout().then(function() {
                $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
                $location.path('/index');
            }, function(err) {
                console.log(err);
            });
        });
    }

    $scope.$on('$viewContentLoaded', function() {
        //App.initComponents(); // init core components
        //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive
    });

    $scope.$on(AUTH_EVENTS.loginSuccess, function() {
        console.log("登录成功");
    })
}]);

/***
Layout Partials.
By default the partials are loaded through AngularJS ng-include directive. In case they loaded in server side(e.g: PHP include function) then below partial
initialization can be disabled and Layout.init() should be called on page load complete as explained above.
***/

/* Setup Layout Part - Header */
MetronicApp.controller('HeaderController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initHeader(); // init header
    });
}]);

/* Setup Layout Part - Sidebar */
MetronicApp.controller('SidebarController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initSidebar(); // init sidebar
    });
}]);

/* Setup Layout Part - Quick Sidebar */
MetronicApp.controller('QuickSidebarController', ['$scope', function($scope) {
    // $scope.$on('$includeContentLoaded', function() {
    //    setTimeout(function(){
    //         QuickSidebar.init(); // init quick sidebar
    //     }, 2000)
    // });
}]);

/* Setup Layout Part - Theme Panel */
MetronicApp.controller('ThemePanelController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Demo.init(); // init theme panel
    });
}]);

/* Setup Layout Part - Footer */
MetronicApp.controller('FooterController', ['$scope', function($scope) {
    $scope.$on('$includeContentLoaded', function() {
        Layout.initFooter(); // init footer
    });
}]);

/* Setup Rounting For All Pages */
MetronicApp.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise("/index");

    $stateProvider
        // 登录页面
        .state('index', {
            url: "/index",
            views: {
                '': {
                    templateUrl: 'views/login.html',
                    controller: 'loginCtrl'
                }
            },
            data: {whiteBody: true},
            resolve: {
            }
        })
        .state('main', {
            url: '/main',
            views: {
                '': {
                    templateUrl: 'tpl/main.html'
                }
            }
        })
        .state('main.index', {
            url: "/index",
            views: {
                'mainview@main': {
                    templateUrl: 'views/home.html'
                }
            },
            resolve: {
            }
        })
        //mqBroker管理
        .state('main.mqBroker', {
            url: "/mqBroker",
            views: {
                'mainview@main': {
                    templateUrl: 'views/mqBroker/mqBroker.html'
                }
            },
            data: {pageTitle: 'mqBroker管理'},
            resolve: {
            }
        })
        //消费者管理
        .state('main.consumer', {
            url: "/consumer",
            views: {
                'mainview@main': {
                    templateUrl: 'views/consumer/consumer.html'
                }
            },
            data: {pageTitle: '消费者管理'},
            resolve: {
            }
        })
        //消息信息管理
        .state('main.messageinfo', {
            url: "/messageinfo",
            views: {
                'mainview@main': {
                    templateUrl: 'views/message/messageinfo.html'
                }
            },
            data: {pageTitle: '消费者管理'},
            resolve: {
            }
        })
        //消息日志管理
        .state('main.messagelog', {
            url: "/messagelog",
            views: {
                'mainview@main': {
                    templateUrl: 'views/message/messagelog.html'
                }
            },
            data: {pageTitle: '消息日志管理'},
            resolve: {
            }
        })
        //消息主题管理
        .state('main.topic', {
            url: "/topic",
            views: {
                'mainview@main': {
                    templateUrl: 'views/topic/topic.html'
                }
            },
            data: {pageTitle: '消息主题管理'},
            resolve: {
            }
        })
        //消息主题订阅者管理
        .state('main.subscriber', {
            url: "/subscriber",
            views: {
                'mainview@main': {
                    templateUrl: 'views/subscriber/subscriber.html'
                }
            },
            data: {pageTitle: '消息主题订阅者管理'},
            resolve: {
            }
        })
        //消息主题白名单管理
        .state('main.whitelist', {
            url: "/whitelist",
            views: {
                'mainview@main': {
                    templateUrl: 'views/whitelist/whitelist.html'
                }
            },
            data: {pageTitle: '消息主题订阅者管理'},
            resolve: {
            }
        })
        //消息主题审核历史信息
        .state('main.checkhistory', {
            url: "/checkhistory",
            views: {
                'mainview@main': {
                    templateUrl: 'views/check/checkhistory.html'
                }
            },
            data: {pageTitle: '消息主题审核历史信息'},
            resolve: {
            }
        })
        //消息主题审核信息列表
        .state('main.checklist', {
            url: "/checklist",
            views: {
                'mainview@main': {
                    templateUrl: 'views/check/checklist.html'
                }
            },
            data: {pageTitle: '消息主题审核信息列表'},
            resolve: {
            }
        })
}]);
 
/* Init global settings and run the app */
MetronicApp.run(["$rootScope", "settings", "$state", "$window", "MyAuthService", "ModalService", "$location", "AUTH_EVENTS", "$cookieStore", function($rootScope, settings, $state, $window, MyAuthService, ModalService, $location, AUTH_EVENTS, $cookieStore) {
    $rootScope.$state = $state; // state to be accessed from view
    $rootScope.$settings = settings; // state to be accessed from view
    var userInfo = MyAuthService.getUserInfo();
    if(userInfo) {
        $rootScope.currentUser = userInfo.authName;
    }

    // 路由变化监听
    $rootScope.$on('$stateChangeStart', function (event, next) {
        // 判断是否登录失效
        var hasLogin = MyAuthService.isAuthenticated();
        if(hasLogin && $location.path() == '/index') {
            $location.path(indexPageUrl);
        }

        if(!hasLogin && $location.path() != '/index') {
            //$rootScope.logout();
            ModalService.alert({body: "您已退出或连接失效，请重新登录"}, function() {
                $rootScope.currentUser = null;
                MyAuthService.logout();
                $location.path(loginUrl);
            });
        }
    });

    $rootScope.$on(AUTH_EVENTS.sessionTimeout, function (event, next) {
        ModalService.alert({body: "会话已失效或从服务器获取数据出错, 请重新登录"}, function() {
            $rootScope.currentUser = null;
            MyAuthService.logout();
            $location.path(loginUrl);
        });
    });

}]);
