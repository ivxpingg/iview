

(function () {
    require.config({
        paths: {
            echarts: '../../../doc/example/www/js'
        },
        packages: [
            {
                name: 'BMap',
                location: '../src',
                main: 'main'
            }
        ]
    });
    require(
    [
        'echarts',
        'BMap',
        'echarts/chart/map'
    ],

    function (echarts, BMapExtension) {
        //$('#main').css({
        //    height:$('body').height(),
        //    width: $('body').width()
        //});
        // 初始化地图
        var BMapExt = new BMapExtension($('#main')[0], BMap, echarts, {
            enableMapClick: false
        });
        var map = BMapExt.getMap();
        var container = BMapExt.getEchartsContainer();

        var startPoint = {
            x: 118.055616,
            y: 24.615827
        };
        var point = new BMap.Point(startPoint.x, startPoint.y);
        map.centerAndZoom(point, 12);
        map.enableScrollWheelZoom();

        var busline = new BMap.BusLineSearch(map, {
            renderOptions: { map: map },
            onGetBusListComplete: function (result) {
                if (result) {
                    var fstLine = result.getBusListItem(0);
                    busline.getBusLine(fstLine);
                }
            }
        });
        busline.getBusList("地铁1号线");

        // 地图自定义样式
        map.setMapStyle({
            styleJson: [
                  {
                      "featureType": "water",
                      "elementType": "all",
                      "stylers": {
                          "color": "#044161"
                      }
                  },
                  {
                      "featureType": "land",
                      "elementType": "all",
                      "stylers": {
                          "color": "#004981"
                      }
                  },
                  {
                      "featureType": "boundary",
                      "elementType": "geometry",
                      "stylers": {
                          "color": "#064f85"
                      }
                  },
                  {
                      "featureType": "railway",
                      "elementType": "all",
                      "stylers": {
                          "visibility": "off"
                      }
                  },
                  {
                      "featureType": "highway",
                      "elementType": "geometry",
                      "stylers": {
                          "color": "#004981"
                      }
                  },
                  {
                      "featureType": "highway",
                      "elementType": "geometry.fill",
                      "stylers": {
                          "color": "#005b96",
                          "lightness": 1
                      }
                  },
                  {
                      "featureType": "highway",
                      "elementType": "labels",
                      "stylers": {
                          "visibility": "off"
                      }
                  },
                  {
                      "featureType": "arterial",
                      "elementType": "geometry",
                      "stylers": {
                          "color": "#004981"
                      }
                  },
                  {
                      "featureType": "arterial",
                      "elementType": "geometry.fill",
                      "stylers": {
                          "color": "#00508b"
                      }
                  },
                  {
                      "featureType": "poi",
                      "elementType": "all",
                      "stylers": {
                          "visibility": "off"
                      }
                  },
                  {
                      "featureType": "green",
                      "elementType": "all",
                      "stylers": {
                          "color": "#056197",
                          "visibility": "off"
                      }
                  },
                  {
                      "featureType": "subway",
                      "elementType": "all",
                      "stylers": {
                          "visibility": "off"
                      }
                  },
                  {
                      "featureType": "manmade",
                      "elementType": "all",
                      "stylers": {
                          "visibility": "off"
                      }
                  },
                  {
                      "featureType": "local",
                      "elementType": "all",
                      "stylers": {
                          "visibility": "off"
                      }
                  },
                  {
                      "featureType": "arterial",
                      "elementType": "labels",
                      "stylers": {
                          "visibility": "off"
                      }
                  },
                  {
                      "featureType": "boundary",
                      "elementType": "geometry.fill",
                      "stylers": {
                          "color": "#029fd4"
                      }
                  },
                  {
                      "featureType": "building",
                      "elementType": "all",
                      "stylers": {
                          "color": "#1a5787"
                      }
                  },
                  {
                      "featureType": "label",
                      "elementType": "all",
                      "stylers": {
                          "visibility": "off"
                      }
                  }
            ]
        });

        option = {
            color: ['gold', 'aqua', 'lime'],
            title: {
                text: '模拟迁徙',
                subtext: '数据纯属虚构',
                x: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: function (v) {
                    return v[1].replace(':', ' > ');
                }
            },
            legend: {
                orient: 'vertical',
                x: 'left',
                data: ['厦门北站', '高崎', '塘边'],
                selectedMode: 'single',
                selected: {
                    '高崎': false,
                    '塘边': false
                },
                textStyle: {
                    color: '#fff'
                }
            },
            toolbox: {
                show: true,
                orient: 'vertical',
                x: 'right',
                y: 'center',
                feature: {
                    mark: { show: true },
                    dataView: { show: true, readOnly: false },
                    restore: { show: true },
                    saveAsImage: { show: true }
                }
            },
            dataRange: {
                min: 0,
                max: 100,
                range: {
                    start: 10,
                    end: 1000
                },
                x: 'right',
                calculable: true,
                color: ['#ff3333', 'orange', 'yellow', 'lime', 'aqua'],
                textStyle: {
                    color: '#fff'
                }
            },
            series: [
                {
                    name: '厦门北站',
                    type: 'map',
                    mapType: 'none',
                    data: [],
                    geoCoord: {
                        '厦门北站': [118.079645, 24.643368],
                        '高崎': [118.123508, 24.543385],
                        '塘边': [118.129221, 24.512065]
                    },

                    markLine: {
                        smooth: true,
                        effect: {
                            show: true,
                            scaleSize: 1,
                            period: 30,
                            color: '#fff',
                            shadowBlur: 10
                        },
                        itemStyle: {
                            normal: {
                                borderWidth: 1,
                                lineStyle: {
                                    type: 'solid',
                                    shadowBlur: 10
                                }
                            }
                        },
                        data: [
                            [{ name: '厦门北站' }, { name: '高崎', value: 1000 }],
                             [{ name: '厦门北站' }, { name: '塘边', value: 2000 }]
                        ]
                    },
                    markPoint: {
                        symbol: 'emptyCircle',
                        symbolSize: function (v) {
                            return 10 + v / 10
                        },
                        effect: {
                            show: true,
                            shadowBlur: 0
                        },
                        itemStyle: {
                            normal: {
                                label: { show: false }
                            }
                        },
                        data: [
                            { name: '高崎', value: 10 },
                            { name: '塘边', value: 12 }
                        ]
                    }

                }//,
                //{
                //    name:'上海',
                //    type:'map',
                //    mapType: 'none',
                //    data:[],
                //    markLine : {
                //        smooth:true,
                //        effect : {
                //            show: true,
                //            scaleSize: 1,
                //            period: 30,
                //            color: '#fff',
                //            shadowBlur: 10
                //        },
                //        itemStyle : {
                //            normal: {
                //                borderWidth:1,
                //                lineStyle: {
                //                    type: 'solid',
                //                    shadowBlur: 10
                //                }
                //            }
                //        },
                //        data : [
                //            [{name:'上海'},{name:'包头',value:95}],
                //            [{name:'上海'},{name:'昆明',value:90}],
                //            [{name:'上海'},{name:'广州',value:80}],
                //            [{name:'上海'},{name:'郑州',value:70}],
                //            [{name:'上海'},{name:'长春',value:60}],
                //            [{name:'上海'},{name:'重庆',value:50}],
                //            [{name:'上海'},{name:'长沙',value:40}],
                //            [{name:'上海'},{name:'北京',value:30}],
                //            [{name:'上海'},{name:'丹东',value:20}],
                //            [{name:'上海'},{name:'大连',value:10}]
                //        ]
                //    },
                //    markPoint : {
                //        symbol:'emptyCircle',
                //        symbolSize : function (v){
                //            return 10 + v/10
                //        },
                //        effect : {
                //            show: true,
                //            shadowBlur : 0
                //        },
                //        itemStyle:{
                //            normal:{
                //                label:{show:false}
                //            }
                //        },
                //        data : [
                //            {name:'包头',value:95},
                //            {name:'昆明',value:90},
                //            {name:'广州',value:80},
                //            {name:'郑州',value:70},
                //            {name:'长春',value:60},
                //            {name:'重庆',value:50},
                //            {name:'长沙',value:40},
                //            {name:'北京',value:30},
                //            {name:'丹东',value:20},
                //            {name:'大连',value:10}
                //        ]
                //    }
                //},
                //{
                //    name:'广州',
                //    type:'map',
                //    mapType: 'none',
                //    data:[],
                //    markLine : {
                //        smooth:true,
                //        effect : {
                //            show: true,
                //            scaleSize: 1,
                //            period: 30,
                //            color: '#fff',
                //            shadowBlur: 10
                //        },
                //        itemStyle : {
                //            normal: {
                //                borderWidth:1,
                //                lineStyle: {
                //                    type: 'solid',
                //                    shadowBlur: 10
                //                }
                //            }
                //        },
                //        data : [
                //            [{name:'广州'},{name:'福州',value:95}],
                //            [{name:'广州'},{name:'太原',value:90}],
                //            [{name:'广州'},{name:'长春',value:80}],
                //            [{name:'广州'},{name:'重庆',value:70}],
                //            [{name:'广州'},{name:'西安',value:60}],
                //            [{name:'广州'},{name:'成都',value:50}],
                //            [{name:'广州'},{name:'常州',value:40}],
                //            [{name:'广州'},{name:'北京',value:30}],
                //            [{name:'广州'},{name:'北海',value:20}],
                //            [{name:'广州'},{name:'海口',value:10}]
                //        ]
                //    },
                //    markPoint : {
                //        symbol:'emptyCircle',
                //        symbolSize : function (v){
                //            return 10 + v/10
                //        },
                //        effect : {
                //            show: true,
                //            shadowBlur : 0
                //        },
                //        itemStyle:{
                //            normal:{
                //                label:{show:false}
                //            }
                //        },
                //        data : [
                //            {name:'福州',value:95},
                //            {name:'太原',value:90},
                //            {name:'长春',value:80},
                //            {name:'重庆',value:70},
                //            {name:'西安',value:60},
                //            {name:'成都',value:50},
                //            {name:'常州',value:40},
                //            {name:'北京',value:30},
                //            {name:'北海',value:20},
                //            {name:'海口',value:10}
                //        ]
                //    }
                //},
                //{
                //    name:'全国',
                //    type:'map',
                //    mapType: 'none',
                //    data:[],
                //    markLine : {
                //        smooth:true,
                //        symbol: ['none', 'circle'],
                //        symbolSize : 1,
                //        itemStyle : {
                //            normal: {
                //                color:'#fff',
                //                borderWidth:1,
                //                borderColor:'rgba(30,144,255,0.5)'
                //            }
                //        },
                //        data : [
                //            [{name:'北京'},{name:'包头'}],
                //            [{name:'北京'},{name:'北海'}],
                //            [{name:'北京'},{name:'广州'}],
                //            [{name:'北京'},{name:'郑州'}],
                //            [{name:'北京'},{name:'长春'}],
                //            [{name:'北京'},{name:'长治'}],
                //            [{name:'北京'},{name:'重庆'}],
                //            [{name:'北京'},{name:'长沙'}],
                //            [{name:'北京'},{name:'成都'}],
                //            [{name:'北京'},{name:'常州'}],
                //            [{name:'北京'},{name:'丹东'}],
                //            [{name:'北京'},{name:'大连'}],
                //            [{name:'北京'},{name:'东营'}],
                //            [{name:'北京'},{name:'延安'}],
                //            [{name:'北京'},{name:'福州'}],
                //            [{name:'北京'},{name:'海口'}],
                //            [{name:'北京'},{name:'呼和浩特'}],
                //            [{name:'北京'},{name:'合肥'}],
                //            [{name:'北京'},{name:'杭州'}],
                //            [{name:'北京'},{name:'哈尔滨'}],
                //            [{name:'北京'},{name:'舟山'}],
                //            [{name:'北京'},{name:'银川'}],
                //            [{name:'北京'},{name:'衢州'}],
                //            [{name:'北京'},{name:'南昌'}],
                //            [{name:'北京'},{name:'昆明'}],
                //            [{name:'北京'},{name:'贵阳'}],
                //            [{name:'北京'},{name:'兰州'}],
                //            [{name:'北京'},{name:'拉萨'}],
                //            [{name:'北京'},{name:'连云港'}],
                //            [{name:'北京'},{name:'临沂'}],
                //            [{name:'北京'},{name:'柳州'}],
                //            [{name:'北京'},{name:'宁波'}],
                //            [{name:'北京'},{name:'南京'}],
                //            [{name:'北京'},{name:'南宁'}],
                //            [{name:'北京'},{name:'南通'}],
                //            [{name:'北京'},{name:'上海'}],
                //            [{name:'北京'},{name:'沈阳'}],
                //            [{name:'北京'},{name:'西安'}],
                //            [{name:'北京'},{name:'汕头'}],
                //            [{name:'北京'},{name:'深圳'}],
                //            [{name:'北京'},{name:'青岛'}],
                //            [{name:'北京'},{name:'济南'}],
                //            [{name:'北京'},{name:'太原'}],
                //            [{name:'北京'},{name:'乌鲁木齐'}],
                //            [{name:'北京'},{name:'潍坊'}],
                //            [{name:'北京'},{name:'威海'}],
                //            [{name:'北京'},{name:'温州'}],
                //            [{name:'北京'},{name:'武汉'}],
                //            [{name:'北京'},{name:'无锡'}],
                //            [{name:'北京'},{name:'厦门'}],
                //            [{name:'北京'},{name:'西宁'}],
                //            [{name:'北京'},{name:'徐州'}],
                //            [{name:'北京'},{name:'烟台'}],
                //            [{name:'北京'},{name:'盐城'}],
                //            [{name:'北京'},{name:'珠海'}],
                //            [{name:'上海'},{name:'包头'}],
                //            [{name:'上海'},{name:'北海'}],
                //            [{name:'上海'},{name:'广州'}],
                //            [{name:'上海'},{name:'郑州'}],
                //            [{name:'上海'},{name:'长春'}],
                //            [{name:'上海'},{name:'重庆'}],
                //            [{name:'上海'},{name:'长沙'}],
                //            [{name:'上海'},{name:'成都'}],
                //            [{name:'上海'},{name:'丹东'}],
                //            [{name:'上海'},{name:'大连'}],
                //            [{name:'上海'},{name:'福州'}],
                //            [{name:'上海'},{name:'海口'}],
                //            [{name:'上海'},{name:'呼和浩特'}],
                //            [{name:'上海'},{name:'合肥'}],
                //            [{name:'上海'},{name:'哈尔滨'}],
                //            [{name:'上海'},{name:'舟山'}],
                //            [{name:'上海'},{name:'银川'}],
                //            [{name:'上海'},{name:'南昌'}],
                //            [{name:'上海'},{name:'昆明'}],
                //            [{name:'上海'},{name:'贵阳'}],
                //            [{name:'上海'},{name:'兰州'}],
                //            [{name:'上海'},{name:'拉萨'}],
                //            [{name:'上海'},{name:'连云港'}],
                //            [{name:'上海'},{name:'临沂'}],
                //            [{name:'上海'},{name:'柳州'}],
                //            [{name:'上海'},{name:'宁波'}],
                //            [{name:'上海'},{name:'南宁'}],
                //            [{name:'上海'},{name:'北京'}],
                //            [{name:'上海'},{name:'沈阳'}],
                //            [{name:'上海'},{name:'秦皇岛'}],
                //            [{name:'上海'},{name:'西安'}],
                //            [{name:'上海'},{name:'石家庄'}],
                //            [{name:'上海'},{name:'汕头'}],
                //            [{name:'上海'},{name:'深圳'}],
                //            [{name:'上海'},{name:'青岛'}],
                //            [{name:'上海'},{name:'济南'}],
                //            [{name:'上海'},{name:'天津'}],
                //            [{name:'上海'},{name:'太原'}],
                //            [{name:'上海'},{name:'乌鲁木齐'}],
                //            [{name:'上海'},{name:'潍坊'}],
                //            [{name:'上海'},{name:'威海'}],
                //            [{name:'上海'},{name:'温州'}],
                //            [{name:'上海'},{name:'武汉'}],
                //            [{name:'上海'},{name:'厦门'}],
                //            [{name:'上海'},{name:'西宁'}],
                //            [{name:'上海'},{name:'徐州'}],
                //            [{name:'上海'},{name:'烟台'}],
                //            [{name:'上海'},{name:'珠海'}],
                //            [{name:'广州'},{name:'北海'}],
                //            [{name:'广州'},{name:'郑州'}],
                //            [{name:'广州'},{name:'长春'}],
                //            [{name:'广州'},{name:'重庆'}],
                //            [{name:'广州'},{name:'长沙'}],
                //            [{name:'广州'},{name:'成都'}],
                //            [{name:'广州'},{name:'常州'}],
                //            [{name:'广州'},{name:'大连'}],
                //            [{name:'广州'},{name:'福州'}],
                //            [{name:'广州'},{name:'海口'}],
                //            [{name:'广州'},{name:'呼和浩特'}],
                //            [{name:'广州'},{name:'合肥'}],
                //            [{name:'广州'},{name:'杭州'}],
                //            [{name:'广州'},{name:'哈尔滨'}],
                //            [{name:'广州'},{name:'舟山'}],
                //            [{name:'广州'},{name:'银川'}],
                //            [{name:'广州'},{name:'南昌'}],
                //            [{name:'广州'},{name:'昆明'}],
                //            [{name:'广州'},{name:'贵阳'}],
                //            [{name:'广州'},{name:'兰州'}],
                //            [{name:'广州'},{name:'拉萨'}],
                //            [{name:'广州'},{name:'连云港'}],
                //            [{name:'广州'},{name:'临沂'}],
                //            [{name:'广州'},{name:'柳州'}],
                //            [{name:'广州'},{name:'宁波'}],
                //            [{name:'广州'},{name:'南京'}],
                //            [{name:'广州'},{name:'南宁'}],
                //            [{name:'广州'},{name:'南通'}],
                //            [{name:'广州'},{name:'北京'}],
                //            [{name:'广州'},{name:'上海'}],
                //            [{name:'广州'},{name:'沈阳'}],
                //            [{name:'广州'},{name:'西安'}],
                //            [{name:'广州'},{name:'石家庄'}],
                //            [{name:'广州'},{name:'汕头'}],
                //            [{name:'广州'},{name:'青岛'}],
                //            [{name:'广州'},{name:'济南'}],
                //            [{name:'广州'},{name:'天津'}],
                //            [{name:'广州'},{name:'太原'}],
                //            [{name:'广州'},{name:'乌鲁木齐'}],
                //            [{name:'广州'},{name:'温州'}],
                //            [{name:'广州'},{name:'武汉'}],
                //            [{name:'广州'},{name:'无锡'}],
                //            [{name:'广州'},{name:'厦门'}],
                //            [{name:'广州'},{name:'西宁'}],
                //            [{name:'广州'},{name:'徐州'}],
                //            [{name:'广州'},{name:'烟台'}],
                //            [{name:'广州'},{name:'盐城'}]
                //        ]
                //    }
                //}
            ]
        };

        var myChart = BMapExt.initECharts(container);
        //window.onresize = myChart.onresize;
        //BMapExt.setOption(option);
    }
);
})();


