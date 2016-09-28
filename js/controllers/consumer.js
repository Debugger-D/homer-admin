/**
 * Created by Administrator on 2016/9/14.
 */
angular.module('MetronicApp').controller('consumerController', ['$scope', '$rootScope', '$timeout', 'ModalService', 'consumerAPI', //'platformAPI',
    function($scope, $rootScope, $timeout ,ModalService,consumerAPI) {
        //var modalPath = "views/mqBroker/mqBrokerModal.html";
        var count = 0;
        /*platformAPI.all({}, function(data) {
            $scope.platformC = data.infos;
        }, function(err) {
            toastr.error(err.data.error.description)
        })*/

        // 获取

        $scope.getList = function() {
            //var filterObj = $.extend( {}, {pageIndex: $scope.currentPage, pageSize: $scope.pageCount}, $scope.filterOptions);
            var filterObj = $.extend( {},$scope.filterOptions);
            consumerAPI.get(filterObj, function(data) {
                $scope.dataInfo = [];
                if(data.length < 1 ) {
                    $scope.dataInfo = [];
                    // $scope.totalItems = 0;
                    $scope.platformAuthMsg = '暂无数据';
                } else {
                    console.log(data.consumerName);
                    $scope.consumerTag=data.consumerTag;
                    $scope.consumerName=data.consumerName;
                    $scope.concurrentConsumers=data.queue[0].concurrentConsumers;
                    $scope.queueTag=data.queue[0].queueTag;
                    $scope.platformAuthMsg = "";
                }
                count = 0;
                console.log($scope.platformAuthMsg)
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
    /*
        // 新增
        $scope.add = function() {
            $scope.error_description= "";
            $scope.brokerStatusBlock=true;
            ModalService.open($scope, modalPath, function(scope) {
                scope.title = "添加";
            }, function(newData) {
                console.log(JSON.stringify(newData));
                console.log(typeof newData);
                console.log(typeof JSON.stringify(newData));
                mqBrokerAPI.add(JSON.stringify(newData),function(data) {
                    console.log('添加成功');
                    $scope.getList();
                    ModalService.close();
                }, function(err) {
                    $scope.error_description = err.data.error.description;
                });
            });
        };

        // 编辑
        $scope.edit = function(data) {
            $scope.error_description= "";
            $scope.brokerStatusBlock=false;
            ModalService.open($scope, modalPath, function(scope) {
                scope.title = "编辑";
                scope.formData = angular.copy(data);
                scope.httpDisable = true;
            }, function(newData) {
                mqBrokerAPI.edit(JSON.stringify(newData), function(data) {
                    $scope.getList();
                    ModalService.close();
                }, function(err) {
                    $scope.error_description = err.data.error.description;
                });
            });
        };

        // 删除
        $scope.delet = function(brokerTag) {
            console.log(brokerTag);
            ModalService.confirm({body: '您确定要删除吗？'}, function(){
                mqBrokerAPI.delet({brokerTag: brokerTag}, function(data) {
                    $scope.getList();
                }, function(err) {
                    toastr.error(err.data.error.description);
                });
            });
        };

        // 是否刷新验证码
        $scope.refreshSwitch = function(templateId, refreshEnabled) {
            // 避免初始化就调用 onChange 事件插件
            if(count < $scope.dataInfo.length ) {
                count++;
                return false;
            }

            mqBrokerAPI.isrefresh({brokerTag: templateId}, $.param({}), function(data){
                $scope.getList();
            }, function(err) {
                toastr.error(err.data.error.description);
            });
        }
    */
    }]);

