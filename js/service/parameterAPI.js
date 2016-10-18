/**
 * Created by Administrator on 2016/10/18.
 */
angular.module('MetronicApp').factory('parameterAPI', ["$resource", function ($resource) {
    return $resource(messageAllURL+"/:topicTag", {}, {
        get: {
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control" : "no-cache"
            },
            url: messageAllURL+"/sysparam"
        },
        add: {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            url: messageAllURL+"/sysparam"
        },
        edit: {
            method: 'PUT',
            headers: {"Content-Type": "application/json"},
            url: messageAllURL+"/sysparam"
        },
        delet: {
            method: 'DELETE',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            url: messageAllURL+"/sysparam"
        }
    })
}]);
