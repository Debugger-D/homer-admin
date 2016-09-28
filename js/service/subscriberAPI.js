/**
 * Created by Administrator on 2016/9/20.
 */
angular.module('MetronicApp').factory('subscriberAPI', ["$resource", function ($resource) {
    return $resource(messageAllURL+"/:subscriberId", {}, {
        get: {
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control" : "no-cache",
            },
            isArray: true,
            url: messageAllURL+"/topicsubscriber/:platformCode"
        },
        add: {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            url: messageAllURL+"/topicsubscriber"
        },
        edit: {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            url: messageAllURL+"/topicsubscriber"
        },
        delet: {
            method: 'DELETE',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            url: messageAllURL+"/topicsubscriber"
        },
        isrefresh: {
            method: 'PUT',
            url: messageAllURL+'/isrefresh/:templateId',
            headers: {"Content-Type": "application/x-www-form-urlencoded"}
        }
    })
}]);
