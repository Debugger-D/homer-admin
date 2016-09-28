/**
 * Created by Administrator on 2016/9/27.
 */
angular.module('MetronicApp').factory('chartAPI', ["$resource", function ($resource) {
    return $resource(greeting+"/:subscriberId", {}, {
        gettest: {
            method: 'GET',
            // isArray: true,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control" : "no-cache"
            },
            url: greeting
        },
    })
}]);
