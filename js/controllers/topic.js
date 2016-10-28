/**
 * Created by Administrator on 2016/9/19.
 */
angular.module('MetronicApp').controller('topicController', ['$scope', '$rootScope', '$timeout', 'ModalService', 'topicAPI','messageallAPI','$state',
    function($scope, $rootScope, $timeout ,ModalService, topicAPI,messageallAPI,$state) {
        var modalPath = "views/topic/topicModal.html";
        var count = 0;
        //检查权限
        $scope.isAdmin=false;
        messageallAPI.isAdmin({},function (data) {
            if(data.power!='manager'){
                $scope.isAdmin=true;
            }
        })
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
        $scope.getList = function() {
            var filterObj = $.extend( {}, {pageIndex: $scope.currentPage, pageSize: $scope.pageCount}, $scope.filterOptions);

            topicAPI.get(filterObj, function(data) {
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
        };

        // 新增
        $scope.add = function() {
            $scope.messageAdd=true;
            $scope.messageEdit=false;
            $scope.error_description= "";
            ModalService.open($scope, modalPath, function(scope) {
                scope.title = "添加";
                scope.formData = {timeout:'5000',maxTimes:'3',intervalTime:'10','maxProduceSpeed':'-1','maxConsumeSpeed':'-1'};

            }, function(newData) {
                topicAPI.add({},JSON.stringify(newData), function(data) {
                    $scope.getList();
                    ModalService.close();
                }, function(err) {
                    $scope.error_description = err.data.error.description;
                });
            });
        };

        // 编辑
        $scope.edit = function(data) {
            $scope.messageEdit=true;
            $scope.messageAdd=false;
            $scope.error_description= "";
            ModalService.open($scope, modalPath, function(scope) {
                scope.title = "编辑";
                scope.formData = angular.copy(data);
                scope.httpDisable = true;
            }, function(newData) {
                console.log(newData);
                topicAPI.edit(JSON.stringify(newData), function(data) {
                    $scope.getList();
                    ModalService.close();
                }, function(err) {
                    $scope.error_description = err.data.error.description;
                });
            });
        }

        // 删除
        $scope.delet = function(topicTag) {
            ModalService.confirm({body: '您确定要删除吗？'}, function(){
                topicAPI.delet({topicTag: topicTag}, function(data) {
                    $scope.getList();
                }, function(err) {
                    toastr.error(err.data.error.description);
                });
            });
        };
        //改变消息状态
        $scope.change=function (newData) {
            topicAPI.change({topicTag: newData}, $.param({}), function(data) {
                $scope.getList();
                ModalService.close();
            }, function(err) {
                $scope.error_description = err.data.error.description;
            });
        };
        $scope.list=function (data) {
            $state.go('main.subscriber',{topicTag:data})
        };
/*
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
*/
        // 首次加载数据
        $scope.getList();
    }]);
