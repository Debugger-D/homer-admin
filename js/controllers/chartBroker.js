/**
 * Created by Administrator on 2016/9/27.
 */
angular.module('MetronicApp').controller('chartBrokerController', ['$scope', '$rootScope', '$timeout', 'ModalService', 'chartAPI',
    function($scope, $rootScope, $timeout ,ModalService,chartAPI) {
        var myChart = echarts.init(document.getElementById('chartBroker'));
        chartAPI.gettest({},function (data) {
            $scope.platformAuthMsg="";
            console.log(data)
            console.log(data.xAxis)
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
            console.log(names)
            console.log(data.serieses)
            option = {
                title : {
                    text: 'Broker数据图',
                    subtext: 'www.trc.com 泰然城'
                },
                tooltip : {
                    trigger: 'axis'
                },
                legend: {
                    data:names//['意向','预购','成交']
                },
                ///backgroundColor: '#ddd',
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
                        data : data.xAxis
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series :data.serieses
            };


            // 为echarts对象加载数据
            myChart.setOption(option);
        },function () {
            $scope.platformAuthMsg="系统异常"
        })


    }]);

