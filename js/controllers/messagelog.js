/**
 * Created by Administrator on 2016/9/19.
 */
angular.module('MetronicApp').controller('messagelogController', ['$scope', '$rootScope', '$timeout', 'ModalService', 'messagelogAPI', //'platformAPI',
    function($scope, $rootScope, $timeout ,ModalService,messagelogAPI) {
        //var modalPath = "views/mqBroker/mqBrokerModal.html";
        var count = 0;

        // 获取

        $scope.getList = function() {
            //var filterObj = $.extend( {}, {pageIndex: $scope.currentPage, pageSize: $scope.pageCount}, $scope.filterOptions);
            var filterObj = $.extend( {},$scope.filterOptions);
            //数据
            messagelogAPI.getmessagelog(filterObj, function(data) {
                if(data.length < 1 ) {
                    $scope.platformAuthMsg=true;
                    $scope.dataInfo = [];
                    // $scope.totalItems = 0;
                    $scope.platformAuthMsg = '暂无数据';
                } else {
                    $scope.msi=data;
                }
                count = 0;
            }, function(err) {
                $scope.error_description&&($scope.error_description = err.data.error.description);
                if(err.status == 403) {
                    $scope.platformAuthMsg = '您无权查看';
                }else{$scope.platformAuthMsg = '消息不存在';}
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
                if(makeData[1]){
                    $scope.time1=makeData[1].logTime;
                    $scope.chart1=true;
                    $scope.timeL1=makeData[1].logTime/timeL*100-0.1
                };
                if(makeData[2]){
                    $scope.time2=makeData[2].logTime;
                    $scope.chart2=true;
                    $scope.timeL2=makeData[2].logTime/timeL*100-0.1

                };
                if(makeData[3]){
                    $scope.time3=makeData[3].logTime;
                    $scope.chart3=true;
                    $scope.timeL3=makeData[3].logTime/timeL*100-0.1
                };
                if(makeData[4]){
                    $scope.time4=makeData[4].logTime;
                    $scope.chart4=true;
                    $scope.timeL4=makeData[4].logTime/timeL*100-0.1
                };
                if(makeData[5]){
                    $scope.time5=makeData[5].logTime;
                    $scope.chart5=true;
                    $scope.timeL5=makeData[5].logTime/timeL*100-0.1
                };
                if(makeData[6]){
                    $scope.time6=makeData[6].logTime;
                    $scope.chart6=true;
                    $scope.timeL6=makeData[6].logTime/timeL*100-0.1
                };
                if(makeData[7]){
                    $scope.time7=makeData[7].logTime;
                    $scope.chart7=true;$scope.timeL7=makeData[7].logTime/timeL*100-0.1
                };
            }, function(err) {
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
            $scope.totalItems = 0;
            if (newVal !== oldVal) {
                if (timeout) $timeout.cancel(timeout);
                timeout = $timeout(function() {
                    $scope.getList();
                    $scope.getTime();
                }, 500);
            }
        }, true);

        $scope.getTimeF=function () {
            $scope.messageTrace=true;
            messagelogAPI.gettest({}, function(makeData) {
                console.log(makeData)
                console.log(makeData.xAxis)
                console.log(makeData.serieses)
                console.log(makeData.serieses.series,makeData.serieses.seriesName)
                console.log(makeData.serieses.series[0])
            })


            var timeL=0;
            var length=makeData[0].length
            for(var i=1;i< length;i++){
                timeL+=makeData[0][i].logTime;
                console.log(timeL)
            }
            $scope.timepoint=Math.ceil(timeL/10);
            //for(var i=1;i< length;i++){
            console.log(makeData[0],makeData[0].length)
           if(makeData[0].length>1){
                $scope.time1=makeData[0][1].logTime;
               $scope.chart1=true;
               $scope.timeL1=makeData[0][1].logTime/timeL*100
            };
           if(makeData[0].length>2){
               $scope.time2=makeData[0][2].logTime;
               $scope.chart2=true;
               $scope.timeL2=makeData[0][2].logTime/timeL*100

           };
           if(makeData[0].length>3){
               $scope.time3=makeData[0][3].logTime;
               $scope.chart3=true;
               $scope.timeL3=makeData[0][3].logTime/timeL*100
           };
           if(makeData[0].length>4){
               $scope.time4=makeData[0][4].logTime;
               $scope.chart4=true;
               $scope.timeL4=makeData[0][4].logTime/timeL*100
           };
           if(makeData[0].length>5){
               $scope.time5=makeData[0][5].logTime;
               $scope.chart5=true;
               $scope.timeL5=makeData[0][5].logTime/timeL*100
           };
           if(makeData[0].length>6){
               $scope.time6=makeData[0][6].logTime;
               $scope.chart6=true;
               $scope.timeL6=makeData[0][6].logTime/timeL*100
           };
           if(makeData[0].length>7){
               $scope.time7=makeData[0][7].logTime;
               $scope.chart7=true;$scope.timeL7=makeData[0][7].logTime/timeL*100
           };
                //$scope.time2=makeData[0][2].logTime//&&($scope.chart2=true);
                //$scope.time3=makeData[0][3].logTime//&&($scope.chart3=true);
                //$scope.time4=makeData[0][4].logTime//&&($scope.chart4=true);
                //$scope.time5=makeData[0][5].logTime//&&($scope.chart5=true);
                //$scope.time6=makeData[0][6].logTime//&&($scope.chart6=true);
                console.log($scope.time7=makeData[0][7]&&makeData[0][7].logTime)//&&($scope.chart7=true);

                //$scope.timeL1=makeData[0][1]&&makeData[0][1].logTime/timeL*100//-0.9;
                //$scope.timeL2=makeData[0][2]&&makeData[0][2].logTime/timeL*100//-0.9;
                //$scope.timeL3=makeData[0][3]&&makeData[0][3].logTime/timeL*100//-0.9;
                //$scope.timeL4=makeData[0][4]&&makeData[0][4].logTime/timeL*100//-0.9;
                //$scope.timeL5=makeData[0][5]&&makeData[0][5].logTime/timeL*100//-0.9;
                //$scope.timeL6=makeData[0][6]&&makeData[0][6].logTime/timeL*100//-0.9;
                //$scope.timeL7=makeData[0][7]&&makeData[0][7].logTime/timeL*100//-0.9;
          /*  $scope.timeL1=makeData[0][1].logTime/timeL*100//-0.9;
            $scope.timeL2=makeData[0][2].logTime/timeL*100//-0.9;
            $scope.timeL3=makeData[0][3].logTime/timeL*100//-0.9;
            $scope.timeL4=makeData[0][4].logTime/timeL*100//-0.9;
            $scope.timeL5=makeData[0][5].logTime/timeL*100//-0.9;
            $scope.timeL6=makeData[0][6].logTime/timeL*100//-0.9;
            $scope.timeL7=makeData[0][7].logTime/timeL*100//-0.9;/*/
            //}
        }



    }]);

