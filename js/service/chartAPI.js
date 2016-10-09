/**
 * Created by Administrator on 2016/9/27.
 */
angular.module('MetronicApp').factory('chartAPI', ["$resource", function ($resource) {
    return $resource(chart, {}, {
        gettest: {
            method: 'GET',
            // isArray: true,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control" : "no-cache"
            },
            url: chart
        },
        gettopic: {
            method: 'GET',
            // isArray: true,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control" : "no-cache"
            },
            url: chart+"/chart/queryChartNodeResult"
        },
        chartdata: {
            method: 'POST',
            // isArray: true,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control" : "no-cache"
            },
            url: chart+"/chart/chartDisplay"
        },
        getPie: {
            method: 'POST',
            // isArray: true,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control" : "no-cache"
            },
            url: chart+"/chart/queryBrokerStatistics"
        }
    })
}]);
