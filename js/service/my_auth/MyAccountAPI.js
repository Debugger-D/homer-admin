angular.module('MetronicApp').factory('MyAccountAPI', ["$resource", function ($resource) {
    return $resource(accountUrl + 'user/phone/exist/:phone', {}, {
        exist: {
            method: 'GET'
        },
        login: {
            method: 'POST',
            url: accountUrl + "user/login",
            headers: {"Content-Type": "application/x-www-form-urlencoded"}
        },
        logout: {
            method: 'POST',
            url: accountUrl + 'user/logout' + '?time=' + new Date().getTime(),
            headers: {"Content-Type": "application/x-www-form-urlencoded"}
        },
        register: {
            method: 'POST',
            url: adminUrl + 'user/register',
            headers: {"Content-Type": "application/x-www-form-urlencoded"}
        }
    });
}]);
