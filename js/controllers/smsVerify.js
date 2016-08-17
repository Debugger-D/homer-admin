angular.module('MetronicApp').controller('smsVerifyController', ['$scope', '$rootScope', '$timeout', 'ModalService', 'smsAPI', 'channelAPI', 'platformAPI', 'templateAPI', 
	function($scope, $rootScope, $timeout ,ModalService, smsAPI, channelAPI, platformAPI, templateAPI) {
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
    	smsAPI.verify({platformCode: formData.platformCode}, $.param(formData), function(data) {
    		console.log(data);
    		toastr.success('验证验证码成功');
    	}, function(err) {
    		toastr.error(err.data.error.description);
    	})
    }
}]);
