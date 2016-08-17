angular.module('MetronicApp').factory('channelAPI', ["$resource", function ($resource) {
    return $resource(trcsmsadminChannelUrl+"/:channelId", {}, {
        get: {
            method: 'GET',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            url: trcsmsadminChannelUrl+"/page/:pageIndex"
        },
        all: {
            method: 'GET',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            url: trcsmsadminChannelUrl+"/channels"
        },
        add: {
            //添加短信
            method: 'POST',
            headers: {"Content-Type": "application/x-www-form-urlencoded"}
        },
        edit: {
            //修改短信渠道信息
            method: 'PUT',
            headers: {"Content-Type": "application/x-www-form-urlencoded"}
        },
        delet: {
            //删除短信渠道信息
            method: 'DELETE',
            headers: {"Content-Type": "application/x-www-form-urlencoded"}
        }
    })
}]);
