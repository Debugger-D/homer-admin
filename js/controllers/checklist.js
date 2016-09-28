/**
 * Created by Administrator on 2016/9/21.
 */
angular.module('MetronicApp').controller('checklistController', ['$scope', '$rootScope', '$timeout', 'ModalService', 'checkAPI',
    function($scope, $rootScope, $timeout ,ModalService, checkAPI) {
        var modalPath = "views/check/checkModal.html";
        var count = 0;
        // 获取
        $scope.getList = function() {
            var filterObj = $.extend( {}, {pageIndex: $scope.currentPage, pageSize: $scope.pageCount}, $scope.filterOptions);

            checkAPI.getlist(filterObj, function(data) {
                $scope.dataInfo = [];
                if(data.infos.length < 1) {
                    $scope.dataInfo = [];
                    $scope.totalItems = 0;
                    $scope.platformAuthMsg = '暂无数据';
                } else {
                    $scope.dataInfo = data.infos;
                    $scope.totalItems = data.totalData;
                    $scope.platformAuthMsg = "";
                }
                count = 0;
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

        // 编辑
        $scope.edit = function(data) {
            $scope.error_description= "";
            ModalService.open($scope, modalPath, function(scope) {
                scope.title = "编辑";
                scope.formData = angular.copy(data);
                console.log(scope.formData)
                scope.httpDisable = true;
            }, function(newData) {
                console.log(newData)
                var filterObj = $.extend( {}, newData);
                checkAPI.edit(newData, function(data) {
                    $scope.getList();
                    ModalService.close();
                }, function(err) {
                    $scope.error_description = err.data.error.description;
                });
            });
        };

    /*    // 删除
        $scope.delet = function(topicTag) {
            ModalService.confirm({body: '您确定要删除吗？'}, function(){
                topicAPI.delet({topicTag: topicTag}, function(data) {
                    $scope.getList();
                }, function(err) {
                    toastr.error(err.data.error.description);
                });
            });
        }
     */

        // 首次加载数据
        $scope.getList();
    }]);
