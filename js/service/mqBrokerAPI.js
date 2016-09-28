/**
 * Created by Administrator on 2016/9/13.
 */
angular.module('MetronicApp').factory('mqBrokerAPI', ["$resource", function ($resource) {
    return $resource(messageAllURL+"/:templateId", {}, {
        get: {
            method: 'GET',
            isArray: true,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control" : "no-cache"
            },
            url: messageAllURL+"/broker/all/:platformCode"
        },
        add: {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            url: messageAllURL+"/broker/:platformCode"
        },
        edit: {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            url: messageAllURL+"/broker/:platformCode"
        },
        delet: {
            method: 'DELETE',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            url: messageAllURL+"/broker/:platformCode"
        },
        isrefresh: {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            url: messageAllURL+"/broker/status"
        }
    })
}]);
