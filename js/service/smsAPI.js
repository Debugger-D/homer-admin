angular.module('MetronicApp').factory('smsAPI', ["$resource", function ($resource) {
    return $resource("/trcsms/sms", {}, {
        send: {
            method: 'POST',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            url: "/trcsms/sms/:platformCode"
        },
        verify: {
            method: 'POST',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            url: "/trcsms/sms/verify/:platformCode"
        }
    })
}]);
