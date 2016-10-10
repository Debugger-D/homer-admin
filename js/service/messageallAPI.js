/**
 * Created by Administrator on 2016/10/2.
 */
angular.module('MetronicApp').factory('messageallAPI', ["$resource","$rootScope", function ($resource,$rootScope) {
    return $resource(messageAllURL, {}, {
        getmessageall: {
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control" : "no-cache"
            },
            url: messageAllURL+"/messageinfo/list"
        },
        getregion: {
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control" : "no-cache"
            },
            url: messageAllURL+"/popup/brokertag"
        },
        getapp: {
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control" : "no-cache"
            },
            url: messageAllURL+"/popup/app"
        },
        isAdmin: {
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control" : "no-cache"
            },
            url: messageAllURL+"/power"
        }
    })
}]);