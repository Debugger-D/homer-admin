angular.module('MetronicApp').factory('logverifyAPI', ["$resource", function ($resource) {
    return $resource(trcsmsadminLogverifyUrl, {}, {
        get: {
            method: 'GET',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            url: trcsmsadminLogverifyUrl+"/page/:platformCode"
        }
    })
}]);
