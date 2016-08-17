angular.module('MetronicApp').factory('platformchannelAPI', ["$resource", function ($resource) {
    return $resource(trcsmsadminPlatformChannelUrl+"/:platformChannelId", {}, {
        get: {
            method: 'GET',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            url: trcsmsadminPlatformChannelUrl+"/page/:platformCode"
        },
        add: {
            method: 'POST',
            headers: {"Content-Type": "application/x-www-form-urlencoded"}
        },
        edit: {
            method: 'PUT',
            headers: {"Content-Type": "application/x-www-form-urlencoded"}
        },
        delet: {
            method: 'DELETE',
            headers: {"Content-Type": "application/x-www-form-urlencoded"}
        },
        allplatform: {
            method: 'GET',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            url: trcsmsadminPlatformUrl+"/platforms"
        },
        allchannel: {
            method: 'GET',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            url: trcsmsadminChannelUrl+"/channels"  
        }
    })
}]);
