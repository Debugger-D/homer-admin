angular.module('MetronicApp').controller('templateController', ['$scope', '$rootScope', '$timeout', 'ModalService', 'templateAPI', 'platformAPI',
	function($scope, $rootScope, $timeout ,ModalService, templateAPI, platformAPI) {
    var modalPath = "views/template/templateModal.html";
    var count = 0;
    platformAPI.all({}, function(data) {
        $scope.platformC = data.infos;
    }, function(err) {
        toastr.error(err.data.error.description)
    })
    // 获取
    $scope.getList = function() {
        var filterObj = $.extend( {}, {pageIndex: $scope.currentPage, pageSize: $scope.pageCount}, $scope.filterOptions);

        templateAPI.get(filterObj, function(data) {
            $scope.dataInfo = [];
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

    // 新增
    $scope.add = function() {
        $scope.error_description= "";
        ModalService.open($scope, modalPath, function(scope) {
            scope.title = "添加";
        }, function(newData) {
            templateAPI.add({}, $.param(newData), function(data) {
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
            templateAPI.edit({templateId: data.templateId}, $.param(newData), function(data) {
                $scope.getList();
                ModalService.close();
            }, function(err) {
                $scope.error_description = err.data.error.description;
            });
        });
    }

    // 删除
    $scope.delet = function(templateId) {
        ModalService.confirm({body: '您确定要删除吗？'}, function(){
            templateAPI.delet({templateId: templateId}, function(data) {
                $scope.getList();
            }, function(err) {
                toastr.error(err.data.error.description);
            });
        });
    }

    // 是否刷新验证码
    $scope.refreshSwitch = function(templateId, refreshEnabled) {
        // 避免初始化就调用 onChange 事件插件
        if(count < $scope.dataInfo.length ) {
            count++;
            return false;
        }

        templateAPI.isrefresh({templateId: templateId}, $.param({refreshEnabled: refreshEnabled}), function(data){
            $scope.getList();
        }, function(err) {
            toastr.error(err.data.error.description);
        });
    }

    // 首次加载数据
    $scope.getList();
}]);
