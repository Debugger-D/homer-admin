/**
 * Created by Administrator on 2016/10/17.
 */
angular.module('MetronicApp').controller('parameterController', ['$scope', '$rootScope', '$timeout', 'ModalService', 'parameterAPI','messageallAPI','$state',
    function($scope, $rootScope, $timeout ,ModalService, parameterAPI,messageallAPI,$state) {
        var modalPath = "views/parameter/parameterModal.html";
        var count = 0;

        //检查权限
        messageallAPI.isAdmin({},function (data) {
            if(data.power!='manager'){
                $scope.isAdmin=true;
            }
        })
        // 获取
        $scope.getList = function() {
            var filterObj = $.extend( {}, {pageIndex: $scope.currentPage, pageSize: $scope.pageCount}, $scope.filterOptions);
            console.log(23323)

            parameterAPI.get(filterObj, function(data) {
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
        // =====新增=======
        $scope.add = function() {
            $scope.error_description= "";
            $scope.addBlock=true;
            $scope.editBlock=false;
            ModalService.open($scope, modalPath, function(scope) {
                scope.title = "添加";
            }, function(newData) {
                console.log(JSON.stringify(newData));
                parameterAPI.add({},JSON.stringify(newData),function(data) {
                    // mqBrokerAPI.add({}, $.param(newData), function(data) {
                    console.log('添加成功');
                    $scope.getList();
                    ModalService.close();
                }, function(err) {
                    $scope.error_description = err.data.error.description;
                });
            });
        };
        $scope.formData={};
        // =====编辑========
        $scope.edit = function(data) {
            $scope.error_description= "";
            $scope.addBlock=false;
            $scope.editBlock=true;
            ModalService.open($scope, modalPath, function(scope) {
                scope.title = "编辑";
                scope.formData = angular.copy(data);
                scope.httpDisable = true;
            }, function(newData) {
                parameterAPI.edit(JSON.stringify(newData), function(data) {
                    $scope.getList();
                    ModalService.close();
                }, function(err) {
                    $scope.error_description = err.data.error.description;
                });
            });
        };

        // ====删除=======
        $scope.delet = function(paramCode) {
            console.log(paramCode);
            ModalService.confirm({body: '您确定要删除吗？'}, function(){
                parameterAPI.delet({paramCode: paramCode}, function(data) {
                    $scope.getList();
                }, function(err) {
                    toastr.error(err.data.error.description);
                });
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
