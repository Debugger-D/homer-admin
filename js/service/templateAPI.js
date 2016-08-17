angular.module('MetronicApp').factory('templateAPI', ["$resource", function ($resource) {
    return $resource(trcsmsadminTemplateUrl+"/:templateId", {}, {
        get: {
            method: 'GET',
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Cache-Control" : "no-cache" 
            },
            url: trcsmsadminTemplateUrl+"/page/:platformCode"
        },
        all: {
            method: 'GET',
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            url: trcsmsadminTemplateUrl+"/templates"
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
        }
    })
}]);
