angular.module('MetronicApp').controller('loginCtrl', ['$scope', '$rootScope', '$location', 'AUTH_EVENTS', 'MyAuthService', function($scope, $rootScope, $location ,AUTH_EVENTS, MyAuthService) {
    $scope.loginData = {
        username: '',
        password: ''
    };

    $scope.login = function(loginData) {
        MyAuthService.login(loginData).then(function(res) {
            if(res.data && !!res.data.error) {
                $scope.showErr = true;
                $scope.error_description = res.data.error.description;
                $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
            } else {
                $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
                $scope.setCurrentUser(res);
                $location.path(indexPageUrl);
            }
        });
    };
}]);
