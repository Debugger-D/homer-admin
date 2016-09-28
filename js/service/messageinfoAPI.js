/**
 * Created by Administrator on 2016/9/18.
 */
angular.module('MetronicApp').factory('messageinfoAPI', ["$resource","$rootScope", function ($resource,$rootScope) {
    return $resource(messageAllURL+"/:messagekey", {}, {
        getmessageinfo: {
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control" : "no-cache"
            },
            url: messageAllURL+"/messageinfo/:messagekey"
        },
        getmessageresinfo: {
            method: 'GET',
            isArray: true,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control" : "no-cache"
            },
            url: messageAllURL+"/messageresinfo/:messagekey"
        },
        getmessagestatus: {
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control" : "no-cache"
            },
            url: messageAllURL+"/messagestatus/:messagekey"
        },
        change: {
            method: 'put',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control" : "no-cache"
            },
            url: messageAllURL+"/messageinfo"
        },
        add: {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            url: messageAllURL+"/messageinfo/send"
        },
        resend: {
            method: 'put',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control" : "no-cache"
            },
            url: messageAllURL+"/messageinfo/resend/:messagekey"
        },
        isrefresh: {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            url: messageAllURL+"/broker/status"
        }
    })
}]);