angular.module('MetronicApp').controller('platformchannelController', ['$scope', '$rootScope', '$q', '$timeout', 'ModalService', 'platformchannelAPI', 'platformAPI',
	function($scope, $rootScope, $q, $timeout ,ModalService, platformchannelAPI, platformAPI) {
    var modalPath = "views/platformchannel/platformchannelModal.html";
    platformAPI.all({}, function(data) {
        $scope.platformC = data.infos;
    }, function(err) {
        toastr.error(err.data.error.description)
    })
    // 获取
    $scope.getList = function() {
        var filterObj = $.extend( {}, {pageIndex: $scope.currentPage, pageSize: $scope.pageCount}, $scope.filterOptions);
        platformchannelAPI.get(filterObj, function(data) {
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

    // 新增
    $scope.add = function() {
        $scope.error_description= "";
        var p1 = platformchannelAPI.allplatform({});

        var p2 = platformchannelAPI.allchannel({});

        $q.all([p1.$promise, p2.$promise]).then(function(data){
            
            $scope.platformC = data[0].infos;
            $scope.channelC = data[1].infos;

            ModalService.open($scope, modalPath, function(scope) {
            scope.title = "添加";
            console.log(data[0]);

            }, function(newData) {
                platformchannelAPI.add({}, $.param(newData), function(data) {
                    console.log('添加成功');
                    $scope.getList();
                    ModalService.close();
                }, function(err) {
                    $scope.error_description = err.data.error.description;
                });
            });
        }, function(err) {
            toastr.error("获取所有平台或所有渠道出错");
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
            platformchannelAPI.edit({platformChannelId: data.platformChannelId}, $.param(newData), function(data) {
                $scope.getList();
                ModalService.close();
            }, function(err) {
                $scope.error_description = err.data.error.description;
            });
        });
    }

    // 删除
    $scope.delet = function(platformChannelId) {
        ModalService.confirm({body: '您确定要删除吗？'}, function(){
            platformchannelAPI.delet({platformChannelId: platformChannelId}, function(data) {
                $scope.getList();
            }, function(err) {
                toastr.error(err.data.error.description);
            });
        });
    }

    // 首次加载数据
    $scope.getList();
}]);
