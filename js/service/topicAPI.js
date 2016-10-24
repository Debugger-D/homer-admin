/**
 * Created by Administrator on 2016/9/19.
 */
angular.module('MetronicApp').factory('topicAPI', ["$resource", function ($resource) {
    return $resource(messageAllURL+"/:topicTag", {}, {
        get: {
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control" : "no-cache"
            },
            url: messageAllURL+"/messagetopic/list/:platformCode"
        },
        detail: {
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control" : "no-cache"
            },
            url: messageAllURL+"/messagetopic/:platformCode"
        },
        add: {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            url: messageAllURL+"/messagetopic"
        },
        edit: {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            url: messageAllURL+"/messagetopic"
        },
        delet: {
            method: 'DELETE',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            url: messageAllURL+"/messagetopic"
        },
        isrefresh: {
            method: 'PUT',
            url: messageAllURL+'/isrefresh/:templateId',
            headers: {"Content-Type": "application/x-www-form-urlencoded"}
        },
        change: {
            method: 'PUT',
            url: messageAllURL+'/messagetopic/status/:templateId',
            headers: {"Content-Type": "application/x-www-form-urlencoded"}
        },
        getregion: {
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control" : "no-cache"
            },
            url: messageAllURL+"/popup/brokertag"
        },
        getappid: {
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control" : "no-cache"
            },
            url: messageAllURL+"/popup/app"
        }
    })
}]);
