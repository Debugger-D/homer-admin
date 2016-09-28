/**
 * Created by Administrator on 2016/9/27.
 */
angular.module('MetronicApp').controller('chartBrokerController', ['$scope', '$rootScope', '$timeout', 'ModalService', 'chartAPI',
    function($scope, $rootScope, $timeout ,ModalService,chartAPI) {
        var myChart = echarts.init(document.getElementById('chartBroker'));
        chartAPI.gettest({},function (data) {
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
                /* [
                    {
                        name:'成交',
                        type:'line',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:[10, 12, 21, 54, 260, 830, 710]
                    },
                    {
                        name:'预购',
                        type:'line',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:[30, 182, 434, 791, 390, 30, 10]
                    },
                    {
                        name:'意向',
                        type:'line',
                        smooth:true,
                        itemStyle: {normal: {areaStyle: {type: 'default'}}},
                        data:[1320, 1132, 601, 234, 120, 90, 20]
                    }
                ]*/

            };


            // 为echarts对象加载数据
            myChart.setOption(option);
        })


    }]);

