angular.module('MetronicApp').controller('channelController', ['$scope', '$rootScope', '$timeout', 'ModalService', 'channelAPI', 
	function($scope, $rootScope, $timeout ,ModalService, channelAPI) {
    var modalPath = "views/channel/channelModal.html";

    // 获取
    $scope.getList = function() {
        var filterObj = $.extend( {}, {pageIndex: $scope.currentPage, pageSize: $scope.pageCount}, $scope.filterOptions);
        channelAPI.get(filterObj, function(data) {
            $scope.dataInfo = data.infos;
            $scope.totalItems = data.total;
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

    // 新增
    $scope.add = function() {
        $scope.error_description= "";
        ModalService.open($scope, modalPath, function(scope) {
            scope.title = "添加";
        }, function(newData) {
            channelAPI.add({}, $.param(newData), function(data) {
                console.log('添加成功');
                $scope.getList();
                ModalService.close();
            }, function(err) {
                $scope.error_description = err.data.error.description;
            });
        });
    }

    // 编辑
    $scope.edit = function(data) {
        $scope.error_description= "";
        ModalService.open($scope, modalPath, function(scope) {
                scope.title = "编辑";
                scope.formData = angular.copy(data);
                scope.httpDisable = true;
        }, function(newData) {
            channelAPI.edit({channelId: data.channelId}, $.param(newData), function(data) {
                $scope.getList();
                ModalService.close();
            }, function(err) {
                $scope.error_description = err.data.error.description;
            });
        });
    }

    // 删除
    $scope.delet = function(channelId) {
        ModalService.confirm({body: '您确定要删除吗？'}, function(){
            channelAPI.delet({channelId: channelId}, function(data) {
                $scope.getList();
            }, function(err) {
                toastr.error(err.data.error.description);
            });
            
        });
    }

    // 首次加载数据
    $scope.getList();
}]);
