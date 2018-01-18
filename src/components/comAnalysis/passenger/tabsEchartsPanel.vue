<template>
    <div class="tabsEchartsPanel-container">
        <Tabs class="tabs" type="card" :animated="false">
            <TabPane label="全线客流分析">
                <div ref="chart1" class="chart chart1"></div>
            </TabPane>
            <TabPane class="tab-pane-2" label="单站分析">
                <div ref="chart2" class="chart chart2"></div>
                <Select v-model="defaultSelect" class="select-station" style="width:117px">
                    <Option v-for="item in stationData" :value="item.id">{{ item.name }}</Option>
                </Select>
            </TabPane>
            <TabPane label="平均运距分析">
                <div ref="chart3" class="chart chart3"></div>
            </TabPane>
        </Tabs>
    </div>
</template>
<script>
    import echarts from 'echarts';
    export default {
        data() {
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
            this.setChart1();
            this.setChart2();
            this.setChart3();
        },
        methods: {
            setChart1() {
                var myChart = echarts.init(this.$refs.chart1);
                var option = {
                    color: ['#ea5550','#69a2d8','#ea5550','#69a2d8', '#8e81bc'],
                    backgroundColor: '#FFF',
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                    toolbox: {},
                    legend: {
                        data:['平均进站量','最高进站量','平均出站量', '最高出站量']
                    },
                    grid: {
                        left: '0%',
                        right: '0%',
                        bottom: '0%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['镇海路','中山公园','将军祠','文灶','湖滨东路','莲坂','莲花路口', '吕厝', '乌石浦', '塘边', '火炬园', '殿前', '高崎', '集美学村', '园博苑', '杏林村', '杏锦路', '官任', '诚毅广场', '集美软件园', '集美大道', '天水路', '厦门北站', '岩内'],
                            axisPointer: {
                                type: 'shadow'
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#454e5e'
                                }
                            },
                            axisTick: {
                                length: 3
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#187fc4',
                                    width: 1
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '',
                            axisLabel: {
                                formatter: '{value}',
                                textStyle: {
                                    color: '#454e5e'
                                }
                            },
                            axisTick: {
                                length: 3
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#187fc4',
                                    width: 1
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name:'平均进站量',
                            type:'bar',
                            data:[150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 330, 410, 150, 232, 201, 154, 190, 220]
                        },
                        {
                            name:'最高进站量',
                            type:'bar',
                            data:[220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 220, 182, 191, 234, 290, 330, 310, 220]
                        },
                        {
                            name:'平均出站量',
                            type:'line',
                            data:[120, 132, 101, 134, 90, 230, 210, 120, 132, 101, 134, 90, 120, 132, 101, 134, 90, 230, 210, 120, 220]
                        },
                        {
                            name:'最高出站量',
                            type:'line',
                            data:[220, 182, 191, 234, 290, 330, 310, 220, 182, 191, 234, 290, 220, 182, 191, 234, 290, 330, 310, 220]
                        }
                    ]
                };


                myChart.setOption(option);
            },
            setChart2() {
                var myChart = echarts.init(this.$refs.chart2);
                var option = {
                    color: ['#ea5550', '#65aadd', '#8e81bc'],
                    backgroundColor: '#FFF',
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        data: ['进站量', '出站量']
                    },
                    grid: {
                        left: '0%',
                        right: '0%',
                        bottom: '0%',
                        containLabel: true
                    },
                    xAxis:  {
                        type: 'category',
                        data: ['1月','2月','3月','4月','5月','6月','7月'],
                        axisLabel: {
                            textStyle: {
                                color: '#454e5e'
                            }
                        },
                        axisTick: {
                            length: 3
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#187fc4',
                                width: 1
                            }
                        }
                    },
                    yAxis: {
                        type: 'value',
                        axisLabel: {
                            textStyle: {
                                color: '#454e5e'
                            }
                        },
                        axisTick: {
                            length: 3
                        },
                        axisLine: {
                            lineStyle: {
                                color: '#187fc4',
                                width: 1
                            }
                        }

                    },
                    series: [
                        {
                            name: '进站量',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [320, 302, 301, 334, 390, 330, 320]
                        },
                        {
                            name: '出站量',
                            type: 'bar',
                            stack: '总量',
                            label: {
                                normal: {
                                    show: true,
                                    position: 'insideRight'
                                }
                            },
                            data: [120, 132, 101, 134, 90, 230, 210]
                        }
                    ]
                };

                myChart.setOption(option);
            },
            setChart3() {
                var myChart = echarts.init(this.$refs.chart3);
                var option = {
                    color: ['#ea5550','#69a2d8','#ea5550','#69a2d8', '#8e81bc'],
                    backgroundColor: '#FFF',
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    },
                    toolbox: {},
                    legend: {
                        data:['进站客流量','平均运距']
                    },
                    grid: {
                        left: '0%',
                        right: '0%',
                        bottom: '0%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: ['1月','2月','3月','4月','5月','6月','7月'],
                            axisPointer: {
                                type: 'shadow'
                            },
                            axisLabel: {
                                textStyle: {
                                    color: '#454e5e'
                                }
                            },
                            axisTick: {
                                length: 3
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#187fc4',
                                    width: 1
                                }
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value',
                            name: '',
                            axisLabel: {
                                formatter: '{value}',
                                textStyle: {
                                    color: '#454e5e'
                                }
                            },
                            axisTick: {
                                length: 3
                            },
                            axisLine: {
                                lineStyle: {
                                    color: '#187fc4',
                                    width: 1
                                }
                            }
                        }
                    ],
                    series: [
                        {
                            name:'进站客流量',
                            type:'bar',
                            data:[150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name:'平均运距',
                            type:'line',
                            data:[220, 182, 191, 234, 290, 330, 310]
                        }
                    ]
                };


                myChart.setOption(option);
            }
        }
    }
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
    .tabsEchartsPanel-container {
        display: flex;
        height: 382px;

        .tabs {
            width: 100%;
            height: 100%;
        }
        .chart {
            width: 100%;
            height: 340px;
        }

        .tab-pane-2 {
            position: relative;
        }

    }
</style>

<style lang="scss" rel="stylesheet/scss">
    .tabsEchartsPanel-container {
        .ivu-tabs {
            position: relative;
            .ivu-tabs-bar {
                margin-bottom: 0px;
            }
            .ivu-tabs-content {

            }
        }

        .ivu-tabs-nav{
            float: right;
        }

        .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-nav-container {
            padding-top: 5px;
            height: 32px;
        }
        .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
            position: relative;
            margin-right: 18px;
            height: 26px;
            padding: 0 16px;
            line-height: 26px;
            border-radius: 0;
            border-color: #cccccd;

            &:before {
                content: " ";
                position: absolute;
                display: block;
                top: -1px;
                left: -8px;
                width: 9px;
                height: 26px;
                background: url(./images/tabs-nav-bg-left.png) no-repeat center;
                z-index: 1;
            }
            &:after {
                content: " ";
                display: block;
                position: absolute;
                top: -1px;
                right: -8px;
                width: 9px;
                height: 26px;
                background: url(./images/tabs-nav-bg-right.png) no-repeat center;
                z-index: 1;
                transition: all .3s ease-in-out;
            }
        }
        .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active {
            height: 27px;
            &:after {
                content: " ";
                display: block;
                position: absolute;
                top: -1px;
                right: -8px;
                width: 9px;
                height: 27px;
                background: url(./images/tabs-nav-bg-right-active.png) no-repeat center;
                z-index: 1;
            }
        }
    }

    .select-station {
        position: absolute;
        top: 13px;
        right: 14px;
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
</style>