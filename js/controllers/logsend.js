angular.module('MetronicApp').controller('logsendController', ['$scope', '$rootScope', '$timeout', 'ModalService', 'logsendAPI', 'platformAPI',
	function($scope, $rootScope, $timeout ,ModalService, logsendAPI, platformAPI) {
    $('.form_datetime').datetimepicker({
        language:  'zh-CN',
        weekStart: 1,
        todayBtn:  1,
        autoclose: 1,
        todayHighlight: 1,
        startView: 2,
        forceParse: 0,
        showMeridian: 1
    });

    platformAPI.all({}, function(data) {
        $scope.platformC = data.infos;
    }, function(err) {
        toastr.error(err.data.error.description)
    })

    // 获取
    $scope.getList = function() {
        $scope.platformAuthMsg = "";
        var filterObj = $.extend( {}, {pageIndex: $scope.currentPage, pageSize: $scope.pageCount}, $scope.filterOptions);
        logsendAPI.get(filterObj, function(data) {
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
        $scope.totalItems = 0;
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

    $scope.searchStartDate = function(filter, startTime) {
        if(startTime) {
            return filter.startTime = new Date(startTime).getTime();
        }
        
    }

    $scope.searchEndDate = function(filter, endTime) {
        if(endTime) {
            return filter.endTime = new Date(endTime).getTime();
        }
        
    }


    // 首次加载数据
    $scope.getList();
}]);
