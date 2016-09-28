/**
 * Created by Administrator on 2016/9/21.
 */
angular.module('MetronicApp').controller('checkhistoryController', ['$scope', '$rootScope', '$timeout', 'ModalService', 'checkAPI',
    function($scope, $rootScope, $timeout ,ModalService,checkAPI) {
        var count = 0;

        // 获取
        $scope.getList = function() {
            var filterObj = $.extend( {},$scope.filterOptions);
            checkAPI.gethistory(filterObj, function(data) {
                $scope.dataInfo = [];
                if(data.length < 1 ) {
                    $scope.dataInfo = [];
                    // $scope.totalItems = 0;
                    $scope.platformAuthMsg = '暂无数据';
                } else {
                    $scope.dataInfo=data;
                    $scope.platformAuthMsg = "";
                }
                count = 0;
                console.log($scope.platformAuthMsg)
            }, function(err) {
                $scope.error_description&&($scope.error_description = err.data.error.description);
                if(err.status == 403) {
                    $scope.platformAuthMsg = '您无权查看';
                }else{$scope.platformAuthMsg = '消息不存在';}
            });
        };
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
        };
    }]);

