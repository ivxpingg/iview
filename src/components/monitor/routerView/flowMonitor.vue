<template>
    <div class="flowMonitor-container">
        <div class="panel-left">
            <div class="echart-top">
                <div ref="lineFlowEchart" class="line-line-flow-echart"></div>
            </div>
            <div class="echarts-title">全线客流24小时趋势图</div>

            <div class="echart-bottom">
                <div ref="stationFlowEchart" class="station-line-flow-echart"></div>
                <Select v-model="defaultSelect" class="select-station" style="width:117px">
                    <Option v-for="item in stationData" :value="item.id">{{ item.name }}</Option>
                </Select>
            </div>
            <div class="echarts-title">站点客流24小时趋势图</div>
        </div>
        <div class="panel-right">
            <div ref="barEchart" class="bar-flow-echart"></div>
            <div class="echarts-title">站点客流总量图</div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    import Util from '../../../libs/util';
    export default {
        data () {
            return {
                defaultSelect: '2',
                stationData: [
                     { name: '镇海路站', id: '1' },
                     { name: '中山公园站', id: '2' },
                     { name: '将军祠站', id: '3' },
                     { name: '文灶站', id: '4' },
                     { name: '湖滨东路站', id: '5' },
                     { name: '莲坂站', id: '6' },
                     { name: '莲花路口站', id: '7' },
                     { name: '吕厝站', id: '8' },
                     { name: '乌石浦站', id: '9' },
                     { name: '塘边站', id: '10' },
                     { name: '火炬园站', id: '11' },
                     { name: '殿前站', id: '12' },
                     { name: '高崎站', id: '13' },
                     { name: '集美学村站', id: '14' },
                     { name: '园博苑站', id: '15' },
                     { name: '杏林村站', id: '16' },
                     { name: '杏锦路站', id: '17' },
                     { name: '官任站', id: '18' },
                     { name: '诚毅广场站', id: '19' },
                     { name: '集美软件园站', id: '20' },
                     { name: '集美大道站', id: '21' },
                     { name: '天水路站', id: '22' },
                     { name: '厦门北站', id: '23' },
                     { name: '岩内站', id: '24' }
                 ]
            }
        },
        mounted() {
            this.lineEchart();
            this.stationEchart();
            this.barEchart();
        },
        methods: {
            getData(){

            },

            lineEchart() {
                var myChart = echarts.init(this.$refs.lineFlowEchart);
                var option = {
                    color: ['#ea5550','#69a2d8','#ea5550','#69a2d8', '#8e81bc'],
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['今日进站量','上周同期进站量','今日出站量', '上周同期出站量']
                    },
                    grid: {
                        show: true,
                        top: '44',
                        left: '20',
                        right: '15',
                        bottom: '10',
                        containLabel: true,
//                        backgroundColor: '#FFF',
                        borderColor: 'transparent'
                    },
                    xAxis: {
                        show: true,
                        type: 'category',
                        axisLine: {
                            lineStyle: {
                                color: '#187fc4',
                                width: 1
                            }
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#454e5e'
                            }
                        },
//                        boundaryGap: false,
                        data: ['5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23', '24']

                    },
                    yAxis: {
                        show: true,
                        type: 'value',
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#454e5e'
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#187fc4',
                                width: 1
                            }
                        },
                        axisTick: {
                            length: 0
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#ececed'
                            }
                        },
                        splitArea: {
                            areaStyle: {
                                color: ['#faf9f9', '#f3f4f4']
                            }
                        }

                    },
                    series: [
                        {
                            name:'今日进站量',
                            type:'bar',
                            data:[150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 220]
                        },
                        {
                            name:'上周同期进站量',
                            type:'bar',
                            data:[220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 220, 182, 191, 234, 290, 330, 310, 220]
                        },
                        {
                            name:'今日出站量',
                            type:'line',
                            data:[120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 120, 132, 101, 134, 90, 230, 210, 120, 220]
                        },
                        {
                            name:'上周同期出站量',
                            type:'line',
                            data:[220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 220, 182, 191, 234, 290, 330, 310, 220]
                        }
                    ]
                };
                myChart.setOption(option);


            },
            stationEchart() {
                var myChart = echarts.init(this.$refs.stationFlowEchart);
                var option = {
                    color: ['#ea5550','#69a2d8', '#8e81bc'],
                    title: {
                        text: ''
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data:['今日','昨日','上周同期']
                    },
                    grid: {
                        show: true,
                        top: '44',
                        left: '20',
                        right: '15',
                        bottom: '10',
                        containLabel: true,
//                        backgroundColor: '#FFF',
                        borderColor: 'transparent'
                    },
                    xAxis: {
                        show: true,
                        type: 'category',
                        axisLine: {
                            lineStyle: {
                                color: '#187fc4',
                                width: 1
                            }
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#454e5e'
                            }
                        },
//                        boundaryGap: false,
                        data: ['5','6','7','8','9','10','11','12','13','14','15','16','17','18','19','20','21','22','23', '24']

                    },
                    yAxis: {
                        show: true,
                        type: 'value',
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: '#454e5e'
                            }
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#187fc4',
                                width: 1
                            }
                        },
                        axisTick: {
                            length: 0
                        },
                        splitLine: {
                            lineStyle: {
                                color: '#ececed'
                            }
                        },
                        splitArea: {
                            areaStyle: {
                                color: ['#faf9f9', '#f3f4f4']
                            }
                        }
                    },
                    series: [
                        {
                            name:'今日',
                            type:'line',
                            stack: '总量',
                            data:[120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90]
                        },
                        {
                            name:'昨日',
                            type:'line',
                            stack: '总量',
                            data:[220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290]
                        },
                        {
                            name:'上周同期',
                            type:'line',
                            stack: '总量',
                            data:[150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330, 410, 190, 330, 410]
                        }
                    ]
                };
                myChart.setOption(option);
            },

            barEchart(){
                var that = this;

                var myChart = echarts.init(this.$refs.barEchart);

                var option = {
                    color: ['#ea5550','#69a2d8','#8e81bc'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data:['站点乘降量', '进站客流量', '出站客流量']
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true,
                        backgroundColor: '#FFF',
                        borderColor: '#FFF'
                    },
                    xAxis : [
                        {
                            type : 'value',
                            axisLine: {
                                lineStyle: {
                                    color: '#187fc4',
                                    width: 1
                                }
                            },
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#454e5e'
                                }
                            },
                            splitLine: {
                                lineStyle: {
                                    color: '#ececed'
                                }
                            },
                            splitArea: {
                                areaStyle: {
                                    color: ['#faf9f9', '#f3f4f4']
                                }
                            }
                        }
                    ],
                    yAxis : [
                        {
                            type : 'category',
                            axisTick : {show: false},
                            data : ['镇海路','中山公园','将军祠','文灶','湖滨东路','莲坂','莲花路口', '吕厝', '乌石浦', '塘边', '火炬园', '殿前', '高崎', '集美学村', '园博苑', '杏林村', '杏锦路', '官任', '诚毅广场', '集美软件园', '集美大道', '天水路', '厦门北站', '岩内'],
                            axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#454e5e'
                                },
//                                width: 100,
//                                height: 20,
//                                backgroundColor: 'yellow',

//                                width: 64,
//                                height: 20,
//                                fontSize: 12,
//                                borderWidth: 1,
//                                borderRadius: 10,
//                                borderColor: '#F9F9F9'
                            }
                        }
                    ],
                    series : [
                        {
                            name:'站点乘降量',
                            type:'bar',
//                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'left'
                                }
                            },
                            data:[120, 132, 101, 134, 190, 230, 210, 120, 132, 101, 134, 190, 230, 210, 120, 132, 101, 134, 190, 230, 210, 120, 132, 101]
                        },
                        {
                            name:'进站客流量',
                            type:'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'inside'
                                }
                            },
                            data:[200, 170, 240, 244, 200, 220, 210, 200, 170, 240, 244, 200, 220, 210, 200, 170, 240, 244, 200, 220, 210, 200, 170, 240]
                        },
                        {
                            name:'出站客流量',
                            type:'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true
                                }
                            },
                            data:[-320, -302, -341, -374, -390, -450, -420, -320, -302, -341, -374, -390, -450, -420, -320, -302, -341, -374, -390, -450, -420, -320, -302, -341]
                        }
                    ]
                };

                myChart.setOption(option);

                myChart.on('click', function (params) {
                   for (var i = 0; i < that.stationData.length; i++) {

                       if (that.stationData[i].name == params.name || that.stationData[i].name.replace('站','') == params.name) {
                           that.defaultSelect = that.stationData[i].id;
                           return;
                       }
                   }
                });
            }
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .flowMonitor-container {
        display: flex;
        margin: 0;
        padding: 0;
        height: 783px;
        background-color: #ecebeb;

        .panel-left {
            flex: 1;
            margin: 19px;

            .echart-top {
                height: 333px;
                background-color: #eeeeee;
                border: 2px solid #e2e3e3;
                .line-line-flow-echart {
                    width: 100%;
                    height: 100%;
                }
            }
            .echart-bottom {
                position: relative;
                height: 332px;
                background-color: #eeeeee;
                border: 2px solid #e2e3e3;
                .station-line-flow-echart {
                    width: 100%;
                    height: 100%;
                }
                .select-station {
                    position: absolute;
                    top: 13px;
                    right: 14px;
                }
            }

        }

        .panel-right {
            flex: 1;
            margin: 19px 19px 19px 0;
            height: 705px;
            background-color: #eeeeee;
            border: 2px solid #e2e3e3;
            .bar-flow-echart {
                width: 100%;
                height: 100%;
            }
        }

        .echarts-title {
            padding-bottom: 8px;
            width: 100%;
            height: 40px;
            color: #454e5e;
            font-size: 16px;
            text-align: center;
            line-height: 32px;
        }

    }

</style>

<style lang="scss" rel="stylesheet/scss">
    .select-station {
        .ivu-select-selection {
            border-radius: 16px;
            border: 1px solid #7fbc8e;

            &:hover {
                border-color: #7fbc8e;
            }
        }

        &.ivu-select-visible .ivu-select-selection {
            border-color: #7fbc8e;
            outline: 0;
            box-shadow: 0 0 0 2px rgba(127,188,142,.2);
        }
    }

    .flowMonitor-container .ivu-select-item-selected,.flowMonitor-container .ivu-select-item-selected:hover {
        background: rgba(127,188,142,.9);
    }
</style>