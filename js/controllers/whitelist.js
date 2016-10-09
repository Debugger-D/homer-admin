/**
 * Created by Administrator on 2016/9/21.
 */
angular.module('MetronicApp').controller('whitelistController', ['$scope', '$rootScope', '$timeout', 'ModalService', 'whitelistAPI', '$uibModal',
    function($scope, $rootScope, $timeout ,ModalService, whitelistAPI, $uibModal) {
        var modalPath = "views/whitelist/whitelistModal.html";
        var count = 0;
        /* platformAPI.all({}, function(data) {
         $scope.platformC = data.infos;
         }, function(err) {
         toastr.error(err.data.error.description)
         })*/
        // 获取
        $scope.getList = function() {
            var filterObj = $.extend({},$scope.filterOptions);
            console.log(filterObj)
            whitelistAPI.get(filterObj, function(data) {
                $scope.dataInfo = [];
                if(data.length < 1) {
                    $scope.dataInfo = [];
                    $scope.totalItems = 0;
                    $scope.platformAuthMsg = '暂无数据';
                } else {
                    $scope.trBlock=true;
                    $scope.dataInfo = data;
                    $scope.totalItems = data.totalData;
                    $scope.platformAuthMsg = "";
                }
                count = 0;
            }, function(err) {
                $scope.trBlock=false;
                $scope.error_description&&($scope.error_description = err.data.error.description);
                if(err.status == 403) {
                    $scope.platformAuthMsg = '您无权查看';
                }else{$scope.platformAuthMsg = '查不到数据';}
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
        }

        // 新增
        $scope.formData={};
        $scope.add = function(data) {
            console.log(data);
            $scope.messageAdd=true;
            $scope.messageEdit=false;
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

                    $scope.title = "添加";
                    $scope.formData.topicTag =angular.copy(data)
                    console.log($scope.formData.topicTag)
                    $scope.cancel = function() {
                        $modalInstance.dismiss('cancel');
                    };
                    //异步请求函数
                    $scope.post = function(newData) {
                        console.log(newData)
                        whitelistAPI.add(newData,{}, function(data) {
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


        // 编辑
        $scope.edit = function(data) {
            $scope.messageEdit=true;
            $scope.messageAdd=false;
            $scope.error_description= "";
            ModalService.open($scope, modalPath, function(scope) {
                scope.title = "编辑";
                scope.formData = angular.copy(data);
                scope.formData2 = angular.copy(data);
                console.log(scope.formData);
                scope.httpDisable = true;

                scope.deletIP = function(index) {
                    scope.formData.splice(index,1);
                    scope.formData2.splice(index,1);
                }
            }, function(newData) {
                console.log(newData)
                newData=newData.join('|');
                console.log({ip:newData,topicTag:$scope.dataInfo.topicTag})
                whitelistAPI.edit(JSON.stringify({ip:newData,topicTag:$scope.dataInfo.topicTag}), function(data) {
                    $scope.getList();
                    ModalService.close();
                }, function(err) {
                    $scope.error_description = err.data.error.description;
                });
            });
        }

        // 删除
        $scope.delet = function(id) {
            ModalService.confirm({body: '您确定要删除吗？'}, function(){
                whitelistAPI.delet({id: id}, function(data) {
                    $scope.getList();
                }, function(err) {
                    toastr.error(err.data.error.description);
                });
            });
        }


        // 首次加载数据
        // $scope.getList();
    }]);
