/**
 * Created by Administrator on 2016/9/13.
 */
angular.module('MetronicApp').controller('mqBrokerController', ['$scope', '$rootScope', '$timeout', 'ModalService', 'mqBrokerAPI', //'platformAPI',
    function($scope, $rootScope, $timeout ,ModalService, mqBrokerAPI) {
        var modalPath = "views/mqBroker/mqBrokerModal.html";
        var count = 0;

        //获取broker标签对应值对
        $scope.transMap = {};
        mqBrokerAPI.getregion({}, function(data) {
            $scope.region = data.infos;
            console.log($scope.region)
            for(var i = 0; i < data.infos.length; i++) {
                var dd = data.infos[i];
                $scope.transMap[dd.templateCode] = dd.templateName;
            }
        }, function(err) {
            toastr.error(err.data.error.description)
        })
        //获取appid标签对应值对
        $scope.transMap1 = {};
        mqBrokerAPI.getregion({}, function(data) {
            $scope.app = data.infos;
            console.log($scope.app)
            for(var i = 0; i < data.infos.length; i++) {
                var dd = data.infos[i];
                $scope.transMap1[dd.templateCode] = dd.templateName;
            }
        }, function(err) {
            toastr.error(err.data.error.description)
        })

        // =======获取所有信息==========
        $scope.getList = function() {
            var filterObj = $.extend( {}, {pageIndex: $scope.currentPage, pageSize: $scope.pageCount}, $scope.filterOptions);
            mqBrokerAPI.get(filterObj, function(data) {
                $scope.dataInfo = [];
                if(data.length < 1 ) {
                    $scope.dataInfo = [];
                    // $scope.totalItems = 0;
                    $scope.platformAuthMsg = '暂无数据';
                } else {
                    $scope.dataInfo = data;
                    console.log($scope.dataInfo[0].region)
                    $scope.platformAuthMsg = "";
                }
                count = 0;
            }, function(err) {
                $scope.error_description&&($scope.error_description = err.data.error.description);
                if(err.status == 403) {
                    $scope.platformAuthMsg = '您无权查看';
                }else{$scope.platformAuthMsg = '查不到数据';}
            });
        }

        // =====新增=======
        $scope.formData={}
        $scope.add = function() {
            $scope.error_description= "";
            $scope.brokerStatusBlock=true;
            $scope.brokeredit=false;
            ModalService.open($scope, modalPath, function(scope) {
                scope.title = "添加";
            }, function(newData) {
                console.log(JSON.stringify(newData));
                mqBrokerAPI.add({},JSON.stringify(newData),function(data) {
                // mqBrokerAPI.add({}, $.param(newData), function(data) {
                    console.log('添加成功');
                    $scope.getList();
                    ModalService.close();
                }, function(err) {
                    $scope.error_description = err.data.error.description;
                });
            });
        };

        // =====编辑========
        $scope.edit = function(data) {
            $scope.error_description= "";
            $scope.brokerStatusBlock=false;
            $scope.brokeredit=true;
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

        // ====删除=======
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

        // =====是否刷新验证码========
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
                $scope.getList();
            });
        }

        // 首次加载数据
        $scope.getList();
    }]);

