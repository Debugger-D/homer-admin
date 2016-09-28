/**
 * Created by Administrator on 2016/9/27.
 */
angular.module('MetronicApp').controller('chartTopicController', ['$scope', '$modal','$rootScope', '$timeout', 'ModalService', 'chartAPI',
    function($scope,$modal, $rootScope, $timeout ,ModalService,chartAPI) {
        var myChart = echarts.init(document.getElementById('chartBroker'));
        var　option = {
            title : {
                text: 'Broker数据图',
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
            option.legend.data=names;
            option.xAxis[0].data=data.xAxis;
            option.series=data.serieses
            console.log(names)
            console.log(data.serieses)
            // 为echarts对象加载数据
            myChart.setOption(option);
        })
        $scope.division = { "辽宁省": {"沈阳市": ["和平区", "沈河区", "大东区","康平县", "法库县", "新民市"], "大连市": ["中山区", "金州区", "长海县", "瓦房店市", "普兰店市", "庄河市"],  "朝阳市": ["双塔区", "龙城区", "朝阳县", "建平县", "喀喇沁左翼蒙古族自治县", "北票市", "凌源市"], "葫芦岛市": ["连山区", "龙港区", "南票区", "绥中县", "建昌县", "兴城市"]} , "海南省": {"海口市": ["秀英区", "龙华区", "琼山区", "美兰区"], "三亚市": ["三亚市"], "省直辖县级行政单位": ["五指山市", "琼中黎族苗族自治县", "西沙群岛", "南沙群岛", "中沙群岛的岛礁及其海域"]}};

        $scope.submit = function (address) {
            console.log(address.province,address.city,address.district)
        };

    }]);

