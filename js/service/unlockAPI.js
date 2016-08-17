angular.module('MetronicApp').factory('unlockAPI', ["$resource", function ($resource) {
    return $resource(trcsmsUnlockUrl+"/:platformCode", {}, {
        count: {
            method: 'PUT',
            headers: {"Content-Type": "application/x-www-form-urlencoded"}
        }
    })
}]);
