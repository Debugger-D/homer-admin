/**
 * Created by Administrator on 2016/10/2.
 */
angular.module('MetronicApp').controller('messageallController', ['$scope', '$rootScope', '$timeout', 'ModalService', 'messageallAPI','$state',
    function($scope, $rootScope, $timeout ,ModalService, messageallAPI,$state) {
        var modalPath = "views/topic/topicModal.html";
        var count = 0;
        messageallAPI.getapp({}, function(data) {
            $scope.region = data.infos;
            console.log($scope.region)
            for(var i = 0; i < data.infos.length; i++) {
                var dd = data.infos[i];
                $scope.transMap[dd.templateCode] = dd.templateName;
            }
        }, function(err) {
            toastr.error(err.data.error.description)
        })
        // 获取
        $scope.getList = function() {
            var filterObj = $.extend( {}, {pageIndex: $scope.currentPage, pageSize: $scope.pageCount}, $scope.filterOptions);
            console.log(23323)

            messageallAPI.getmessageall(filterObj, function(data) {
                console.log(23323)
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
                console.log(err)
                $scope.error_description&&($scope.error_description = err.data.error.description);
                if(err.status == 403) {
                    $scope.platformAuthMsg = '您无权查看';
                }else{$scope.platformAuthMsg = err.data.error.description;}
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

        // 首次加载数据
        $scope.getList();
    }]);
