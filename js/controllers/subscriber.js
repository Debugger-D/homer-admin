/**
 * Created by Administrator on 2016/9/20.
 */
angular.module('MetronicApp').controller('subscriberController', ['$scope', '$rootScope', '$timeout','$stateParams', 'ModalService', 'subscriberAPI', 'topicAPI','$uibModal',
    function($scope, $rootScope, $timeout,$stateParams ,ModalService, subscriberAPI,topicAPI, $uibModal) {
        var modalPath = "views/subscriber/subscriberModal.html";
        var topicPath = "views/subscriber/stModal.html";
        var count = 0;

        //broker映射
        $scope.transMap = {};
        topicAPI.getregion({}, function(data) {
            $scope.region = data.infos;
            console.log($scope.region)
            for(var i = 0; i < data.infos.length; i++) {
                var dd = data.infos[i];
                $scope.transMap[dd.templateCode] = dd.templateName;
            }
        }, function(err) {
            toastr.error(err.data.error.description)
        });

        //app id 映射
        $scope.transMap1 = {};
        topicAPI.getappid({}, function(data) {
            $scope.appid = data.infos;
            console.log($scope.appid)
            for(var i = 0; i < data.infos.length; i++) {
                var dd = data.infos[i];
                $scope.transMap1[dd.templateCode] = dd.templateName;
            }
        }, function(err) {
            toastr.error(err.data.error.description)
        })

        // 获取
        if($stateParams.topicTag!=':topicTag'){
            $scope.filterOptions={
                topicTag:$stateParams.topicTag
            }
        }
        //获取订阅者信息
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
                }else{$scope.platformAuthMsg = '查不到数据';}
            });
        };
        // 获取主题详情
        $scope.gettopicList = function() {
            var filterObj = $.extend({},$scope.filterOptions);

            topicAPI.detail(filterObj, function(data) {
                // $scope.datatopicInfo = [];
                console.log(data.infos)

                    $scope.datatopicInfo = data;
                    console.log($scope.datatopicInfo)
                    $scope.platformAuthMsg = "";
                count = 0;
            }, function(err) {
                $scope.error_description&&($scope.error_description = err.data.error.description);
                if(err.status == 403) {
                    $scope.platformAuthMsg = '您无权查看';
                }else{$scope.platformAuthMsg = '查不到数据';}
            });
        };
         $scope.getList();
         $scope.gettopicList();

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

        // 编辑主题1
        $scope.edittopic1 = function(data) {
            var newdata={};
            newdata=data
            newdata.timeout=data.timeout.toString()
            newdata.maxTimes=data.maxTimes.toString()
            newdata.maxProduceSpeed=data.maxProduceSpeed.toString()
            newdata.maxConsumeSpeed=data.maxConsumeSpeed.toString()
            console.log(typeof (newdata.timeout))
            $scope.topic1=true;
            $scope.topic2=false;
            $scope.error_description= "";
            ModalService.open($scope, topicPath, function(scope) {
                scope.title = "编辑";
                scope.formData = angular.copy(newdata);
                scope.httpDisable = true;
            }, function(newData) {
                console.log(newData);
                topicAPI.edit(JSON.stringify(newData), function(data) {
                    $scope.getList();
                    $scope.gettopicList();
                    ModalService.close();
                }, function(err) {
                    $scope.error_description = err.data.error.description;
                });
            });
        }
        // 编辑主题2
        $scope.edittopic2 = function(data) {
            $scope.topic1=false;
            $scope.topic2=true;
            $scope.error_description= "";
            ModalService.open($scope, topicPath, function(scope) {
                scope.title = "编辑";
                scope.formData = angular.copy(data);
                scope.httpDisable = true;
            }, function(newData) {
                console.log(newData);
                topicAPI.edit(JSON.stringify(newData), function(data) {
                    $scope.getList();
                    $scope.gettopicList();
                    ModalService.close();
                }, function(err) {
                    $scope.error_description = err.data.error.description;
                });
            });
        }



        // 新增
        $scope.add = function() {
            $scope.subscriberAdd=true;
            $scope.subscriberEdit=false;
            $scope.error_description= "";
            //林师兄用ui-bootstraps封装的模态框
           /* $uibModal.open({
                animation: true,
                backdrop: 'static',
                templateUrl: modalPath,
                scope: $scope,
                size: 'lg',//sm||lg
                controller: function($modalInstance, $scope) {
                    // $scope.title = title;
                    // $scope.formData.topicTag = data;
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
            });*/

            ModalService.open($scope, modalPath, function(scope) {
                scope.formData={};
                scope.title = "编辑";
                console.log($scope.datatopicInfo.topicTag)
                scope.formData.topicTag = $scope.datatopicInfo.topicTag;
                console.log($scope.dataInfo)
                console.log(scope.formData)
                scope.httpDisable = true;
            }, function(newData) {
                subscriberAPI.add(JSON.stringify(newData), function(data) {
                    $scope.getList();
                    ModalService.close();
                }, function(err) {
                    $scope.error_description = err.data.error.description;
                });
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



        // =====是否刷新验证码========
        $scope.refreshSwitch = function(subscriberId, refreshEnabled) {
            // 避免初始化就调用 onChange 事件插件
            if(count < $scope.dataInfo.length ) {
                count++;
                return false;
            }

            subscriberAPI.isrefresh({subscriberId: subscriberId}, $.param({}), function(data){
                $scope.getList();
            }, function(err) {
                toastr.error(err.data.error.description);
                $scope.getList();
            });
        }

    }]);
