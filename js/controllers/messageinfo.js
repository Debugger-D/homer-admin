/**
 * Created by Administrator on 2016/9/18.
 */
angular.module('MetronicApp').controller('messageinfoController', ['$scope', '$rootScope', '$timeout', 'ModalService', 'messageinfoAPI', //'platformAPI',
    function($scope, $rootScope, $timeout ,ModalService,messageinfoAPI) {
        var modalPath = "views/message/messageModal.html";
        var count = 0;

        // ==============获取==============
        $scope.getList = function() {
            //var filterObj = $.extend( {}, {pageIndex: $scope.currentPage, pageSize: $scope.pageCount}, $scope.filterOptions);
            $scope.platformAuthMsg='';
            var filterObj = $.extend( {},$scope.filterOptions);
            messageinfoAPI.getmessageinfo(filterObj, function(data) {
                console.log(filterObj)
                if(data.length < 1 ) {
                    $scope.dataInfo = [];
                    // $scope.totalItems = 0;
                    $scope.platformAuthMsg = '暂无数据';
                } else {
                    $scope.tdBlock=true;
                    $scope.messageKey=data.messageKey;
                    $scope.messageTopic=data.messageTopic;
                    $scope.messageHeader=data.messageHeader;
                    $scope.requestType=data.requestType;
                    $scope.payload = data.payload;
                    $scope.appId=data.appId;
                    $scope.messageId=data.messageId;
                    $scope.messageSource=data.messageSource;
                    $scope.messageBody=data.messageBody;
                    $scope.messageSubscriber=data.messageSubscriber;
                    $scope.messageSubscriberJ=JSON.parse(data.messageSubscriber);
                }
                count = 0;
                messageinfoAPI.getmessagestatus(filterObj, function(data) {
                    $scope.MessageStatus=data.MessageStatus;
                    count = 0;
                    messageinfoAPI.getmessageresinfo(filterObj, function(data) {
                        $scope.twoBlock=true;
                        $scope.msi=data;
                        count = 0;
                    }, function(err) {
                        $scope.twoBlock=false;
                        $scope.msi='';
                        $scope.error_description&&($scope.error_description = err.data.error.description);
                        if(err.status == 403) {
                            $scope.platformAuthMsg = '您无权查看';
                        }else{$scope.platformAuthMsg = '消息不存在';}
                    });
                }, function(err) {
                    $scope.error_description&&($scope.error_description = err.data.error.description);
                    if(err.status == 403) {
                        $scope.platformAuthMsg = '您无权查看';
                    }else{$scope.platformAuthMsg = '消息不存在';}
                });
            }, function(err) {
                $scope.tdBlock=false;
                $scope.twoBlock=false;
                $scope.error_description&&($scope.error_description = err.data.error.description);
                if(err.status == 403) {
                    $scope.platformAuthMsg = '您无权查看';
                }else{$scope.platformAuthMsg = '消息不存在';}
            });
        };
        //消息用户
        $scope.detail=function () {
            $("#configMsg").modal("show");
        };
        //消息主体
        $scope.mesbody=function () {
            $("#mesbody").modal("show");
        };
    //==========手动确认消息响应成功===========
       /* $scope.change=function (data) {
            var filterObj = $.extend( {},{messageId:data.messageId,subscriberId:data.subscriberId});
            messageinfoAPI.change(filterObj,$.param({}), function(data) {
                $scope.getList();
            }, function(err) {
                $scope.error_description&&($scope.error_description = err.data.error.description);
                if(err.status == 403) {
                    $scope.platformAuthMsg = '报错';
                }else{$scope.platformAuthMsg = '发送失败';}
            });
        };*/
    //==========重发消息==============
        $scope.resend=function (data) {
            //var filterObj = $.extend( {},{messageKey:data});
            messageinfoAPI.resend({'messagekey':data},null, function(data) {
                $scope.getList();
            }, function(err) {
                $scope.error_description&&($scope.error_description = err.data.error.description);
                if(err.status == 403) {
                    $scope.platformAuthMsg = '报错';
                }else{$scope.platformAuthMsg = '发送失败';}
            });
        };
    // ========根据用户输入实时查询平台==========
        var timeout;
        $scope.$watch('filterOptions', function(newVal, oldVal) {
            $scope.platformAuthMsg = "";
            $scope.dataInfo = []
            $scope.totalItems = 0;
            if (newVal !== oldVal) {
                if (timeout) $timeout.cancel(timeout);
                timeout = $timeout(function() {
                    $scope.getList();
                }, 500);
            }
        }, true);
    //===============创建消息============
     /*   $scope.add=function () {
            ModalService.open($scope, modalPath, function(scope) {
                scope.title = "添加";
            }, function(newData) {
                newData.messageHeaders = $.extend( {}, {messageHeaders: newData.messageHeaders})
                console.log(newData.messageHeaders,newData)
                newData.messageHeaders=JSON.stringify(newData.messageHeaders)
                console.log(JSON.stringify(newData),newData.messageHeaders)
                messageinfoAPI.add({},JSON.stringify(newData), function(data) {
                    $scope.getList();
                    ModalService.close();
                }, function(err) {
                    $scope.error_description = err.data.error.description;
                });
            });
        }*/

    }]);

