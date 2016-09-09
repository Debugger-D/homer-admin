angular.module('MetronicApp').controller('platformController', ['$scope', '$rootScope', '$timeout', 'ModalService', 'platformAPI', 
	function($scope, $rootScope, $timeout ,ModalService, platformAPI) {
    var modalPath = "views/platform/platformModal.html";
    var count = 0;
    var count2 = 0; 

    platformAPI.all({}, function(data) {
        $scope.platformC = data.infos;
    }, function(err) {
        toastr.error(err.data.error.description)
    })
    
    // 获取
    $scope.getList = function() {
        var filterObj = $.extend( {}, {pageIndex: $scope.currentPage, pageSize: $scope.pageCount}, $scope.filterOptions);
        platformAPI.get(filterObj, function(data) {
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
            count = 0;
            count2 = 0;
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

    // 新增
    $scope.add = function() {
        $scope.error_description= "";
        ModalService.open($scope, modalPath, function(scope) {
            scope.title = "添加";
        }, function(newData) {
            platformAPI.add({}, $.param(newData), function(data) {
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
            platformAPI.edit({platformId: data.platformId}, $.param(newData), function(data) {
                $scope.getList();
                ModalService.close();
            }, function(err) {
                $scope.error_description = err.data.error.description;
            });
        });
    }

    // 删除
    $scope.delet = function(platformId) {
        ModalService.confirm({body: '您确定要删除吗？'}, function(){
            platformAPI.delet({platformId: platformId}, function(data) {
                $scope.getList();
            }, function(err) {
                toastr.error(err.data.error.description);
            });
           
        });
    }

    //禁用 ，启用
    $scope.mySendswitch = function(platformId, sendEnabled) {
        // 避免初始化就调用 onChange 事件插件
        if(count < $scope.dataInfo.length ) {
            count++;
            return false;
        }
        platformAPI.issend({platformId: platformId}, $.param({sendEnabled: sendEnabled}), function(data){
            getList();
        }, function(err) {
            toastr.error(err.data.error.description);
        });
    }

    //禁用 ，启用
    $scope.myVerifyswitch = function(platformId, vipVerifyEnabled) {
        // 避免初始化就调用 onChange 事件插件
        if(count2 < $scope.dataInfo.length ) {
            count2++;
            return false;
        }
        platformAPI.isvip({platformId: platformId}, $.param({vipVerifyabled: vipVerifyEnabled}), function(data){
            getList();
        }, function(err) {
            toastr.error(err.data.error.description);
        });
    }

    // 首次加载数据
    $scope.getList();
}]);
