angular.module('MetronicApp').controller('smsController', ['$scope', '$rootScope', '$timeout', 'ModalService', 'smsAPI', 'platformAPI', 'templateAPI',
	function($scope, $rootScope, $timeout ,ModalService, smsAPI, platformAPI, templateAPI) {
    
    platformAPI.all({}, function(data) {
        $scope.platformC = data.infos;
    }, function(err) {
        toastr.error(err.data.error.description)
    });

    templateAPI.all({}, function(data) {
        $scope.templateC = data.infos;
    }, function(err) {
        toastr.error(err.data.error.description)
    });

    $scope.post = function(formData) {
    	smsAPI.send({platformCode: formData.platformCode}, $.param(formData), function(data) {
    		console.log(data);
    		toastr.success('发送短信成功');
    	}, function(err) {
    		toastr.error(err.data.error.description);
    	})
    }
}]);
