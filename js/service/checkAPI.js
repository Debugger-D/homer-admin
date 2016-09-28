/**
 * Created by Administrator on 2016/9/21.
 */
angular.module('MetronicApp').factory('checkAPI', ["$resource", function ($resource) {
    return $resource(messageAllURL+"/:subscriberId", {}, {
        gethistory: {
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control" : "no-cache",
            },
            isArray: true,
            url: messageAllURL+"/topiccheck"
        },
        getlist: {
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control" : "no-cache",
            },
            url: messageAllURL+"/topiccheck/list"
        },
        edit: {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            url: messageAllURL+"/topiccheck"
        },
        isrefresh: {
            method: 'PUT',
            url: messageAllURL+'/isrefresh/:templateId',
            headers: {"Content-Type": "application/x-www-form-urlencoded"}
        }
    })
}]);
