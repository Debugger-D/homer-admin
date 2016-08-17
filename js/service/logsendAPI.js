angular.module('MetronicApp').factory('logsendAPI', ["$resource", function ($resource) {
    return $resource(trcsmsadminLogsendUrl, {}, {
        get: {
            method: 'GET',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            url: trcsmsadminLogsendUrl+"/page/:platformCode"
        },
        count: {
        	method: 'GET',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            url: trcsmsadminLogsendUrl+"/statistics"
        }
    })
}]);
