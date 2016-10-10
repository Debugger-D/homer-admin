/**
 * Created by Administrator on 2016/9/27.
 */
angular.module('MetronicApp').controller('chartTopicController', ['$scope', '$modal','$rootScope', '$timeout', 'ModalService', 'chartAPI', '$stateParams',
    function($scope,$modal, $rootScope, $timeout ,ModalService,chartAPI, $stateParams) {
        $scope.address={};
        chartAPI.gettopic({},function (data) {
            $scope.division=data.result;
        });
        var myChart = echarts.init(document.getElementById('chartTopic'));
        //=======echart通用参数=========
        var　option = {
            title : {
                text: '',
                subtext: 'www.trc.com 泰然城'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:''//names
            },
            toolbox: {
                show : true,
                feature : {
                    mark : {show: true},
                    dataView : {show: true, readOnly: false},
                    magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
                    restore : {show: true},
                    saveAsImage : {show: true}
                }
            },
            calculable : true,
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    data :''// data.xAxis
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series :''//data.serieses

        };
        $scope.submit=function (data) {
            $scope.chartShow=false;
            console.log($scope.filterObj)


            //========请求数据=======
            chartAPI.chartdata({},JSON.stringify($scope.filterObj),function (data) {
                $scope.platformAuthMsg="";
                if(data.serieses){
                    $scope.chartShow=true;
                }else{
                    $scope.platformAuthMsg="暂无数据"
                }
                var slength=data.serieses.length
                var names=[]
                for(var i=0;i<slength;i++){
                    names.push(data.serieses[i].seriesName)
                    data.serieses[i]=$.extend( {},{
                        type:'line',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'shine'}}},
                        name: data.serieses[i].seriesName,
                        data:data.serieses[i].series
                    })
                }
                //修改系统参数
                option.legend.data=names;
                option.xAxis[0].data=data.xAxis;
                option.series=data.serieses
                // 为echarts对象加载数据
                console.log('###22222');
                console.log(option);
                myChart.clear();
                console.log($scope.filterObj)
                myChart.setOption(option);

            },function () {
                $scope.chartShow=false;
                $scope.platformAuthMsg="系统异常"
            })
        }



        $scope.filterObj = $.extend( {}, {broker: '', topic: '',statisticalType:'',chartType:'P1',valueType:'TOTAL_NUMBER',period:'ONEHOUR',queryTime:''});
        console.log($stateParams.broker)
        $scope.address.time='P1';
        $scope.address.status='TOTAL_NUMBER';
        if($stateParams.broker!=":broker"){
            $scope.address.broker=$stateParams.broker
            $scope.filterObj.broker=$stateParams.broker;
            $scope.filterObj.statisticalType="BROKER"
            $scope.submit();
        }

        //========提交请求数据=========
        //broker图
        $scope.broker=function(data){
            $scope.filterObj.broker=data.broker;
            $scope.filterObj.statisticalType="BROKER"
            $scope.submit();
        }
        $scope.topic=function(data){
            $scope.filterObj.topic=data.topic;
            $scope.filterObj.statisticalType="TOPIC"
            $scope.submit();
        }
        $scope.status=function(data){
            $scope.filterObj.valueType=data.status.toString()
            console.log(typeof ($scope.filterObj.valueType))
            $scope.submit();
        }


        $scope.time=function(data){
            console.log(data.time)
            $scope.filterObj.chartType=data.time.toString();
            console.log($scope.filterObj.chartType);
            if($scope.filterObj.chartType=="P1"){
                $scope.filterObj.period="ONEHOUR";
                $scope.filterObj.queryTime="";
            }else if($scope.filterObj.chartType=="P2"){
                $scope.filterObj.period="ONEMINUTE";
            }
            console.log($scope.filterObj.period)
            $scope.submit();
        }



        myChart.on("click", function (param) {
            if ($scope.filterObj.chartType=="P1"){
                $scope.filterObj.chartType="P2";
                $scope.filterObj.period="ONEMINUTE";
                $scope.filterObj.queryTime=param.name.toString();
                $scope.address.time='P2';
                $scope.submit();
            }
            console.log(param.name)
            // $scope.$apply($location.path('/main/chartTopic/'+param.name));

        })

    }]);

