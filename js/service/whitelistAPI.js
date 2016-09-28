/**
 * Created by Administrator on 2016/9/21.
 */
angular.module('MetronicApp').factory('whitelistAPI', ["$resource", function ($resource) {
    return $resource(messageAllURL+"/:subscriberId", {}, {
        get: {
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control" : "no-cache",
            },
            //isArray: true,
            url: messageAllURL+"/topicwhitelist"
        },
        add: {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            url: messageAllURL+"/topicwhitelist"
        },
        edit: {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            url: messageAllURL+"/topicwhitelist"
        },
        delet: {
            method: 'DELETE',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            url: messageAllURL+"/topicwhitelist"
        },
        isrefresh: {
            method: 'PUT',
            url: messageAllURL+'/isrefresh/:templateId',
            headers: {"Content-Type": "application/x-www-form-urlencoded"}
        }
    })
}]);
