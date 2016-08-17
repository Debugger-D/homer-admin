angular.module('MetronicApp').controller('statisticsController', ['$scope', '$rootScope', '$timeout', 'ModalService', 'logsendAPI', 
	function($scope, $rootScope, $timeout ,ModalService, logsendAPI) {

	$scope.getList = function() {
		logsendAPI.count({}, function(data) {
			console.log(data);
		}, function(err) {
			toastr.error(err.data.error.description)；
		});
	}

    $scope.getList();
}]);
