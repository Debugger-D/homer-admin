/**
 * Created by Administrator on 2016/9/19.
 */
angular.module('MetronicApp').factory('messagelogAPI', ["$resource","$rootScope", function ($resource,$rootScope) {
    return $resource(messageAllURL, {}, {
        getmessagelog: {
            method: 'GET',
            isArray: true,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control" : "no-cache"
            },
            // url: messageAllURL+"/messagelog/:messagekey"
            url: messageAllURL+"/messagelog"
        },
        getmessagetime: {
            method: 'GET',
            isArray: true,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control" : "no-cache"
            },
            // url: messageAllURL+"/messagelog/time/:messagekey"
            url: messageAllURL+"/messagelog/time"
        }
    })
}]);