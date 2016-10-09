/**
 * Created by Administrator on 2016/9/30.
 */
angular.module('MetronicApp').controller('chartPieController', ['$scope', '$rootScope', '$timeout', 'ModalService', 'chartAPI','$location',
    function($scope, $rootScope, $timeout ,ModalService,chartAPI,$location) {
        $scope.chartShow=true;
        var myChart = echarts.init(document.getElementById('chartPie'));


        $scope.filterObj = 'TOTAL_NUMBER';
        $scope.status=function(data){
            $scope.filterObj=data.status.toString()
            console.log($scope.filterObj)
            $scope.getPie();
        }
        $scope.getPie=function () {
            chartAPI.getPie({},$scope.filterObj,function (data) {
            var  data0= {
                "data": [
                    {"values": 145206, "name": "snow.broker"},{"values": 10206, "name": "test"}
                ],
                "series": [
                    "snow.broker","test"
                ]
            }
            console.log(data,data.data)
            $scope.platformAuthMsg="";
            var slength=data.data.length
            var names=[]
            for(var i=0;i<slength;i++){
                data.data[i]=$.extend( {},{
                    value: data.data[i].values,
                    name:data.data[i].name
                })
            }
            option = {
                title : {
                    text: 'Broker数据图',
                    subtext: 'www.trc.com 泰然城',
                    x:'right',
                    y:'bottom'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient : 'vertical',
                    x : 'left',
                    data:data.series//['Chrome','Firefox','Safari','IE9+','IE8-']
                },
                toolbox: {
                    show : true,
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : false,
                series : (function (){
                    var series = [];
                    for (var i = 0; i < 30; i++) {
                        series.push({
                            name:'Broker',
                            type:'pie',
                            itemStyle : {normal : {
                                label : {show : i > 28},
                                labelLine : {show : i > 28, length:20}
                            }},
                            radius : [i * 4 + 40, i * 4 + 43],
                            data:data.data//[{value: 80,  name:'Chrome'}, {value:  160,  name:'Firefox'}, {value:320,  name:'Safari'}, {value:  640,  name:'IE9+'}, {value:1280, name:'IE8-'}]
                        })
                    }
                    series[0].markPoint = {
                        symbol:'emptyCircle',
                        symbolSize:series[0].radius[0],
                        effect:{show:true,scaleSize:12,color:'rgba(250,225,50,0.8)',shadowBlur:10,period:30},
                        data:[{x:'50%',y:'50%'}]
                    };
                    return series;
                })()
            };
            console.log(data)
            myChart.setOption(option);
        },function () {
            $scope.platformAuthMsg="系统异常"
        })
        }
        $scope.getPie();
        // 为echarts对象加载数据
        myChart.on("click", function (param) {
            console.log(param.name)
            $scope.$apply($location.path('/main/chartTopic/'+param.name));

        })

    }]);

