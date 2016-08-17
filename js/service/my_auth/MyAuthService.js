angular.module('MetronicApp').factory('MyAuthService', ['$http', 'MySessionService', 'MyAccountAPI', '$window', '$cookieStore',function($http, MySessionService, MyAccountAPI, $window, $cookieStore) {
    var authService = {};

    authService.login = function(loginData) {
        return MyAccountAPI.login({}, $.param(loginData))
            .$promise
            .then(function (data) {
                // return $http.get(permissionUrl).then(function(res) {
                MySessionService.create(data.userId, data.phone,
                    data.phone);
                return data.phone;
                // }, function(err) {
                //     return err;
                // });
            }, function(err) {
                return err;
            });
    };

    authService.logout = function() {
        return MyAccountAPI.logout({}, {})
            .$promise
            .then(function(res) {
                console.log("登出成功");
                MySessionService.destroy();
                return true;
            });

    }

    authService.isAuthenticated = function() {
        return ($window.sessionStorage["userInfo"] && $window.sessionStorage["userInfo"].length > 0);
    };

    authService.getUserInfo = function() {
        return $window.sessionStorage["userInfo"] && $window.sessionStorage["userInfo"].length>0 && JSON.parse($window.sessionStorage["userInfo"]);
    }

    authService.isAuthorized = function(authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
            authorizedRoles = [authorizedRoles];
        }
        return (authService.isAuthenticated() &&
            authorizedRoles.indexOf(MySessionService.userRole) !== -1);
    };
    return authService;
}]);
