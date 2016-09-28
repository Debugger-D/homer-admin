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
        $scope.division = { "辽宁省": {"沈阳市": ["和平区", "沈河区", "大东区", "皇姑区", "铁西区", "苏家屯区", "东陵区", "新城子区", "于洪区", "辽中县", "康平县", "法库县", "新民市"], "大连市": ["中山区", "西岗区", "沙河口区", "甘井子区", "旅顺口区", "金州区", "长海县", "瓦房店市", "普兰店市", "庄河市"], "鞍山市": ["铁东区", "铁西区", "立山区", "千山区", "台安县", "岫岩满族自治县", "海城市"], "抚顺市": ["新抚区", "东洲区", "望花区", "顺城区", "抚顺县", "新宾满族自治县", "清原满族自治县"], "本溪市": ["平山区", "溪湖区", "明山区", "南芬区", "本溪满族自治县", "桓仁满族自治县"], "丹东市": ["元宝区", "振兴区", "振安区", "宽甸满族自治县", "东港市", "凤城市"], "锦州市": ["古塔区", "凌河区", "太和区", "黑山县", "义县", "凌海市", "北宁市"], "营口市": ["站前区", "西市区", "鲅鱼圈区", "老边区", "盖州市", "大石桥市"], "阜新市": ["海州区", "新邱区", "太平区", "清河门区", "细河区", "阜新蒙古族自治县", "彰武县"], "辽阳市": ["白塔区", "文圣区", "宏伟区", "弓长岭区", "太子河区", "辽阳县", "灯塔市"], "盘锦市": ["双台子区", "兴隆台区", "大洼县", "盘山县"], "铁岭市": ["银州区", "清河区", "铁岭县", "西丰县", "昌图县", "调兵山市", "开原市"], "朝阳市": ["双塔区", "龙城区", "朝阳县", "建平县", "喀喇沁左翼蒙古族自治县", "北票市", "凌源市"], "葫芦岛市": ["连山区", "龙港区", "南票区", "绥中县", "建昌县", "兴城市"]} , "海南省": {"海口市": ["秀英区", "龙华区", "琼山区", "美兰区"], "三亚市": ["三亚市"], "省直辖县级行政单位": ["五指山市", "琼海市", "儋州市", "文昌市", "万宁市", "东方市", "定安县", "屯昌县", "澄迈县", "临高县", "白沙黎族自治县", "昌江黎族自治县", "乐东黎族自治县", "陵水黎族自治县", "保亭黎族苗族自治县", "琼中黎族苗族自治县", "西沙群岛", "南沙群岛", "中沙群岛的岛礁及其海域"]}};

        $scope.submit = function (address) {
            console.log(address.province,address.city,address.district)
            /*
            var address = $scope.address || {},
                text = (address.province + address.city + address.district) || '请选择地址...',
                addressModal = $modal({title: '提交', content: text, show: true});
        */
        };

    }]);

