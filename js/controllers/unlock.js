angular.module('MetronicApp').controller('unlockController', ['$scope', '$rootScope', '$timeout', 'ModalService', 'unlockAPI', 'platformAPI', 'templateAPI',
	function($scope, $rootScope, $timeout ,ModalService, unlockAPI, platformAPI, templateAPI) {
    
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
    	unlockAPI.count({platformCode: formData.platformCode}, $.param(formData), function(data) {
    		console.log(data);
    		toastr.success('解禁成功');
    	}, function(err) {
    		toastr.error(err.data.error.description);
    	})
    }
}]);
