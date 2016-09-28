/**
 * Created by Administrator on 2016/9/20.
 */
angular.module('MetronicApp').controller('subscriberController', ['$scope', '$rootScope', '$timeout','$stateParams', 'ModalService', 'subscriberAPI', '$uibModal',
    function($scope, $rootScope, $timeout,$stateParams ,ModalService, subscriberAPI, $uibModal) {
        var modalPath = "views/subscriber/subscriberModal.html";
        var count = 0;
        /* platformAPI.all({}, function(data) {
         $scope.platformC = data.infos;
         }, function(err) {
         toastr.error(err.data.error.description)
         })*/
        // 获取
        if($stateParams.topicTag!=':topicTag'){
            $scope.filterOptions={
                topicTag:$stateParams.topicTag
            }
        }
        $scope.getList = function() {
            var filterObj = $.extend({},$scope.filterOptions);
            console.log(filterObj)
            subscriberAPI.get(filterObj, function(data) {
                $scope.dataInfo = [];
                if(data.length < 1) {
                    $scope.dataInfo = [];
                    $scope.totalItems = 0;
                    $scope.platformAuthMsg = '暂无数据';
                } else {
                    $scope.dataInfo = data;
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
        $scope.getList();

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
            $scope.subscriberAdd=true;
            $scope.subscriberEdit=false;
            $scope.error_description= "";
            //林师兄用ui-bootstraps封装的模态框
            $uibModal.open({
                animation: true,
                backdrop: 'static',
                templateUrl: modalPath,
                scope: $scope,
                size: 'lg',//sm||lg
                controller: function($modalInstance, $scope) {
                    // $scope.title = title;
                    // $scope.formData = formData;
                    $scope.cancel = function() {
                            $modalInstance.dismiss('cancel');
                    };
                    //异步请求函数
                    $scope.post = function(newData) {
                        console.log("###133");
                        console.log(newData);
                        subscriberAPI.add(JSON.stringify(newData), function(data) {
                            console.log('添加成功');
                            $scope.getList();
                           // ModalService.close();
                            $modalInstance.dismiss('cancel');
                        }, function(err) {
                            $scope.error_description = err.data.error.description;
                        });
                    }
                },
                resolve:  {}
            });
        }
        /*//创建新IP
        $scope.add = function(data) {
            console.log(data)
            $scope.subscriberAdd=true;
            $scope.subscriberEdit=false;
            $scope.error_description= "";
            ModalService.open($scope, modalPath, function(scope) {
                scope.title = "编辑";
                scope.formData = angular.copy(data[0]);
                console.log(scope.formData.e)
                console.log(scope.formData)
                scope.httpDisable = true;
            }, function(newData) {
                subscriberAPI.add(JSON.stringify(newData), function(data) {
                    console.log('添加成功');
                    $scope.getList();
                    // ModalService.close();
                    $modalInstance.dismiss('cancel');
                }, function(err) {
                    $scope.error_description = err.data.error.description;
                });
            });
        }*/
        // 编辑
        $scope.edit = function(data) {
            $scope.subscriberEdit=true;
            $scope.subscriberAdd=false;
            $scope.error_description= "";
            ModalService.open($scope, modalPath, function(scope) {
                scope.title = "编辑";
                scope.formData = angular.copy(data);
                console.log(scope.formData)
                scope.httpDisable = true;
            }, function(newData) {
                subscriberAPI.edit(JSON.stringify(newData), function(data) {
                    $scope.getList();
                    ModalService.close();
                }, function(err) {
                    $scope.error_description = err.data.error.description;
                });
            });
        }

        // 删除
        $scope.delet = function(subscriberId) {
            ModalService.confirm({body: '您确定要删除吗？'}, function(){
                subscriberAPI.delet({subscriberId: subscriberId}, function(data) {
                    $scope.getList();
                }, function(err) {
                    toastr.error(err.data.error.description);
                });
            });
        }
    }]);
