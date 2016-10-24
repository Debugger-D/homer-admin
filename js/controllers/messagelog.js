/**
 * Created by Administrator on 2016/9/19.
 */
angular.module('MetronicApp').controller('messagelogController', ['$scope', '$rootScope', '$timeout', 'ModalService', 'messagelogAPI', //'platformAPI',
    function($scope, $rootScope, $timeout ,ModalService,messagelogAPI) {
        //var modalPath = "views/mqBroker/mqBrokerModal.html";
        var count = 0;
        $scope.filterOptions={}
        $scope.keyBlock=false;
        $scope.idBlock=true;
        $scope.selecttype=function () {
            console.log($scope.selectwhat)
            if($scope.selectwhat=='id'){
                $scope.filterOptions.messageKey='';
                $scope.filterOptions.messageId='';
                $scope.idBlock=true;
                $scope.keyBlock=false;
            }else{
                $scope.filterOptions.messageKey='';
                $scope.filterOptions.messageId='';
                $scope.idBlock=false;
                $scope.keyBlock=true;
            }
        }

        // 获取
        $scope.messageTrace=false;
        $scope.getList = function() {
            //var filterObj = $.extend( {}, {pageIndex: $scope.currentPage, pageSize: $scope.pageCount}, $scope.filterOptions);
            var filterObj = $.extend( {},$scope.filterOptions);
            //数据
            messagelogAPI.getmessagelog(filterObj, function(data) {
                if(data.length < 1 ) {
                    $scope.databeside=false;
                    $scope.platformAuthMsg=true;
                    $scope.dataInfo = [];
                    $scope.messageTrace=false;
                    // $scope.totalItems = 0;
                    $scope.platformAuthMsg = '暂无数据';
                } else {
                    $scope.databeside=true;
                    $scope.msi=data;
                }
                count = 0;
            }, function(err) {
                $scope.databeside=false;
                $scope.error_description&&($scope.error_description = err.data.error.description);
                if(err.status == 403) {
                    $scope.platformAuthMsg = '您无权查看';
                }else{$scope.platformAuthMsg = '查不到数据';}
            });
        };
        //==============流程图==============
        $scope.getTime = function() {
            $scope.chart1=false;
            $scope.chart2=false;
            $scope.chart3=false;
            $scope.chart4=false;
            $scope.chart5=false;
            $scope.chart6=false;
            $scope.chart7=false;
            var filterObj = $.extend( {},$scope.filterOptions);
            //流程图
            messagelogAPI.getmessagetime(filterObj, function(makeData) {
                if(makeData.length < 1 ) {
                    $scope.messageTrace=false;
                    // $scope.totalItems = 0;
                } else {
                    $scope.messageTrace=true;
                    var timeL=0;
                    var length=makeData.length
                    // console.log(makeData.length)
                    //console.log(makeData[length])
                    $scope.endStatus=makeData[length-1].logType;
                    console.log($scope.endStatus)
                    //拿到总时间
                    for(var i=1;i< length;i++){
                        timeL+=makeData[i].logTime;
                        console.log(timeL)
                    }
                    $scope.timepoint=Math.ceil(timeL/10);
                    //根据返回数据量显示不同图
                    var timeL= $scope.timepoint*10
                    if(makeData[1]){
                        $scope.time1=makeData[1].logTime;
                        $scope.chart1=true;
                        $scope.timeL1=makeData[1].logTime/timeL*100;
                        if($scope.timeL1>40){
                            $scope.timeL1-=1;
                        }
                    };
                    if(makeData[2]){
                        $scope.time2=makeData[2].logTime;
                        $scope.chart2=true;
                        $scope.timeL2=makeData[2].logTime/timeL*100
                        if($scope.timeL2>40){
                            $scope.timeL2-=1;
                        }

                    };
                    if(makeData[3]){
                        $scope.time3=makeData[3].logTime;
                        $scope.chart3=true;
                        $scope.timeL3=makeData[3].logTime/timeL*100
                        if($scope.timeL3>40){
                            $scope.timeL3-=1;
                        }
                    };
                    if(makeData[4]){
                        $scope.time4=makeData[4].logTime;
                        $scope.chart4=true;
                        $scope.timeL4=makeData[4].logTime/timeL*100
                        if($scope.timeL4>40){
                            $scope.timeL4-=1;
                        }
                    };
                    if(makeData[5]){
                        $scope.time5=makeData[5].logTime;
                        $scope.chart5=true;
                        $scope.timeL5=makeData[5].logTime/timeL*100
                        if($scope.timeL5>40){
                            $scope.timeL5-=1;
                        }
                    };
                    if(makeData[6]){
                        $scope.time6=makeData[6].logTime;
                        $scope.chart6=true;
                        $scope.timeL6=makeData[6].logTime/timeL*100
                        if($scope.timeL6>40){
                            $scope.timeL6-=1;
                        }
                    };
                    if(makeData[7]){
                        $scope.time7=makeData[7].logTime;
                        $scope.chart7=true;$scope.timeL7=makeData[7].logTime/timeL*100
                        if($scope.timeL7>40){
                            $scope.timeL7-=1;
                        }
                    };
                }

            }, function(err) {
                $scope.messageTrace=false;
                if(err.status == 403) {
                    $scope.platformAuthMsg = '您无权查看';
                }
            });
        };

        //日志内容
        $scope.detail=function (data) {
            $("#mesbody").modal("show");
            $scope.logContent=data;
        }
        // 根据用户输入实时查询平台
        var timeout;
        $scope.$watch('filterOptions', function(newVal, oldVal) {
            $scope.platformAuthMsg = "";
            $scope.dataInfo = []
            $scope.messageTrace=false;
            $scope.totalItems = 0;
            if (newVal !== oldVal) {
                if (timeout) $timeout.cancel(timeout);
                timeout = $timeout(function() {
                    $scope.getList();
                    $scope.getTime();
                }, 500);
            }
        }, true);

    }]);

