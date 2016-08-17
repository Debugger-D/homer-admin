angular.module('MetronicApp').controller('logverifyController', ['$scope', '$rootScope', '$timeout', 'ModalService', 'logverifyAPI', 'platformAPI', 
	function($scope, $rootScope, $timeout ,ModalService, logverifyAPI, platformAPI) {
    
    platformAPI.all({}, function(data) {
        $scope.platformC = data.infos;
    }, function(err) {
        toastr.error(err.data.error.description)
    })

    // 获取
    $scope.getList = function() {
        var filterObj = $.extend( {}, {pageIndex: $scope.currentPage, pageSize: $scope.pageCount}, $scope.filterOptions);
        logverifyAPI.get(filterObj, function(data) {
            $scope.platformAuthMsg = "";
                    $scope.dataInfo = [];
        $scope.totalItems = 0;
            if(data.infos.length < 1 || !$scope.filterOptions.platformCode) {
                $scope.dataInfo = [];
                $scope.totalItems = 0;
                $scope.platformAuthMsg = '暂无数据';
            } else {
                $scope.dataInfo = data.infos;
                $scope.totalItems = data.total;
                $scope.platformAuthMsg = "";
            }
        }, function(err) {
            $scope.error_description = err.data.error.description;
            if(err.status == 403) {
                $scope.platformAuthMsg = '您无权查看';
            }
        });
    }

    // 根据用户输入实时查询平台
    var timeout;
    $scope.$watch('filterOptions', function(newVal, oldVal) {
                    $scope.platformAuthMsg = "";
                    $scope.dataInfo = [];
        if (newVal !== oldVal) {
            if (timeout) $timeout.cancel(timeout);
            timeout = $timeout(function() {
                $scope.getList();
            }, 500);
        }
    }, true);

    $scope.pageChanged = function() {
        $scope.getList();
    }


    // 首次加载数据
    $scope.getList();
}]);

