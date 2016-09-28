/**
 * Created by Administrator on 2016/9/14.
 */
angular.module('MetronicApp').factory('consumerAPI', ["$resource", function ($resource) {
    return $resource(messageAllURL, {}, {
        get: {
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control" : "no-cache"
            },
            url: messageAllURL+"/consumer/"
        },
        isrefresh: {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            url: messageAllURL+"/broker/status"
        }
    })
}]);
