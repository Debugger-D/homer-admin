angular.module('MetronicApp').factory('platformAPI', ["$resource", function ($resource) {
    return $resource(trcsmsadminPlatformUrl+"/:platformId", {}, {
        get: {
            method: 'GET',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            url: trcsmsadminPlatformUrl+"/page/:platformCode"
        },
        all: {
            method: 'GET',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            url: trcsmsadminPlatformUrl+"/platforms"
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
        issend: {
            method: 'PUT',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            url: trcsmsadminPlatformUrl+"/issend/:platformId"
        },
        isvip: {
            method: 'PUT',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            url: trcsmsadminPlatformUrl+"/isvip/:platformId"
        }
    })
}]);
